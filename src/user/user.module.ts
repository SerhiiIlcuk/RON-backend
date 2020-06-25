import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { ForgotPasswordSchema } from './schemas/forgot-password.schema';
import { CompanySchema } from '../company/schemas/company.schema';
import { JobLocationSchema } from '../common/schemas/job-location.schema';
import { ProfessionSchema } from '../common/schemas/profession.schema';
import { SkillSchema } from '../common/schemas/skill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'ForgotPassword', schema: ForgotPasswordSchema}]),
    MongooseModule.forFeature([{ name: 'Profession', schema: ProfessionSchema}]),
    MongooseModule.forFeature([{ name: 'JobLocation', schema: JobLocationSchema}]),
    MongooseModule.forFeature([{ name: 'Skill', schema: SkillSchema}]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
