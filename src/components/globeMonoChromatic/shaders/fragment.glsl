uniform sampler2D uFillTexture;
uniform sampler2D uStrokeTexture;
uniform vec4 uBackgroundColor;
uniform vec4 uOutlineColor;
uniform vec4 uLandColor;
varying vec2 vUv;
// varying vec3 vPosition;
// uniform vec2 uMonterrey;

vec4 blendNormal(vec4 baseColor, vec4 blendColor) {
  float alpha = blendColor.a + baseColor.a * (1.0 - blendColor.a);
  vec3 color = (blendColor.rgb * blendColor.a + baseColor.rgb * baseColor.a * (1.0 - blendColor.a)) / alpha;
  return vec4(color, 1.0);
}

void main() {
  vec4 baseColor = texture2D(uFillTexture, vUv);
  vec4 strokeColor = texture2D(uStrokeTexture, vUv);

  // Modo lighten: elige el color más claro de cada canal
  // gl_FragColor = vec4(
  //   max(baseColor.r, strokeColor.r),
  //   max(baseColor.g, strokeColor.g),
  //   max(baseColor.b, strokeColor.b),
  //   1.0 // Opacidad total
  // );

  // gl_FragColor = vec4(
  //   baseColor.r,
  //   baseColor.g,
  //   baseColor.b,
  //   baseColor.a
  // );

  // ? vec4 color = vec4(0.4, 0.4, 0.5, 0.5);
  // ? if(baseColor.a > 0.1 || strokeColor.a > 0.1) {
  // ?   color = blendNormal(color, vec4(0.6, 0.6, 0.7, baseColor.a));
  // ?   color = blendNormal(color, vec4(0.3, 0.3, 0.4, strokeColor.a * 0.7));
  // ? }
  // ? gl_FragColor = color;

  vec4 color = uBackgroundColor;
  if(baseColor.a > 0.1 || strokeColor.a > 0.1) {
    color = blendNormal(color, vec4(uLandColor.rgb, baseColor.a));
    color = blendNormal(color, vec4(uOutlineColor.rgb, strokeColor.a * uOutlineColor[3]));
  }
  gl_FragColor = color;

  // ! gl_FragColor = vec(1.0, 1.0, 1.0, 0.0);
  // ! float correctedLongitude = -3.141592653589793;
  // ! float correctedLongitude = 0 -3.141592653589793;
  // ! vec3 targetPosition = vec3(cos(0.0) * cos(correctedLongitude), sin(0.0), cos(0.0) * sin(correctedLongitude));
  // ! Calcula la distancia entre la posición del fragmento y el punto objetivo
  // ! float dist = distance(normalize(vPosition), targetPosition);
  // ! 
  // ! // Si la distancia está dentro del radio, pinta el círculo
  // ! if(dist < 0.02) {
  // !   if(dist < 0.015) {
  // !     gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  // !   } else {
  // !     gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  // !   }
  // ! }
}