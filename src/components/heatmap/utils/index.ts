/**
 * Oscurece un color dado un monto. Soporta formatos hexadecimales (#RRGGBB, #RGB, #RRGGBBAA, #RGBA) y rgba(r, g, b, a).
 * @param color - El color en formato hexadecimal o rgba (por ejemplo, "#RRGGBB", "#RRGGBBAA", "rgb(255, 255, 255)", "rgba(255, 255, 255, 0.5)").
 * @param amount - El monto para oscurecer (valor entre 0 y 255).
 * @returns El color oscurecido en formato hexadecimal o rgba.
 */
export function darker(color: string, amount: number): string {
  let r: number, g: number, b: number, a: number | undefined;

  if (color.startsWith("#")) {
    // Asegúrate de que el color esté en formato hexadecimal válido
    if (![4, 5, 7, 9].includes(color.length)) {
      throw new Error(
        "El color debe estar en formato hexadecimal (#RRGGBB, #RGB, #RRGGBBAA o #RGBA)."
      );
    }

    // Expande el formato corto (#RGB o #RGBA) a largo (#RRGGBB o #RRGGBBAA)
    if (color.length === 4 || color.length === 5) {
      color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${
        color[3]
      }${color.length === 5 ? `${color[4]}${color[4]}` : ""}`;
    }

    // Convierte el color a sus componentes RGBA
    r = parseInt(color.slice(1, 3), 16);
    g = parseInt(color.slice(3, 5), 16);
    b = parseInt(color.slice(5, 7), 16);
    a = color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : undefined;
  } else if (color.startsWith("rgb")) {
    // Extrae los valores RGBA del formato rgba(r, g, b, a)
    const match = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (!match) {
      throw new Error(
        "El color debe estar en formato rgb(r, g, b) o rgba(r, g, b, a)."
      );
    }

    r = parseInt(match[1], 10);
    g = parseInt(match[2], 10);
    b = parseInt(match[3], 10);
    a = match[4] !== undefined ? parseFloat(match[4]) : undefined;
  } else {
    throw new Error(
      "El color debe estar en formato hexadecimal (#RRGGBB, #RGB, #RRGGBBAA, #RGBA) o rgba(r, g, b, a)."
    );
  }

  // Oscurece cada componente
  const darken = (channel: number): number => Math.max(0, channel - amount);
  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);

  // Devuelve el color en el formato original
  if (a !== undefined) {
    // Si hay un canal alfa, devuelve en formato rgba
    return `rgba(${newR}, ${newG}, ${newB}, ${a.toFixed(2)})`;
  } else {
    // Si no hay canal alfa, devuelve en formato hexadecimal
    const toHex = (channel: number): string =>
      channel.toString(16).padStart(2, "0");
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  }
}

/**
 * Calcula el ancho de un texto utilizando un canvas.
 * @param {string} text - El texto cuyo ancho se desea calcular.
 * @param {string} font - La fuente que se usará para el texto (por ejemplo, "16px Arial").
 * @returns {number} - El ancho del texto en píxeles.
 */
export function measeureText(text: string, font: string): number {
  // Crear un canvas temporal
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return 0;
  }
  // Establecer la fuente en el contexto del canvas
  context.font = font;
  // Medir el ancho del texto
  const metrics = context.measureText(text);
  return metrics.width;
}

export function abbreviateText(text: string): string {
  const maxLength = 3; // Longitud máxima deseada
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..."; // Abreviar el texto
  }
  return text; // Retornar el texto original si no se necesita abreviar
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
