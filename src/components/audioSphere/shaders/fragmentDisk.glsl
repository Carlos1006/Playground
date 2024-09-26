
varying vec3 vPosition;

void main(){
  gl_FragColor=vec4(.5+.5*normalize(vPosition),1.);
}