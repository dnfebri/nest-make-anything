import appConfig from './app.config';
import authConfig from './auth.config';
import cacheConfig from './cache.config';
import databaseConfig from './database.config';

export const AppsLoadConfig = [
  appConfig,
  databaseConfig,
  authConfig,
  cacheConfig,
];
