
const caracteres = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


export function encode(id: number): string {
  if (id === 0) return caracteres[0];

  let res = "";
  let num = id;

  while (num > 0) {
    // 1. Obtenemos el resto de la división por 62
    // Esto nos da la posición del carácter en nuestro ALFABETO
    const remainder = num % 62;
    res = caracteres[remainder] + res;

    // 2. Dividimos el número entre 62 y redondeamos hacia abajo para la siguiente iteración
    num = Math.floor(num / 62);

  }

  return res;
}

export function decode(str: string): number {
  let id = 0;

  for (let i = 0; i < str.length; i++) {
    id = id * 62 + caracteres.indexOf(str[i]);
  }
  return id;
}
