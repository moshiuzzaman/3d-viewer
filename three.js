//importing necessary things
import * as THREE from "three";
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from "./files/Loader.js";
import { FBXLoader } from "./files/Loader.js";
import { OBJLoader } from "./files/Loader.js";

//console.log(ARButton);
let camera,
    scene,
    renderer,
    obj = "",
    controls;
let add = 10,
    maxAngleForOrbit = 3.4,
    minAngleForOrbit = 0,
    zoomMax = 70,
    zoomMin = 10;

init();
render();

function init() {
    //getting canvas
    var canvReference = document.getElementById("myCanvasElement");

    //create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color("skyblue");

    //set resderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvReference,
        preserveDrawingBuffer: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    //setup camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
    );
    camera.position.set(0, 0, 25);

    //setup light
    let light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1.5 );
    scene.add(light);
    let DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    DirectionalLight.position.set( 5, 5, 1.5);
    scene.add(DirectionalLight);



    // file handle start
    let file = null,
        x;

    const FBXloader = new FBXLoader();
    const GLTFloader = new GLTFLoader();
    const OBJloader = new OBJLoader();

    FBXloader.load("asset/fire.fbx", function (fbx) {
        obj = fbx;
        obj.scale.set(4, 4, 4);
        scene.add(obj);
    });

    //events for file uploader start
    const inputElement = document.getElementById("fileInput");
    inputElement.addEventListener("change", handleFiles, false);
    
    function handleFiles() {
        const fileList = this.files;
        file = fileList[0];
    }

    document.getElementById("fileUploadBtn").addEventListener("click", () => {
        x = URL.createObjectURL(file);
        // console.log(x);

        let fileName = file.name.split(".");
        let fileExt = fileName[fileName.length - 1];

        if (fileExt === "fbx") {
            scene.remove(obj);
            FBXloader.load(x, function (fbx) {
                obj = fbx;
                // obj.position.set(0, -5, 0);
                obj.scale.set(0.01, 0.01, 0.01);
                scene.add(obj);
            });
        } else if (fileExt === "glb" || fileExt === "gltf") {
            // console.log(obj);
            scene.remove(obj);
            GLTFloader.load(x, function (gltf) {
                obj = gltf.scene;
                obj.scale.set(1, 1, 1);
                scene.add(obj);
            });
        } else if (fileExt === "obj") {
            scene.remove(obj);
            OBJloader.load(x, function (objNew) {
                obj = objNew;
                obj.scale.set(4, 4, 4);
                scene.add(obj);
            });
        }
    });
    

    //events for file uploader end

    //events for url uploader start

    let link;
    const urlinputElement = document.getElementById("urlInput");
    urlinputElement.addEventListener("change", urlhandleFiles, false);

    function urlhandleFiles() {
        link = this.value;
    }

    document.getElementById("urlUploadBtn").addEventListener("click", () => {
        x = link;

        let fileName = link.split(".");
        let fileExt = fileName[fileName.length - 1];
        
        if (fileExt === "fbx") {
            scene.remove(obj);
            FBXloader.load(x, function (fbx) {
                obj = fbx;
                obj.scale.set(4,4,4);
                scene.add(obj);
            });
        } else if (fileExt === "glb" || fileExt === "gltf") {
            scene.remove(obj);
            GLTFloader.load(x, function (gltf) {
                obj = gltf.scene;
                obj.scale.set(1, 1, 1);
                scene.add(obj);
            });
        } else if (fileExt === "obj") {
            scene.remove(obj);
            OBJloader.load(x, function (objNew) {
                obj = objNew;
                // console.log(obj);
                obj.scale.set(1, 1, 1);
                scene.add(obj);
            });
        }
    });
    

    //events for url uploader end


    // file handle end

    //setup orbit controller
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);

    controls.autoRotate = true;

    controls.screenSpacePanning = false;
    controls.update();

    renderer.setAnimationLoop(render);

    //for responsiveness
    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight, false);
    render();
}

function render() {
    if (controls.autoRotateSpeed !== add) controls.autoRotateSpeed = add;

    if (controls.minDistance !== zoomMin) controls.minDistance = zoomMin;

    if (controls.maxDistance !== zoomMax) controls.maxDistance = zoomMax;

    if (controls.minPolarAngle !== minAngleForOrbit)
        controls.minPolarAngle = minAngleForOrbit;

    if (controls.maxPolarAngle !== maxAngleForOrbit)
        controls.maxPolarAngle = maxAngleForOrbit;

    controls.update();
    renderer.render(scene, camera);
}

let setZoomMax = (value) => {
    zoomMax = value;
};
let setZoomMin = (value) => {
    zoomMin = value;
};
let setMaxAngleForOrbit = (value) => {
    maxAngleForOrbit = value;
};
let setMinAngleForOrbit = (value) => {
    minAngleForOrbit = value;
};
let setAdd = (value) => {
    add = value;
};

export {
    scene,
    THREE,
    setZoomMax,
    setZoomMin,
    setMaxAngleForOrbit,
    setMinAngleForOrbit,
    
    setAdd,
   
};
