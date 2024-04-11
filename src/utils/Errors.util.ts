import { isError } from "ethers";
import { IErrorSDK } from "../interfaces";

export class ErrorClassSDK extends Error {
  group: string;
  message: string;
  code: string;
  error: any;

  constructor({
    group,
    message,
    code,
    error
  }: IErrorSDK){
    super();
    this.group = group;
    this.message = message;
    this.code = code;
    this.error = error;
  }
}

export const getError = (error: any): ErrorClassSDK => {
    console.log('ERROR: ', JSON.stringify(error));
    switch(error){
      case isError(error, 'UNKNOWN_ERROR'): 
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.data), code: 'UNKNOWN_ERROR', error});
      case isError(error, 'NOT_IMPLEMENTED'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.operation), code: 'NOT_IMPLEMENTED', error});
      case isError(error, 'UNSUPPORTED_OPERATION'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.operation), code: 'UNSUPPORTED_OPERATION', error});
      case isError(error, 'NETWORK_ERROR'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.transaction), code: 'NETWORK_ERROR', error});
      case isError(error, 'SERVER_ERROR'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.request), code: 'SERVER_ERROR', error});
      case isError(error, 'TIMEOUT'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.reason), code: 'TIMEOUT', error});
      case isError(error, 'BAD_DATA'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.value), code: 'BAD_DATA', error});
      case isError(error, 'CANCELLED'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.shortMessage), code: 'CANCELLED', error});
      case isError(error, 'BUFFER_OVERRUN'):
        return new ErrorClassSDK({group: 'Operational', message: JSON.stringify(error.shortMessage), code: 'BUFFER_OVERRUN', error});
      case isError(error, 'NUMERIC_FAULT'):
        return new ErrorClassSDK({group: 'Operational', message: JSON.stringify(error.fault), code: 'NUMERIC_FAULT', error});
      case isError(error, 'INVALID_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'INVALID_ARGUMENT', error});
      case isError(error, 'MISSING_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'MISSING_ARGUMENT', error});
      case isError(error, 'UNEXPECTED_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'UNEXPECTED_ARGUMENT', error});
      case isError(error, 'VALUE_MISMATCH'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'VALUE_MISMATCH', error});
      case isError(error, 'CALL_EXCEPTION'):
        return new ErrorClassSDK({group: 'Blockchain', message: error.reason !== null ? error.reason : error.revert !== null ? JSON.stringify(error.revert) : error.shortMessage, code: 'CALL_EXCEPTION', error});
      case isError(error, 'INSUFFICIENT_FUNDS'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'INSUFFICIENT_FUNDS', error});
      case isError(error, 'NONCE_EXPIRED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'NONCE_EXPIRED', error});
      case isError(error, 'REPLACEMENT_UNDERPRICED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'REPLACEMENT_UNDERPRICED', error});
      case isError(error, 'TRANSACTION_REPLACED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'TRANSACTION_REPLACED', error});
      case isError(error, 'UNCONFIGURED_NAME'):
        return new ErrorClassSDK({group: 'Blockchain', message: error.value, code: 'UNCONFIGURED_NAME', error});
      case isError(error, 'OFFCHAIN_FAULT'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'OFFCHAIN_FAULT', error});
      case isError(error, 'ACTION_REJECTED'):
        return new ErrorClassSDK({group: 'User Interaction', message: JSON.stringify(error.shortMessage), code: 'ACTION_REJECTED', error});
      default: 
        return new ErrorClassSDK({group: 'DEFAULT', message: JSON.stringify(error.shortMessage), code: 'DEFAULT', error});
    }
}