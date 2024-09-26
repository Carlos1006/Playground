varying vec3 vPosition;
uniform float a;
uniform float b;

void main(){
  vec3 pos=position;
  pos.z=(pos.x*pos.x)/(a*a)-(pos.y*pos.y)/(b*b);
  vPosition=pos;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
}