import { AuthUser } from '../auth/decorators/user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Get, Post, Put, Body, UseGuards, Req, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { UserService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitHeader,
  ApiOperation,
} from '@nestjs/swagger';

@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
  // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: 'Register user' })
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const response = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Verify Email' })
  @ApiOkResponse({})
  async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto, @Res() res) {
    const response = await this.userService.verifyEmail(req, verifyUuidDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Login User' })
  @ApiOkResponse({})
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto, @Res() res: any) {
    const response = await this.userService.login(req, loginUserDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('refresh-access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ title: 'Refresh Access Token with refresh token' })
  @ApiCreatedResponse({})
  async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto, @Res() res: any) {
    const response = await this.userService.refreshAccessToken(refreshAccessTokenDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Forgot password' })
  @ApiOkResponse({})
  async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto, @Res() res: any) {
    const response = await this.userService.forgotPassword(req, createForgotPasswordDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('forgot-password-verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Verify forget password code' })
  @ApiOkResponse({})
  async forgotPasswordVerify(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto, @Res() res: any) {
    const response = await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ title: 'Reset password after verify reset password' })
  @ApiBearerAuth()
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res: any) {
    const response = await this.userService.resetPassword(resetPasswordDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get user' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getUser(@AuthUser() user: any, @Res() res: any) {
    const response = await this.userService.getUser(user.id);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'Update user' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async updateUser(@Body() updateUserDto: UpdateUserDto, @AuthUser() user: any, @Res() res: any) {
    const response = await this.userService.updateUser(user.id, updateUserDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('skills')
  @ApiOperation({ title: 'Get All Skills' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllSkills(@Res() res: any) {
    const response = await this.userService.getAllSkills();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('professions')
  @ApiOperation({ title: 'Get All Professions' })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  async getAllProfessions(@Res() res: any) {
    const response = await this.userService.getAllProfessions();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ title: 'A private route for check the auth' })
  @ApiImplicitHeader({
    name: 'x-token',
    description: 'the token we need for auth.',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({})
  findAll(@Res() res: any) {
    const response = this.userService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      response,
    });
  }
}
