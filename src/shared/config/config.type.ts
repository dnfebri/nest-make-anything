export type AppConfig = {
  nodeEnv: string;
  name: string;
  port: number;
  apiPrefix: string;
};

export type DatabaseConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  debug?: boolean;
  password?: string;
  name?: string;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type AuthConfig = {
  secret?: string;
  tokenExpires?: string;
  sessionExpires?: string;
  otpExpires?: number;
};

export type CacheConfig = {
  ttl: number;
  max: number;
  host: string;
  port: number;
  auth_pass: string;
  db: number;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
  cache: CacheConfig;
};
