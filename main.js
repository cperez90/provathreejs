import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
renderer.setAnimationLoop(animate);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.querySelector('body').appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000);
const scene = new THREE.Scene();

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// Cub
const cubeGeo = new THREE.BoxGeometry( 2, 2, 2 ); 
const cubeMat = new THREE.MeshStandardMaterial({
  color: 0xff0000
}); 
const cube = new THREE.Mesh( cubeGeo, cubeMat ); 
cube.castShadow = true;
scene.add(cube);

//camera.position.z = 5;
camera.position.set(10 ,5 ,10);
camera.lookAt(cube.position);


// Luz
const llumGlobal = new THREE.DirectionalLight( 0xff0000, 5);
llumGlobal.rotateX(45);
llumGlobal.rotateY(60);
llumGlobal.castShadow = true
scene.add(llumGlobal);

const light = new THREE.AmbientLight( 0x404040, 2 );
light.castShadow = true;
scene.add( light );

let time = Date.now();
function animate(){
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;
  ////////
  cube.rotateX(0.001 * deltaTime);
  cube.rotateY(0.001 * deltaTime);
  //cube.rotateZ(0.01);
  //////
  renderer.render(scene,camera);
}

// Plane
const planeGeometry = new THREE.PlaneGeometry(20,20,60);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x00f00f});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);

plane.receiveShadow = true;
plane.rotateX(5);
plane.receiveShadow = true;
plane.position.set(0,0,-7);
scene.add(plane);

