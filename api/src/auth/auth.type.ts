export type JwtCreateType = {
  id: number;
  name: string;
  email: string;
};

export type JwtType = JwtCreateType & {
  iat: number;
  exp: number;
};
