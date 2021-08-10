varying vec3 vNormal;
uniform float uTime;
uniform vec3 uMouse;

varying vec2 vUv;
varying vec3 vPosition;
  
void main() {
    vec3 waterColors = vec3(0.32156862745098, 0.654901960784314, .8);


    vec4 colors = vec4(waterColors, .5);
    
    gl_FragColor = colors;
}  
