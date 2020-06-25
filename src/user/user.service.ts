import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request } from 'express';
import { AuthService } from './../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, BadRequestException, NotFoundException, ConflictException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 } from 'uuid';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { ForgotPassword } from './interfaces/forgot-password.interface';
import { User } from './interfaces/user.interface';
import {log} from 'console';
import { Company } from '../company/interfaces/company.interface';
import {CANDIDATE, EMPLOYEE} from '../common/constants';
import { JobLocation } from '../common/interfaces/job-location.interface';
import { Profession } from '../common/interfaces/profession.interface';
import { Skill } from '../common/interfaces/skill.interface';

@Injectable()
export class UserService {

    HOURS_TO_VERIFY = 4;
    HOURS_TO_BLOCK = 6;
    LOGIN_ATTEMPTS_TO_BLOCK = 5;

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Company') private readonly companyModel: Model<Company>,
        @InjectModel('ForgotPassword') private readonly forgotPasswordModel: Model<ForgotPassword>,
        @InjectModel('Profession') private readonly professionModel: Model<Profession>,
        @InjectModel('JobLocation') private readonly jobLocationModel: Model<JobLocation>,
        @InjectModel('Skill') private readonly skillModel: Model<Skill>,
        private readonly authService: AuthService,
        ) {}

    /**
     * @param createUserDto
     * @description create user only with email, password and user type
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        try {
            await this.isEmailUnique(user.email);
        } catch (err) {
            throw new HttpException('Email Unique Check Error', err);
        }
        this.setRegistrationInfo(user);
        try {
            await user.save();
        } catch (err) {
            throw new HttpException('User Save Error', err);
        }
        return this.buildRegistrationInfo(user);
    }

    /**
     * @param req
     * @param verifyUuidDto
     * @description user will send the verification code, backend will compare code and time
     * @return {first, lastName, email, accessToken}
     */
    async verifyEmail(req: Request, verifyUuidDto: VerifyUuidDto) {
        const user = await this.findByVerification(verifyUuidDto.verification);
        await this.setUserAsVerified(user);
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        };
    }

    /**
     * @param req
     * @param loginUserDto
     */
    async login(req: Request, loginUserDto: LoginUserDto) {
        const user = await this.findUserByEmail(loginUserDto.email);
        this.isUserBlocked(user);
        await this.checkPassword(loginUserDto.password, user);
        await this.passwordsAreMatch(user);

        let company;
        if (user.userType === EMPLOYEE) {
            company = await this.companyModel.findOne({'employees.user': user._id, 'verified': true});
        }

        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userType: user.userType,
            company,
            accessToken: await this.authService.createAccessToken(user._id),
            refreshToken: await this.authService.createRefreshToken(req, user._id),
        };
    }

    /**
     * @description called when access token expires
     * @param refreshAccessTokenDto
     * @return new accessToken generated
     */
    async refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto) {
        const userId = await this.authService.findRefreshToken(refreshAccessTokenDto.refreshToken);
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('Bad request');
        }
        return {
            accessToken: await this.authService.createAccessToken(user._id),
        };
    }

    /**
     * @param req
     * @param createForgotPasswordDto
     * @description user send the request to reset the password and server will send the verification code to user email
     */
    async forgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
        await this.findByEmail(createForgotPasswordDto.email);
        await this.saveForgotPassword(req, createForgotPasswordDto);
        return {
            email: createForgotPasswordDto.email,
            message: 'verification sent.',
        };
    }

    /**
     * @param req
     * @param verifyUuidDto
     * @description if user receive the verification code, he will send the verification code to server, server will allow user to reset password
     */
    async forgotPasswordVerify(req: Request, verifyUuidDto: VerifyUuidDto) {
        const forgotPassword = await this.findForgotPasswordByUuid(verifyUuidDto);
        await this.setForgotPasswordFirstUsed(req, forgotPassword);
        return {
            email: forgotPassword.email,
            message: 'now reset your password.',
        };
    }

    /**
     * @param resetPasswordDto
     * @description user will send the email and new password, server will reset password for user email
     */
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const forgotPassword = await this.findForgotPasswordByEmail(resetPasswordDto);
        await this.setForgotPasswordFinalUsed(forgotPassword);
        await this.resetUserPassword(resetPasswordDto);
        return {
            email: resetPasswordDto.email,
            message: 'password successfully changed.',
        };
    }

    /**
     * @description used to get the details of user
     * @param userId
     */
    async getUser(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('Bad request');
        }
        return user;
    }

    /**
     * @param userId
     * @param updateUserDto
     * @description used to update user profile
     */
    async updateUser(userId: string, updateUserDto: UpdateUserDto) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('Bad request');
        }

        const updatedUser = Object.assign(user, updateUserDto);
        try {
            await this.userModel.updateOne({ _id: userId }, updatedUser);
            return updatedUser;
        } catch (e) {
            log(e);
            throw new InternalServerErrorException('Server Error');
        }
    }

    /**
     * @description get all skill types
     */
    async getAllSkills(): Promise<Skill[]> {
        try {
            let skills: any;
            skills = await this.skillModel.find({});
            return skills;
        } catch (e) {
            log(e);
            throw new InternalServerErrorException('Server Error');
        }
    }

    /**
     * @description get all profession types
     */
    async getAllProfessions(): Promise<Profession[]> {
        try {
            let professions: any;
            professions = await this.professionModel.find({});
            return professions;
        } catch (e) {
            log(e);
            throw new InternalServerErrorException('Server Error');
        }
    }

    // ┌─┐┬─┐┌┬┐┌─┐┌─┐┌┬┐┌─┐┌┬┐  ┌─┐┌─┐┬─┐┬  ┬┬┌─┐┌─┐
    // ├─┘├┬┘ │ ├┤ │   │ ├┤  ││  └─┐├┤ ├┬┘└┐┌┘││  ├┤
    // ┴  ┴└─ ┴ └─┘└─┘ ┴ └─┘─┴┘  └─┘└─┘┴└─ └┘ ┴└─┘└─┘
    findAll(): any {
        return {hello: 'world'};
      }

    // ********************************************
    // ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
    // ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
    // ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
    // ********************************************

    private async isEmailUnique(email: string) {
        const user = await this.userModel.findOne({email, verified: true});
        if (user) {
            throw new BadRequestException('Email must be unique.');
        }
    }

    private setRegistrationInfo(user): any {
        user.verification = v4();
        user.verificationExpires = addHours(new Date(), this.HOURS_TO_VERIFY);
    }

    private buildRegistrationInfo(user): any {
        const userRegistrationInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            verified: user.verified,
        };
        return userRegistrationInfo;
    }

    private async findByVerification(verification: string): Promise<User> {
        const user = await this.userModel.findOne({verification, verified: false, verificationExpires: {$gt: new Date()}});
        if (!user) {
            throw new BadRequestException('Bad request.');
        }
        return user;
    }

    private async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email, verified: true});
        if (!user) {
            throw new NotFoundException('Email not found.');
        }
        return user;
    }

    private async setUserAsVerified(user) {
        user.verified = true;
        await user.save();
    }

    private async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email, verified: true});
        if (!user) {
          throw new NotFoundException('Wrong email or password.');
        }
        return user;
      }

    private async checkPassword(attemptPass: string, user) {
        const match = await bcrypt.compare(attemptPass, user.password);
        if (!match) {
            await this.passwordsDoNotMatch(user);
            throw new NotFoundException('Wrong email or password.');
        }
        return match;
      }

    private isUserBlocked(user) {
        if (user.blockExpires > Date.now()) {
            throw new ConflictException('User has been blocked try later.');
        }
    }

    private async passwordsDoNotMatch(user) {
        user.loginAttempts += 1;
        await user.save();
        if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
            await this.blockUser(user);
            throw new ConflictException('User blocked.');
        }
    }

    private async blockUser(user) {
        user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
        await user.save();
    }

    private async passwordsAreMatch(user) {
        user.loginAttempts = 0 ;
        await user.save();
    }

    private async saveForgotPassword(req: Request, createForgotPasswordDto: CreateForgotPasswordDto) {
        const forgotPassword = new this.forgotPasswordModel();
        forgotPassword.email = createForgotPasswordDto.email;
        forgotPassword.verification = v4();
        forgotPassword.expires = addHours(new Date(), this.HOURS_TO_VERIFY);
        forgotPassword.ip = this.authService.getIp(req);
        forgotPassword.browser = this.authService.getBrowserInfo(req);
        forgotPassword.country = this.authService.getCountry(req);

        await forgotPassword.save();
    }

    private async findForgotPasswordByUuid(verifyUuidDto: VerifyUuidDto): Promise<ForgotPassword> {
        const forgotPassword = await this.forgotPasswordModel.findOne({
            verification: verifyUuidDto.verification,
            firstUsed: false,
            finalUsed: false,
            expires: {$gt: new Date()},
        });
        if (!forgotPassword) {
            throw new BadRequestException('Bad request.');
        }
        return forgotPassword;
    }

    private async setForgotPasswordFirstUsed(req: Request, forgotPassword: ForgotPassword) {
        forgotPassword.firstUsed = true;
        forgotPassword.ipChanged = this.authService.getIp(req);
        forgotPassword.browserChanged = this.authService.getBrowserInfo(req);
        forgotPassword.countryChanged = this.authService.getCountry(req);
        await forgotPassword.save();
    }

    private async findForgotPasswordByEmail(resetPasswordDto: ResetPasswordDto): Promise<ForgotPassword> {
        const forgotPassword = await this.forgotPasswordModel.findOne({
            email: resetPasswordDto.email,
            firstUsed: true,
            finalUsed: false,
            expires: {$gt: new Date()},
        });
        if (!forgotPassword) {
            throw new BadRequestException('Bad request.');
        }
        return forgotPassword;
    }

    private async setForgotPasswordFinalUsed(forgotPassword: ForgotPassword) {
        forgotPassword.finalUsed = true;
        await forgotPassword.save();
    }

    private async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
        const user = await this.userModel.findOne({
            email: resetPasswordDto.email,
            verified: true,
        });
        user.password = resetPasswordDto.password;
        await user.save();
    }
}
