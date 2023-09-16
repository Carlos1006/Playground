export function invertAngle(angle: number): number {
    return (360 - angle) % 360;
  }
  
  export function normalizeAngle(angle: number): number {
    let normalizeAngle = angle % 360;
    if (normalizeAngle < 0) {
      normalizeAngle += 360;
    }
    return normalizeAngle;
  }
  