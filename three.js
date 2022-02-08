//importing necessary things
import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "./files/Loader.js";
import { FBXLoader } from "./files/Loader.js";
import { OBJLoader } from "./files/Loader.js";

//console.log(ARButton);
let camera,
    scene,
    renderer,
    obj = "",
    mixer,
    controls;
let add = 10,
    maxAngleForOrbit = 3.4,
    minAngleForOrbit = 0,
    zoomMax = 70,
    zoomMin = 10;

const clock = new THREE.Clock();

init();
render();

function resizeCanvasToDisplaySize() {}

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
        preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    //setup camera
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    camera.lookAt(scene.position);
    camera.position.set(0, 0, 25);

    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
        // you must pass false here or three.js sadly fights the browser
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // update any render target sizes here
    }

    //setup light
    let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);

    scene.add(light);

    let DirectionalLightbt = new THREE.DirectionalLight(0xffffff, 0.7);
    DirectionalLightbt.position.set(3, -8, 1.5);

    scene.add(DirectionalLightbt);

    let DirectionalLightside = new THREE.DirectionalLight(0xffffff, 0.5);
    DirectionalLightside.position.set(7, 8, 0);

    scene.add(DirectionalLightside);

    let DirectionalLightside2 = new THREE.DirectionalLight(0xffffff, 0.5);
    DirectionalLightside2.position.set(-7, 8, 0);

    scene.add(DirectionalLightside2);

    // const helper = new THREE.DirectionalLightHelper( DirectionalLightbt, 5 );
    // scene.add( helper );

    // file handle start
    let file = null,
        x;

    const FBXloader = new FBXLoader();
    const GLTFloader = new GLTFLoader();
    const OBJloader = new OBJLoader();

    FBXloader.load("asset/fire.fbx", function (fbx) {
        obj = fbx;
        var bbox = new THREE.Box3().setFromObject(obj);
        var size = bbox.getSize(new THREE.Vector3());

        var maxAxis = Math.max(size.x, size.y, size.z);
        // console.log(maxAxis);
        // obj.position.set(0, -5, 0);
        obj.scale.multiplyScalar(6 / maxAxis);

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
                var bbox = new THREE.Box3().setFromObject(obj);
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);

                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }

                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }
                
                scene.add(obj);
            });
        } else if (fileExt === "glb" || fileExt === "gltf") {
            console.log(obj);
            scene.remove(obj);
            GLTFloader.load(x, function (gltf) {
                obj = gltf.scene;
                var bbox = new THREE.Box3().setFromObject(obj);
                var cent = bbox.getCenter(new THREE.Vector3());
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);
                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }
                bbox.getCenter(cent);

                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }

                scene.add(obj);
            });
        } else if (fileExt === "obj") {
            scene.remove(obj);
            OBJloader.load(x, function (objNew) {
                obj = objNew;
                var bbox = new THREE.Box3().setFromObject(obj);
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);

                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }

                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }

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
                var bbox = new THREE.Box3().setFromObject(obj);
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);

                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }
                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }
                scene.add(obj);
            });
        } else if (fileExt === "glb" || fileExt === "gltf") {
            scene.remove(obj);
            GLTFloader.load(x, function (gltf) {
                obj = gltf.scene;
                var bbox = new THREE.Box3().setFromObject(obj);
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);

                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }
                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }
                scene.add(obj);
            });
        } else if (fileExt === "obj") {
            scene.remove(obj);
            OBJloader.load(x, function (objNew) {
                obj = objNew;
                // console.log(obj);
                var bbox = new THREE.Box3().setFromObject(obj);
                var size = bbox.getSize(new THREE.Vector3());

                var maxAxis = Math.max(size.x, size.y, size.z);

                if (!isNaN(maxAxis)) {
                    obj.scale.multiplyScalar(10 / maxAxis);
                } else {
                    obj.scale.set(0.02, 0.02, 0.02);
                }
                if(obj.animations.length){
                    mixer = new THREE.AnimationMixer(obj);
                    const action = mixer.clipAction(obj.animations[0]);
                    action.play();
                    obj.castShadow = true;
                }
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
    const canvas = renderer.domElement;

    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);

    // renderer.setSize(window.innerWidth, window.innerHeight, false);
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

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

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
    renderer,
    camera,
    setAdd,
};
