export const uintToDate = (tiempoUnix: bigint): Date => {
  try {
    // Convertir el bigint a un número primitivo
    const tiempoUnixNumber: number = Number(tiempoUnix);
    // Crear una nueva instancia de Date utilizando el tiempo Unix convertido a milisegundos
    const fecha: Date = new Date(tiempoUnixNumber * 1000);
    return fecha;
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return new Date(0);
  }
};

export const dateToUint = (fecha: Date): number => {
  try {
    // BigNumber.set({ DECIMAL_PLACES: decimals + 2 });
    const temp = Math.floor(fecha.getTime() / 1000);
    return temp;
  } catch (error) {
    console.log('Ocurrio un error al convertir los tokens: ', error);
    return 0;
  }
};
