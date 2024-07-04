export type LoginResponseType<T> = Readonly<{
  token: string;
  user: T;
}>;
