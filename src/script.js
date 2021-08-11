import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import testVertexShader from './shaders/test/vertex.glsl'
import testFragmentShader from './shaders/test/fragment.glsl'

import fragmentShader from './shaders/distrotion/fragment.glsl';
import vertexShader from './shaders/distrotion/vertex.glsl';

import gsap from 'gsap';

/**
 * Base
 */
// Debug



// Intro txt
function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }
    return isMobile;

}

const textStyle = {
    family: "'Helvetica',sans-serif",
    weight: 900,
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 100,
    paddingBottom: 100,
    fill: 'white'
};

// Into Text
const text = new Blotter.Text("Hello, I'm Alin", {
    ...textStyle,
    size: isMobile() ? 30 : 70
});

const text1 = new Blotter.Text("a frontend developer looking for things to build", {
    ...textStyle,
    size: isMobile() ? 10 : 20,
    paddingTop: 90
});

const material = new Blotter.LiquidDistortMaterial();
material.uniforms.uSpeed.value = .4;
material.uniforms.uVolatility.value = .03;

const blotter = new Blotter(material, { texts: text });
const blotter1 = new Blotter(material, { texts: text1 });

const scope = blotter.forText(text);
const scope1 = blotter1.forText(text1);

scope1.appendTo(document.body);
scope.appendTo(document.body);

const texts = document.getElementsByClassName('b-canvas');

texts[0].style = 'top: 60%;';

const settings = {
    speed: 0.2,
    density: 10,
    strength: 0.05,
    frequency: 3.0,
    amplitude: 8.0,
    moveX: 0,
    moveY: 0
};

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
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 2)
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
renderer.setClearColor(0x9EC9E2, 1)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scroll = (direction, cameraIncrement) => {
    if (direction === 'up') {
        if (camera.position.y > -2) {
            gsap.to('.b-canvas', {
                scale: 0
            })
            freshWater.scale.x += .12;
            camera.position.y -= cameraIncrement;
        }
    } else if (direction === 'down') {
        if (camera.position.y < 0) {
            freshWater.scale.x -= .12;
            camera.position.y += cameraIncrement;
            gsap.to('.b-canvas', {
                scale: 1
            })
        } else {
            freshWater.scale.x = 1;
            camera.position.y = 0;
        }
    }
}

window.addEventListener('wheel', () => {
    // console.log('cameraPosition', camera.position);

    if (event.deltaY < 0) {
        scroll('down', .1);
    }
    else if (event.deltaY > 0) {
        scroll('up', .1);
    }
})

const mc = new Hammer(canvas);

mc.get('pan').set({
    direction: Hammer.DIRECTION_ALL
})

mc.on("panup", ev => {
    const { pointerType } = ev;

    if (pointerType === "touch") {
        scroll('up', .3);
    }
})

mc.on("pandown", ev => {
    const { pointerType } = ev;

    if (pointerType === "touch") {
        scroll('down', .3);
    }
})


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

    if (intersects.length) {
        plane.material.uniforms.uMouse.value = intersects[0].point;
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
