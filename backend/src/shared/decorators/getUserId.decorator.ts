import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const GetUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const tokenPayload =
      jwt.decode(request.cookies.accessToken) ||
      jwt.decode(request.cookie.refreshToken);
    return +tokenPayload?.sub;
  },
);
