import { ErrorCode, ErrorMessage } from 'src/common/catalogs/error.catalog';

export interface ErrorInfo {
  code: string;
  message: string;
  details?: any;
}

export class CustomError extends Error {
  constructor(private errorInfo: ErrorInfo) {
    super(errorInfo.message);
    (this as any).__proto__ = CustomError.prototype;
  }

  /** @return {string} The error code. */
  public get code(): string {
    return this.errorInfo.code;
  }

  /** @return {string} The error message. */
  public get message(): string {
    return this.errorInfo.message;
  }

  /** @return {object} The object representation of the error. */
  public toJSON(): object {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export class CustomErrorCode {

  public static INVALID_USER = {
    code: ErrorCode.INVALID_USER,
    message: ErrorMessage.INVALID_USER,
  };

  public static UNAUTHORIZED = {
    code: ErrorCode.UNAUTHORIZED,
    message: ErrorMessage.UNAUTHORIZED,
  };

  public static EXISTENT_USER_OR_EMAIL = {
    code: ErrorCode.EXISTENT_USER_OR_EMAIL,
    message: ErrorMessage.EXISTENT_USER_OR_EMAIL,
  };

  public static INVALID_AUTH_TOKEN = {
    code: ErrorCode.INVALID_AUTH_TOKEN,
    message: ErrorMessage.INVALID_AUTH_TOKEN,
  };

  public static EXPIRED_AUTH_TOKEN = {
    code: ErrorCode.EXPIRED_AUTH_TOKEN,
    message: ErrorMessage.EXPIRED_AUTH_TOKEN,
  };

  public static INTERNAL_SERVER_ERROR = {
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: '',
  };

  public static INEXISTENT_ENTITY_IN_DB = {
    code: ErrorCode.INEXISTENT_ENTITY_IN_DB,
    message: ErrorMessage.INEXISTENT_ENTITY_IN_DB,
  };
}
