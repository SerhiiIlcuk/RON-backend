import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanySchema } from './schemas/company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schemas/user.schema';
import { CompanyTypeSchema } from './schemas/company-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: 'CompanyType', schema: CompanyTypeSchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {
}
