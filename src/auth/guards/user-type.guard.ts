
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserTypeGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info: Error, context: ExecutionContext) {
    const userType = this.reflector.get<string[]>('userType', context.getHandler());
    if (!userType) {
      return true;
    }
    const hasUserType = () => user.userType ? user.userType : null;
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(user.userType && hasUserType())) {
      throw new ForbiddenException('Forbidden');
    }
    return user && user.userType && hasUserType();
  }
}
