/* Este funcion recibe como parametro la respuesta error del backend */
/* Y evalua el estado y los errores */
export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];
  if (response.status === 500) {
    // En caso de que el servidor este dando problemas.
    resultado.push(
      'Ha ocurrido un error en el servidor. Favor intentar mástarde'
    );
    return resultado;
  }
  if (response.error) {
    if (typeof response.error === 'string') {
      // Si solo se recibe un error
      resultado.push(response.error);
    } else {
      // Se evalua mas de un error
      const mapaErrores = response.error.errors;
      const entradas = Object.entries(mapaErrores);
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0]; // nombre del campo
        arreglo[1].forEach((mensajeError: any) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }
  return resultado;
}
