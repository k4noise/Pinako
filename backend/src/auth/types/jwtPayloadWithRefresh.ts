import { JwtPayload } from './jwtPayload';

export type JwtPayloadWithRefresh = JwtPayload & { refreshToken: string };
