export type JwtPayload = {
  sub: number;
  username: string;
  type: 'access' | 'refresh';
};
