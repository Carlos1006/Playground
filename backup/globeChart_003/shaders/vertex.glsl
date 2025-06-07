varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position; // Guarda la posición del vértice en espacio 3D
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}