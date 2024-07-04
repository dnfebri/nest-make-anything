export type JwtPayloadType = {
  id: string;
  iat: number;
  exp: number;
  access: 'user' | 'admin';
};
