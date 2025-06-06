{
  /* 
        <meshPhongMaterial
          color="rgb(22, 30, 82)"
          emissive="rgb(5, 7, 19)"
          specular="rgb(50, 70, 199)"
          shininess={1}
          refractionRatio={0.98}
          reflectivity={1}
        /> */
}
{
  /* <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexCode}
          fragmentShader={fragmentCode}
          ref={(ref): void => {
            materialRef.current = ref;
          }}
          key={`${background}-${land}-${outline}`}
          // depthWrite={false}
        />
        */
}

// export function createHexagonTexture(
//   image: HTMLImageElement,
//   hexRadius = 5,
//   spacing = 2
// ): THREE.CanvasTexture {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;
//   const { width, height } = image;

//   canvas.width = width;
//   canvas.height = height;

//   const hexHeight = Math.sqrt(3) * hexRadius;
//   const hexWidth = 2 * hexRadius;
//   const vertDist = hexHeight + spacing;
//   const horizDist = (3 / 4) * hexWidth + spacing;

//   // Dibujar la imagen en un canvas temporal para samplear colores
//   const tempCanvas = document.createElement("canvas");
//   const tempCtx = tempCanvas.getContext("2d")!;
//   tempCanvas.width = width;
//   tempCanvas.height = height;
//   tempCtx.drawImage(image, 0, 0);

//   for (let y = 0; y < height + hexHeight; y += vertDist) {
//     for (let x = 0; x < width + hexWidth; x += horizDist) {
//       const offsetX = (Math.floor(y / vertDist) % 2) * (hexWidth * 0.5);
//       const cx = x + offsetX;
//       const cy = y;

//       const sampleX = Math.floor(cx);
//       const sampleY = Math.floor(cy);
//       if (sampleX >= width || sampleY >= height) continue;

//       const pixel = tempCtx.getImageData(sampleX, sampleY, 1, 1).data;
//       const color = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${
//         pixel[3] / 255
//       })`;

//       drawHexagon(ctx, cx, cy, hexRadius, color);
//     }
//   }

//   const texture = new THREE.CanvasTexture(canvas);
//   texture.needsUpdate = true;
//   return texture;
// }

// function drawHexagon(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   r: number,
//   fill: string
// ): void {
//   ctx.beginPath();
//   for (let i = 0; i < 6; i++) {
//     const angle = (Math.PI / 3) * i;
//     const px = x + r * Math.cos(angle);
//     const py = y + r * Math.sin(angle);
//     if (i === 0) ctx.moveTo(px, py);
//     else ctx.lineTo(px, py);
//   }
//   ctx.closePath();
//   ctx.fillStyle = fill;
//   ctx.fill();
// }

// export function createHexagonTexturePointy(
//   image: HTMLImageElement,
//   radius: number = 20,
//   spacing: number = 5
// ): THREE.CanvasTexture {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d")!;
//   const { width, height } = image;

//   canvas.width = width;
//   canvas.height = height;

//   const hexWidth = Math.sqrt(3) * radius;
//   const hexHeight = 2 * radius;
//   const horizDist = hexWidth + spacing;
//   const vertDist = (3 / 4) * hexHeight + spacing;

//   const tempCanvas = document.createElement("canvas");
//   const tempCtx = tempCanvas.getContext("2d")!;
//   tempCanvas.width = width;
//   tempCanvas.height = height;
//   tempCtx.drawImage(image, 0, 0);

//   for (let y = 0; y < height + hexHeight; y += vertDist) {
//     for (let x = 0; x < width + hexWidth; x += horizDist) {
//       const offsetY = (Math.floor(x / horizDist) % 2) * (hexHeight * 0.5);
//       const cx = x;
//       const cy = y + offsetY;

//       const sampleX = Math.floor(cx);
//       const sampleY = Math.floor(cy);
//       if (sampleX >= width || sampleY >= height) continue;

//       const pixel = tempCtx.getImageData(sampleX, sampleY, 1, 1).data;
//       const color = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${
//         pixel[3] / 255
//       })`;

//       drawVerticalHexagon(ctx, cx, cy, radius, color);
//     }
//   }

//   const texture = new THREE.CanvasTexture(canvas);
//   texture.needsUpdate = true;
//   return texture;
// }

// function drawVerticalHexagon(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   r: number,
//   fill: string
// ): void {
//   ctx.beginPath();
//   for (let i = 0; i < 6; i++) {
//     const angle = (Math.PI / 180) * (60 * i - 30); // -30 to start with a point on top
//     const px = x + r * Math.cos(angle);
//     const py = y + r * Math.sin(angle);
//     if (i === 0) ctx.moveTo(px, py);
//     else ctx.lineTo(px, py);
//   }
//   ctx.closePath();
//   ctx.fillStyle = fill;
//   ctx.fill();
// }

export {};
