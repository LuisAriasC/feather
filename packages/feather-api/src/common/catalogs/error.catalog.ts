export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'internal-server-error',
  NOT_FOUND = 'not-found',
  INVALID_CODE = 'invalid-code',
  INVALID_AUTH_TOKEN = 'invalid-auth-token',
  EXPIRED_AUTH_TOKEN = 'expired-auth-token',
  INEXISTENT_ENTITY_IN_DB = 'inexistent-entity',
  INVALID_TRACKING_NUMBER = 'invalid-tracking-number',
  EMPTY_CACHE_VALUE = 'empty-cache-value',
  INVALID_USER = 'invalid-user',
  EXISTENT_USER_OR_EMAIL= 'invalid-registration-info',
  UNAUTHORIZED = 'unauthorized',
}

export enum ErrorMessage {
  INVALID_CODE = 'Invalid authorization code.',
  INVALID_AUTH_TOKEN = 'Invalid authorization token.',
  EXPIRED_AUTH_TOKEN = 'Expired authorization token.',
  INEXISTENT_ENTITY_IN_DB = 'Not such entity in db.',
  INVALID_TRACKING_NUMBER = 'Enter a valid tracking number or reference id.',
  EMPTY_CACHE_VALUE = 'Set a value for the cache.',
  INVALID_USER = 'This user is not registered',
  EXISTENT_USER_OR_EMAIL = 'Username or password already in use',
  UNAUTHORIZED = 'Unauthorized user',
}
