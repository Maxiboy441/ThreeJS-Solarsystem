import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import uranusTexture from '../img/uranus.jpg';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    12000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const sunLight = new THREE.PointLight(undefined,1);
scene.add(sunLight);
sunLight.castShadow = true;

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    scene.add(obj);
    mesh.position.x = position;
    obj.castShadow = true;
    obj.recivesShadow = true;
    return {mesh, obj}
}

const mercury = createPlanete(2.5, mercuryTexture, 58);
const venus = createPlanete(6, venusTexture, 108);
const earth = createPlanete(6.4, earthTexture, 150);
const mars = createPlanete(3.4, marsTexture, 230);
const jupiter = createPlanete(70, jupiterTexture, 780);
const saturn = createPlanete(58.2, saturnTexture, 1400);
const uranus = createPlanete(25.4, uranusTexture, 2900);
const neptune = createPlanete(24.6, neptuneTexture, 4500);
const pluto = createPlanete(2.4, plutoTexture, 6000);

function animate() {
    //Selfrotation
    sun.rotateY(0.004 / 2);
    mercury.mesh.rotateY(0.004 / 2);
    venus.mesh.rotateY(0.002 / 2);
    earth.mesh.rotateY(0.02 / 2);
    mars.mesh.rotateY(0.018 / 2);
    jupiter.mesh.rotateY(0.04 / 2);
    saturn.mesh.rotateY(0.038 / 2);
    uranus.mesh.rotateY(0.03 / 2);
    neptune.mesh.rotateY(0.032 / 2);
    pluto.mesh.rotateY(0.008 / 2);

    //Aroundsunrotation
    mercury.obj.rotateY(0.04 / 2);
    venus.obj.rotateY(0.015 / 2);
    earth.obj.rotateY(0.01 / 2);
    mars.obj.rotateY(0.008 / 2);
    jupiter.obj.rotateY(0.002 / 2);
    saturn.obj.rotateY(0.0009 / 2);
    uranus.obj.rotateY(0.0004 / 2);
    neptune.obj.rotateY(0.0001 / 2);
    pluto.obj.rotateY(0.00007 / 2);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});