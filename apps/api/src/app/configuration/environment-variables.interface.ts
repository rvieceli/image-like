export interface EnvironmentVariables {
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRATION_TIME: string;

  UNSPLASH_ACCESS_KEY: string;
}
