uniform sampler2D uImage;
varying vec2 vUv;
uniform vec3 uMouse;
varying vec3 vPosition;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main()	{
	
	float dist = length(vPosition - uMouse);
    float prox = 1. - map(dist, 0., .5, 0., 1.);

    prox = clamp(prox, 0., 1.);

    vec2 zoom = mix(vUv, uMouse.xy, prox);

	gl_FragColor = texture2D(uImage, zoom);
	// gl_FragColor = vec4(uMouse, 1.0);
}