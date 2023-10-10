export function DegToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export const Random = function(min: number,max: number): number {
  return Math.random() * (max - min) + min;
}