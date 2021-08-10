varying vec2 vUv;
varying vec3 vPosition;

const float pi = 3.1415925;

void main() {
  vUv = uv;
  vPosition = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
}
