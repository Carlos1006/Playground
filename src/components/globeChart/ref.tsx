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

// function Hexagon({ position, normal, radius = 0.1 }): JSX.Element {
//   // Crear un hexágono plano con BufferGeometry
//   const geometry = useMemo(() => {
//     const shape = new THREE.Shape();
//     for (let i = 0; i < 6; i++) {
//       const angle = (Math.PI / 3) * i; // 60 grados
//       const x = radius * Math.cos(angle);
//       const y = radius * Math.sin(angle);
//       if (i === 0) shape.moveTo(x, y);
//       else shape.lineTo(x, y);
//     }
//     shape.closePath();
//     const geo = new THREE.ShapeGeometry(shape);
//     return geo;
//   }, [radius]);

//   // Crear una matriz para orientar el hexágono para que su "cara" coincida con la normal
//   const quaternion = new THREE.Quaternion();
//   quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

//   return (
//     <mesh
//       geometry={geometry}
//       position={position}
//       quaternion={quaternion}
//       castShadow
//       receiveShadow
//     >
//       <meshStandardMaterial color="black" />
//     </mesh>
//   );
// }

// function HexagonSphere(): JSX.Element {
//   const radius = 2; // radio esfera
//   const hexRadius = 0.1;
//   const hexagons = [];

//   // Ejemplo muy simple: colocar hexágonos en una rejilla esférica (latitud-longitud)
//   const latSteps = 20;
//   const lonSteps = 40;

//   for (let lat = 0; lat <= latSteps; lat++) {
//     const theta = (lat / latSteps) * Math.PI; // latitud 0 a PI
//     for (let lon = 0; lon < lonSteps; lon++) {
//       const phi = (lon / lonSteps) * 2 * Math.PI; // longitud 0 a 2PI

//       const x = radius * Math.sin(theta) * Math.cos(phi);
//       const y = radius * Math.cos(theta);
//       const z = radius * Math.sin(theta) * Math.sin(phi);

//       const position = new THREE.Vector3(x, y, z);
//       const normal = position.clone().normalize();

//       hexagons.push(
//         <Hexagon
//           key={`${lat}-${lon}`}
//           position={position}
//           normal={normal}
//           radius={hexRadius}
//         />
//       );
//     }
//   }

//   return <>{hexagons}</>;
// }

// ?

// function getHexCentersOnSphereBricked(
//   radius: number,
//   rows: number,
//   baseCols: number
// ) {
//   const positions = [];
//   for (let i = 0; i < rows; i++) {
//     const v = i / (rows - 1); // de 0 a 1
//     const phi = Math.PI * v; // de 0 a PI (latitud)
//     // Calcula columnas según la latitud (más en el ecuador, menos en los polos)
//     const sinPhi = Math.sin(phi);
//     const cols = Math.max(3, Math.round(baseCols * sinPhi));
//     for (let j = 0; j < cols; j++) {
//       // Desfase tipo ladrillo en filas impares
//       const offset = i % 2 === 0 ? 0 : (Math.PI * 2) / (2 * cols);
//       const u = j / cols;
//       const theta = u * Math.PI * 2 + offset; // de 0 a 2PI (longitud)
//       // Conversión esférica a cartesiana
//       const x = radius * Math.sin(phi) * Math.cos(theta);
//       const y = radius * Math.cos(phi);
//       const z = radius * Math.sin(phi) * Math.sin(theta);
//       positions.push(new THREE.Vector3(x, y, z));
//     }
//   }
//   return positions;
// }

//   {getHexCentersOnSphereBricked(2.05, 40, 60).map((pos, idx) => {
//         const normal = pos.clone().normalize();
//         const quaternion = new THREE.Quaternion().setFromUnitVectors(
//           new THREE.Vector3(0, 0, 1),
//           normal
//         );
//         return (
//           <mesh key={idx} position={pos} quaternion={quaternion}>
//             <circleGeometry args={[0.08, 6]} />
//             <meshStandardMaterial color="#FFD700" transparent opacity={0.7} />
//           </mesh>
//         );
//       })}

// function getTexturePixel(
//   texture: THREE.Texture,
//   u: number,
//   v: number
// ): Uint8ClampedArray<ArrayBufferLike> {
//   const canvas = document.createElement("canvas");
//   canvas.width = texture.image.width;
//   canvas.height = texture.image.height;
//   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
//   ctx.drawImage(texture.image, 0, 0);
//   const x = Math.floor(u * (canvas.width - 1));
//   const y = Math.floor(v * (canvas.height - 1));
//   const pixel = ctx.getImageData(x, y, 1, 1).data;
//   return pixel; // [r, g, b, a]
// }

export {};
