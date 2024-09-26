function interpolateColor(
  color1: number[],
  color2: number[],
  factor: number
): number[] {
  return color1.map((c, i) => c + factor * (color2[i] - c));
}

export function getColorAtPercentage(percentage: number, opacity = 1): string {
  const gradient = [
    { color: [131, 58, 180, opacity], position: 0 },
    { color: [29, 144, 253, opacity], position: 50 },
    { color: [69, 252, 239, opacity], position: 100 },
  ];

  if (percentage <= 0) return `rgba(${gradient[0].color.join(",")})`;
  if (percentage >= 100) return `rgba(${gradient[2].color.join(",")})`;

  let start, end;
  for (let i = 0; i < gradient.length - 1; i++) {
    if (
      percentage >= gradient[i].position &&
      percentage <= gradient[i + 1].position
    ) {
      start = gradient[i];
      end = gradient[i + 1];
      break;
    }
  }

  if (!start || !end) return "rgba(0,0,0,0)";

  const range = end.position - start.position;
  const factor = (percentage - start.position) / range;
  const color = interpolateColor(start.color, end.color, factor);

  return `rgba(${color.join(",")})`;
}
