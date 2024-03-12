import { isError } from "ethers";

// const erroresRoleAccess:string[] = [
//     "{ code: 100, Message: 'No tiene permisos de root' }",
//     "{ code: 0, Message: 'No tienes roles asignados' }",
//     "{ code: 0, Message: 'No puede estar vacio el nombre del nuevo Rol' }",
//     "{ code: 0, Message: 'El rol ya se encuentra registrado' }",
//     "{ code: 0, Message: 'No puede estar vacio el permiso' }",
//     "{ code: 0, Message: 'El rol no existe' }",
//     "{ code: 3, Message: 'El indice ingresado no existe' }",
//     "{ code: 1, Message: El rol ingresado no es valido }",
//     "{ code: 2, Message: La cuenta no tiene asignado el rol }",
// ];

// const erroresRoleAccess:string[] = [
//     "No tiene permisos de root",
//     "No tienes roles asignados",
//     "No puede estar vacio el nombre del nuevo Rol",
//     "El rol ya se encuentra registrado",
//     "No puede estar vacio el permiso",
//     "El rol no existe",
//     "El indice ingresado no existe",
//     "El rol ingresado no es valido",
//     "La cuenta no tiene asignado el rol",
// ];

// export const getRevertMessageRoleAccess = (error: Error) :string => {
//     let message = 'Sin mensaje registrado';
//     let position = -1;
//     for (let i = 0; i < erroresRoleAccess.length; i++) {
//         if(error.message.includes(erroresRoleAccess[i])){
//             position = i;
//             break;
//         }
//     }
//     console.log('ERROR: ', error.message);
    
//     return position === -1 ? message : erroresRoleAccess[position];
// }

// export const validateIsRevert = (error: Error) :boolean => {
//     return error.message.includes('reverted');
// }
/**
 * 
 * if (isError(error, 'UNKNOWN_ERROR') || isError(error, 'NOT_IMPLEMENTED') || isError(error, 'UNSUPPORTED_OPERATION')
        || isError(error, 'NETWORK_ERROR') || isError(error, 'SERVER_ERROR') || isError(error, 'TIMEOUT')
        || isError(error, 'BAD_DATA') || isError(error, 'CANCELLED') || isError(error, 'BUFFER_OVERRUN')
        || isError(error, 'NUMERIC_FAULT') || isError(error, 'INVALID_ARGUMENT') || isError(error, 'MISSING_ARGUMENT')
        || isError(error, 'UNEXPECTED_ARGUMENT') || isError(error, 'VALUE_MISMATCH') || isError(error, 'CALL_EXCEPTION')
        || isError(error, 'INSUFFICIENT_FUNDS') || isError(error, 'NONCE_EXPIRED') || isError(error, 'REPLACEMENT_UNDERPRICED')
        || isError(error, 'TRANSACTION_REPLACED') || isError(error, 'UNCONFIGURED_NAME') || isError(error, 'OFFCHAIN_FAULT')
        || isError(error, 'ACTION_REJECTED')
      ) {
        console.log('error: ', error)
        throw Error(error.reason ?? error.message);
      }
 * @returns 
 */
export const getError = (error: any): Error => {
    console.log('ERROR: ', error);
    switch(error){
      case isError(error, 'UNKNOWN_ERROR'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'NOT_IMPLEMENTED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'UNSUPPORTED_OPERATION'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'NETWORK_ERROR'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'SERVER_ERROR'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'TIMEOUT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'BAD_DATA'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'CANCELLED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'BUFFER_OVERRUN'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'NUMERIC_FAULT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'INVALID_ARGUMENT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'MISSING_ARGUMENT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'UNEXPECTED_ARGUMENT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'VALUE_MISMATCH'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'CALL_EXCEPTION'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'INSUFFICIENT_FUNDS'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'NONCE_EXPIRED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'REPLACEMENT_UNDERPRICED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'TRANSACTION_REPLACED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'UNCONFIGURED_NAME'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'OFFCHAIN_FAULT'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      case isError(error, 'ACTION_REJECTED'):
        console.log('Error: ', error);
        return new Error(error.info.error.data.reason);
      default: 
        return error;
    }
}