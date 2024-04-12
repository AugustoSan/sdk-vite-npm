import { ErrorClassSDK } from "./Errors.util";

export const uintToDate = (tiempoUnix: bigint): Date => {
  try {
    // Convertir el bigint a un número primitivo
    const tiempoUnixNumber: number = Number(tiempoUnix);
    // Crear una nueva instancia de Date utilizando el tiempo Unix convertido a milisegundos
    const fecha: Date = new Date(tiempoUnixNumber * 1000);
    return fecha;
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'UINT_TO_DATE', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'UINT_TO_DATE', error: Error('Error inesperado al convertir el entero a un date.')});
  }
};

export const dateToUint = (fecha: Date): number => {
  try {
    // BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = Math.floor(fecha.getTime() / 1000);
    return temp;
  } catch (error) {
    if(error instanceof Error){
      throw new ErrorClassSDK({group: 'Utils', message: error.message, code: 'DATE_TO_UINT', error});
    }
    console.log('ERROR: ', error);
    throw new ErrorClassSDK({group: 'Utils', message: 'Ocurrio un error inesperado', code: 'DATE_TO_UINT', error: Error('Error inesperado al convertir el date a un entero.')});
  }
};
