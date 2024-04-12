import { 
    ActionRejectedError, BadDataError, BufferOverrunError, CallExceptionError, 
    CancelledError, InsufficientFundsError, InvalidArgumentError, 
    MissingArgumentError, NetworkError, NonceExpiredError, NotImplementedError, 
    NumericFaultError, OffchainFaultError, ReplacementUnderpricedError, 
    ServerError, TimeoutError, TransactionReplacedError, UnconfiguredNameError, 
    UnexpectedArgumentError, UnknownError, UnsupportedOperationError 
} from "ethers";

export interface IErrorSDK {
    group: string;
    message: string;
    code: string;
    error: UnknownError | NotImplementedError | UnsupportedOperationError | NetworkError
    | ServerError | TimeoutError | BadDataError | CancelledError | BufferOverrunError
    | NumericFaultError | InvalidArgumentError | MissingArgumentError | UnexpectedArgumentError 
    | CallExceptionError | InsufficientFundsError | NonceExpiredError | OffchainFaultError
    | ReplacementUnderpricedError | TransactionReplacedError | UnconfiguredNameError
    | ActionRejectedError | Error;

}