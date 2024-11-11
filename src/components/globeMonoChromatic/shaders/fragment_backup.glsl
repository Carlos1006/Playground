uniform sampler2D uBaseTexture;
      uniform sampler2D uLightenTexture;
      varying vec2 vUv;

      void main() {
        vec4 baseColor = texture2D(uBaseTexture, vUv);
        vec4 lightenColor = texture2D(uLightenTexture, vUv);

        // Modo lighten: elige el color más claro de cada canal
        gl_FragColor = vec4(
          max(baseColor.r, lightenColor.r),
          max(baseColor.g, lightenColor.g),
          max(baseColor.b, lightenColor.b),
          1.0 // Opacidad total
        );
      }