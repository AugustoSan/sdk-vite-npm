import { 
  isError, ActionRejectedError, BadDataError, BufferOverrunError, CallExceptionError, 
  CancelledError, InsufficientFundsError, InvalidArgumentError, 
  MissingArgumentError, NetworkError, NonceExpiredError, NotImplementedError, 
  NumericFaultError, OffchainFaultError, ReplacementUnderpricedError, 
  ServerError, TimeoutError, TransactionReplacedError, UnconfiguredNameError, 
  UnexpectedArgumentError, UnknownError, UnsupportedOperationError  
} from "ethers";
import { IErrorSDK } from "../interfaces";

export class ErrorClassSDK extends Error {
  group: string;
  message: string;
  code: string;
  error: UnknownError | NotImplementedError | UnsupportedOperationError | NetworkError
  | ServerError | TimeoutError | BadDataError | CancelledError | BufferOverrunError
  | NumericFaultError | InvalidArgumentError | MissingArgumentError | UnexpectedArgumentError 
  | CallExceptionError | InsufficientFundsError | NonceExpiredError | OffchainFaultError
  | ReplacementUnderpricedError | TransactionReplacedError | UnconfiguredNameError
  | ActionRejectedError | Error;

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

  getError = (): UnknownError | NotImplementedError | UnsupportedOperationError | NetworkError
  | ServerError | TimeoutError | BadDataError | CancelledError | BufferOverrunError
  | NumericFaultError | InvalidArgumentError | MissingArgumentError | UnexpectedArgumentError 
  | CallExceptionError | InsufficientFundsError | NonceExpiredError | OffchainFaultError
  | ReplacementUnderpricedError | TransactionReplacedError | UnconfiguredNameError
  | ActionRejectedError | Error => {
    return this.error;
  }

  buscarPropiedad = (objeto: any, property: string): string | null => {
    // Verificar si el objeto es nulo o indefinido
    if (objeto === null || objeto === undefined) {
      return null;
    }
    // Verificar si el objeto actual es un objeto regular de JavaScript
    // (y no un array u otro tipo de objeto)
    if (typeof objeto === 'object') {
      const _object: object = JSON.parse(JSON.stringify(objeto));
      // Si el objeto actual no tiene el atributo "reason",
      // buscar en las propiedades del objeto de manera recursiva
      for (const key in _object) {
        if (key === 'info') {
          const result = this.buscarPropiedad(objeto[key], property);
          if (result !== null) {
            return result;
          }
        }
        if (key === property && objeto[key] !== null) {
          return objeto[key];
        }
        if (Object.prototype.hasOwnProperty.call(objeto, key)) {
          const temp = objeto[key];
          if (typeof temp === 'object') {
            const result = this.buscarPropiedad(objeto[key], property);
            if (result !== null) {
              return result;
            }
          }
        }
      }
    }
  
    // Si el objeto actual no es un objeto regular de JavaScript
    // o si no se encuentra el atributo "reason" en ninguna parte del objeto,
    // devolver null
    return null;
  };
  
}

export const getError = (error: any): ErrorClassSDK => {
  try {
    switch(error){
      case isError(error, 'UNKNOWN_ERROR'): 
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.data), code: 'UNKNOWN_ERROR', error: error as UnknownError});
      case isError(error, 'NOT_IMPLEMENTED'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.operation), code: 'NOT_IMPLEMENTED', error: error as NotImplementedError});
      case isError(error, 'UNSUPPORTED_OPERATION'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.operation), code: 'UNSUPPORTED_OPERATION', error: error as UnsupportedOperationError});
      case isError(error, 'NETWORK_ERROR'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.transaction), code: 'NETWORK_ERROR', error: error as NetworkError});
      case isError(error, 'SERVER_ERROR'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.request), code: 'SERVER_ERROR', error: error as ServerError});
      case isError(error, 'TIMEOUT'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.reason), code: 'TIMEOUT', error: error as TimeoutError});
      case isError(error, 'BAD_DATA'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.value), code: 'BAD_DATA', error: error as BadDataError});
      case isError(error, 'CANCELLED'):
        return new ErrorClassSDK({group: 'Generic', message: JSON.stringify(error.shortMessage), code: 'CANCELLED', error: error as CancelledError});
      case isError(error, 'BUFFER_OVERRUN'):
        return new ErrorClassSDK({group: 'Operational', message: JSON.stringify(error.shortMessage), code: 'BUFFER_OVERRUN', error: error as BufferOverrunError});
      case isError(error, 'NUMERIC_FAULT'):
        return new ErrorClassSDK({group: 'Operational', message: JSON.stringify(error.fault), code: 'NUMERIC_FAULT', error: error as NumericFaultError});
      case isError(error, 'INVALID_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'INVALID_ARGUMENT', error: error as InvalidArgumentError});
      case isError(error, 'MISSING_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'MISSING_ARGUMENT', error: error as MissingArgumentError});
      case isError(error, 'UNEXPECTED_ARGUMENT'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'UNEXPECTED_ARGUMENT', error: error as UnexpectedArgumentError});
      case isError(error, 'VALUE_MISMATCH'):
        return new ErrorClassSDK({group: 'Argument', message: JSON.stringify(error.shortMessage), code: 'VALUE_MISMATCH', error: error as Error});
      case isError(error, 'CALL_EXCEPTION'):
        return new ErrorClassSDK({group: 'Blockchain', message: error.reason !== null ? error.reason : error.revert !== null ? JSON.stringify(error.revert) : error.shortMessage, code: 'CALL_EXCEPTION', error: error as CallExceptionError});
      case isError(error, 'INSUFFICIENT_FUNDS'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'INSUFFICIENT_FUNDS', error: error as InsufficientFundsError});
      case isError(error, 'NONCE_EXPIRED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'NONCE_EXPIRED', error: error as NonceExpiredError});
      case isError(error, 'REPLACEMENT_UNDERPRICED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'REPLACEMENT_UNDERPRICED', error: error as ReplacementUnderpricedError});
      case isError(error, 'TRANSACTION_REPLACED'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'TRANSACTION_REPLACED', error: error as TransactionReplacedError});
      case isError(error, 'UNCONFIGURED_NAME'):
        return new ErrorClassSDK({group: 'Blockchain', message: error.value, code: 'UNCONFIGURED_NAME', error: error as UnconfiguredNameError});
      case isError(error, 'OFFCHAIN_FAULT'):
        return new ErrorClassSDK({group: 'Blockchain', message: JSON.stringify(error.shortMessage), code: 'OFFCHAIN_FAULT', error: error as OffchainFaultError});
      case isError(error, 'ACTION_REJECTED'):
        return new ErrorClassSDK({group: 'User Interaction', message: JSON.stringify(error.shortMessage), code: 'ACTION_REJECTED', error: error as ActionRejectedError});
      default: 
        return new ErrorClassSDK({group: 'DEFAULT', message: JSON.stringify(error.shortMessage), code: 'DEFAULT', error: error as Error});
    }
  } catch (error) {
    return new ErrorClassSDK({group: 'CATCH', message: 'Ocurrio un error al intentar buscar el error.', code: 'DEFAULT', error: error as Error});
  }
}