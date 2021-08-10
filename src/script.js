import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

import fragmentShader from './shaders/distrotion/fragment.glsl';
import vertexShader from './shaders/distrotion/vertex.glsl';


/**
 * Base
 */
// Debug

const settings = {
    speed: 0.2,
    density: 5,
    strength: 0.05,
    frequency: 3.0,
    amplitude: 8.0,
    moveX: 0,
    moveY: 0
};


// const waterTexture = require('../static/water-pool-texture.png');
import waterTexture from '../static/water-pool-texture.png';
import archer from '../static/archer.png';

const gui = new dat.GUI()

const freshWaterControls = gui.addFolder('freshWaterControls');
freshWaterControls.add(settings, 'speed', 0, 10, 0.1)
freshWaterControls.add(settings, 'density', 0, 10, 0.1)
freshWaterControls.add(settings, 'strength', 0, 10, 0.01)
freshWaterControls.add(settings, 'frequency', 0, 10, 0.1);
freshWaterControls.add(settings, 'amplitude', 0, 10, 0.1);

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

/**
 * Test mesh
 */

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Geometry

const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
const planeMaterial = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    uniforms: {
        uImage: { value: new THREE.TextureLoader().load(archer) },
        uMouse: { value: new THREE.Vector3(0.0, 0.0, 0.0) }
    }
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// scene.add(plane);

const freshWaterBlobGeometry = new THREE.IcosahedronBufferGeometry(1, 64);
const freshWaterBlobMaterial = new THREE.ShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: settings.speed },
        uNoiseDensity: { value: settings.density },
        uNoiseStrength: { value: settings.strength },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
    },
    transparent: true,
    // wireframe: true
});

// Mesh
const freshWater = new THREE.Mesh(freshWaterBlobGeometry, freshWaterBlobMaterial)
scene.add(freshWater)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 1.7)
scene.add(camera)

raycaster.setFromCamera(mouse, camera);


function onMouseMove(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);



// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true


/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock();

/**
 * Animate
 */
const tick = () => {
    // Update controls
    // controls.update()

    // update freshWater
    freshWater.material.uniforms.uTime.value = clock.getElapsedTime();
    freshWater.material.uniforms.uSpeed.value = settings.speed;
    freshWater.material.uniforms.uNoiseDensity.value = settings.density;
    freshWater.material.uniforms.uNoiseStrength.value = settings.strength;
    freshWater.material.uniforms.uFrequency.value = settings.frequency;
    freshWater.material.uniforms.uAmplitude.value = settings.amplitude;

    // calculate objects intersecting the picking ray
    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObjects(scene.children);
    // console.log(intersects)



    if (intersects.length) {
        plane.material.uniforms.uMouse.value = intersects[0].point;
    }

    // Render
    renderer.render(scene, camera)



    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
