uniform sampler2D uFillTexture;
uniform vec4 uOutlineColor;
uniform vec4 uLandColor;
varying vec2 vUv;

vec4 blendNormal(vec4 baseColor, vec4 blendColor) {
  float alpha = blendColor.a + baseColor.a * (1.0 - blendColor.a);
  vec3 color = (blendColor.rgb * blendColor.a + baseColor.rgb * baseColor.a * (1.0 - blendColor.a)) / alpha;
  return vec4(color, 1.0);
}

void main() {
  vec4 baseColor = texture2D(uFillTexture, vUv);

  vec4 color = vec4(0.0,0.0,0.0, 0.0);
  if(baseColor.a > 0.1) {
    color = blendNormal(color, vec4(uLandColor.rgb, baseColor.a));
  }
  gl_FragColor = color;

}