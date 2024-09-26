export function hyperbolicParaboloid(u, v, target) {
  const a = 2; // Puedes ajustar los valores de a y b según la forma que desees
  const b = 2;

  // Ajustamos el rango de u y v para que varíen dentro de ciertos límites
  u = (u - 0.5) * 10; // Rango de u: [-5, 5]
  v = (v - 0.5) * 10; // Rango de v: [-5, 5]

  const x = u;
  const y = v;
  const z = (u * u) / (a * a) - (v * v) / (b * b);

  // Asignamos las coordenadas al target para que Three.js lo entienda
  target.set(x, y, z);
}


// Función paramétrica del hiperboloide
export function hyperboloid(u, v, target) {
  const a = 2; // Puedes ajustar los valores de a, b, c según el aspecto que desees
  const b = 2;
  const c = 2;

  // Parametrización del hiperboloide
  u = u * 2 * Math.PI; // Convertimos el rango de u a [0, 2π]
  v = (v - 0.5) * 4; // Convertimos v a un rango [-2, 2] (esto se puede ajustar)

  const x = a * Math.cosh(v) * Math.cos(u);
  const y = b * Math.cosh(v) * Math.sin(u);
  const z = c * Math.sinh(v);

  // Asignamos las coordenadas a target para que Three.js lo reconozca
  target.set(x, y, z);
}

export function normalHyperbolicParaboloid(u, v, target) {
  const a = 4; // Ajusta los valores de a y b para cambiar la curvatura
  const b = 4;

  // Ajustamos u y v a sus rangos
  u = (u - 0.5) * 10; // u varía entre [-5, 5], controla el tamaño
  v = (v - 0.5) * 10; // v varía entre [-5, 5], controla el tamaño

  // Ecuación paramétrica para paraboloide hiperbólico
  const x = u;
  const y = v;
  const z = (u * u) / (a * a) - (v * v) / (b * b);

  // Asignamos las coordenadas a target para que Three.js lo entienda
  target.set(x, y, z);
}