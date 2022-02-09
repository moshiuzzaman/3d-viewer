//importing necessary things
import * as THREE from "three";
import { OrbitControls } from "OrbitControls";

import { GLTFLoader, OBJLoader, FBXLoader } from "https://cdn.jsdelivr.net/gh/Siam456/FT_Filees@main/files/Loader.js";

//console.log(ARButton);
let camera,
  scene,
  renderer,
  obj = "",
  mixer,
  controls;

const clock = new THREE.Clock();

init();
render();

function init() {
  //getting canvas
  var canvReference = document.getElementById("myCanvasElement");

  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor[0]);

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
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

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

        let y = 0.5;
        if (!isNaN(maxAxis)) {
          obj.scale.multiplyScalar(10 / maxAxis);
          // y = 10 / maxAxis + 1;
        } else {
          obj.scale.set(0.02, 0.02, 0.02);
          y = 0.1;
        }

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        for (let element of obj.children) {
          if (element.children.length === obj.children.length) {
            element.position.set(offset.x, offset.y, offset.z);
            break;
          } else obj.position.y -= y;
        }
        // console.log(obj);

        if (obj.animations.length) {
          mixer = new THREE.AnimationMixer(obj);
          for (let i = 0; i < obj.animations.length; i++) {
            mixer.clipAction(obj.animations[0]).play();
          }

          obj.castShadow = true;
        }

        scene.add(obj);
      });
    } else if (fileExt === "glb" || fileExt === "gltf") {
      scene.remove(obj);
      GLTFloader.load(x, function (gltf) {
        obj = gltf.scene;
        var bbox = new THREE.Box3().setFromObject(obj);
        // var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());

        var maxAxis = Math.max(size.x, size.y, size.z);
        if (!isNaN(maxAxis)) {
          obj.scale.multiplyScalar(10 / maxAxis);
        } else {
          obj.scale.set(0.02, 0.02, 0.02);
        }

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length) element.position.set(offset.x, offset.y, offset.z);
        });

        // console.log(gltf.animations.length);
        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(gltf.scene);
          mixer.clipAction(gltf.animations[0]).play();
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

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length) element.position.set(offset.x, offset.y, offset.z);
        });

        if (obj.animations.length) {
          mixer = new THREE.AnimationMixer(obj);
          const action = mixer.clipAction(obj.animations[0]);
          action.play();
          obj.castShadow = true;
        }
        // console.log(objNew);

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

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length) element.position.set(offset.x, offset.y, offset.z);
        });

        if (obj.animations.length) {
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

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length) element.position.set(offset.x, offset.y, offset.z);
        });

        if (gltf.animations.length) {
          mixer = new THREE.AnimationMixer(gltf.scene);
          mixer.clipAction(gltf.animations[0]).play();
        }
        // console.log(obj);
        scene.add(gltf);
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

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length) element.position.set(offset.x, offset.y, offset.z);
        });

        if (obj.animations.length) {
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

  if (controls.minPolarAngle !== minAngleForOrbit) controls.minPolarAngle = minAngleForOrbit;

  if (controls.maxPolarAngle !== maxAngleForOrbit) controls.maxPolarAngle = maxAngleForOrbit;

  if (mixer) mixer.update(clock.getDelta());

  controls.update();
  renderer.render(scene, camera);
}

//////////////////////////adding script file //////////////////
//////////////////////...............////////////////////////////
/////////////////////////...........//////////////////////////////////

//rotation section
var checkBox = document.getElementById("autoRotationBtn");

checkBox.addEventListener("click", () => {
  if (checkBox.checked === true) {
    //add = 0.005;
    add = document.getElementById("myRange").value;
    // console.log(document.getElementById("myRange").value/300 );
  } else {
    add = 0;
  }
});

var RotationSpeed = document.getElementById("myRange");
RotationSpeed.oninput = function () {
  checkBox.checked = true;
  add = this.value;
};

var RotationTopLimite = document.getElementById("myRangeTopLimite");
RotationTopLimite.oninput = function () {
  maxAngleForOrbit = this.value;
};

var RotationBottomLimite = document.getElementById("myRangeBottomLimite");
RotationBottomLimite.oninput = function () {
  minAngleForOrbit = this.value;
};

//rotation section end

//zomm section start
let inX = document.getElementById("ZoomLimiteIn").value,
  outX = document.getElementById("ZoomLimiteOut").value;

var ZoomLimiteIn = document.getElementById("ZoomLimiteIn");
ZoomLimiteIn.oninput = function () {
  checkBoxZoom.checked = true;
  zoomMin = this.value;
  inX = this.value;
};

var ZoomLimiteOut = document.getElementById("ZoomLimiteOut");
ZoomLimiteOut.oninput = function () {
  checkBoxZoom.checked = true;
  zoomMax = this.value;
  outX = this.value;
};

var checkBoxZoom = document.getElementById("ZoomBtn");

checkBoxZoom.addEventListener("click", () => {
  if (checkBoxZoom.checked !== true) {
    zoomMin = 25;
    zoomMax = 25;
  } else {
    zoomMin = inX;
    zoomMax = outX;
  }
});

//zoom section end

///scene background color change part start
let bgLeftBtn = document.querySelector(".bgLeftBtn");
let bgRightBtn = document.querySelector(".bgRightBtn");

bgLeftBtn.addEventListener("click", () => {
  document.getElementById("plainBackground").classList.remove("hide");
  document.getElementById("TextureBackground").classList.add("hide");
}); //
bgRightBtn.addEventListener("click", () => {
  document.getElementById("plainBackground").classList.add("hide");
  document.getElementById("TextureBackground").classList.remove("hide");
}); //

let skybox = null;

document.getElementsByName("bg").forEach((radio) => {
  radio.addEventListener("click", () => {
    if (radio.value === "skyblue") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[0]);
    } else if (radio.value === "red") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[1]);
    } else if (radio.value === "gray") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[2]);
    } else if (radio.value === "blue") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[3]);
    } else if (radio.value === "green") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[4]);
    } else if (radio.value === "yellow") {
      if (skybox !== null) scene.remove(skybox);
      scene.background = new THREE.Color(bgColor[5]);
    } else if (radio.value === "texture1") {
      if (skybox !== null) scene.remove(skybox);
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load(bgTexrute[0].texture_ft);
      let texture_bk = new THREE.TextureLoader().load(bgTexrute[0].texture_bk);
      let texture_up = new THREE.TextureLoader().load(bgTexrute[0].texture_up);
      let texture_dn = new THREE.TextureLoader().load(bgTexrute[0].texture_dn);
      let texture_rt = new THREE.TextureLoader().load(bgTexrute[0].texture_rt);
      let texture_lf = new THREE.TextureLoader().load(bgTexrute[0].texture_lf);

      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

      for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

      let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
      skybox = new THREE.Mesh(skyboxGeo, materialArray);
      // scene.background = null;
      scene.add(skybox);
    } else if (radio.value === "texture2") {
      if (skybox !== null) scene.remove(skybox);
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load(bgTexrute[1].texture_ft);
      let texture_bk = new THREE.TextureLoader().load(bgTexrute[1].texture_bk);
      let texture_up = new THREE.TextureLoader().load(bgTexrute[1].texture_up);
      let texture_dn = new THREE.TextureLoader().load(bgTexrute[1].texture_dn);
      let texture_rt = new THREE.TextureLoader().load(bgTexrute[1].texture_rt);
      let texture_lf = new THREE.TextureLoader().load(bgTexrute[1].texture_lf);

      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

      for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

      let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
      skybox = new THREE.Mesh(skyboxGeo, materialArray);
      // scene.background = null;
      scene.add(skybox);
    } else if (radio.value === "texture3") {
      if (skybox !== null) scene.remove(skybox);
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load(bgTexrute[2].texture_ft);
      let texture_bk = new THREE.TextureLoader().load(bgTexrute[2].texture_bk);
      let texture_up = new THREE.TextureLoader().load(bgTexrute[2].texture_up);
      let texture_dn = new THREE.TextureLoader().load(bgTexrute[2].texture_dn);
      let texture_rt = new THREE.TextureLoader().load(bgTexrute[2].texture_rt);
      let texture_lf = new THREE.TextureLoader().load(bgTexrute[2].texture_lf);

      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

      for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

      let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
      skybox = new THREE.Mesh(skyboxGeo, materialArray);
      // scene.background = null;
      scene.add(skybox);
    }
  });
});

//change background color event end

//uploader section

///scene background color change part start
let upLeftBtn = document.querySelector(".upLeftBtn");
let upRightBtn = document.querySelector(".upRightBtn");

upLeftBtn.addEventListener("click", () => {
  document.getElementById("uploadFile").classList.remove("hide");
  document.getElementById("urlFile").classList.add("hide");
}); //
upRightBtn.addEventListener("click", () => {
  document.getElementById("uploadFile").classList.add("hide");
  document.getElementById("urlFile").classList.remove("hide");
}); //

//for collapsable design

var colBtn1 = document.getElementById("col1");
var colBtn2 = document.getElementById("col2");
var colBtn3 = document.getElementById("col3");
var colBtn4 = document.getElementById("col4");
//rotation

let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");
let icon3 = document.getElementById("icon3");
let icon4 = document.getElementById("icon4");

colBtn1.addEventListener("click", function () {
  var content1 = this.nextElementSibling;
  var content2 = colBtn2.nextElementSibling;
  var content3 = colBtn3.nextElementSibling;
  var content4 = colBtn4.nextElementSibling;
  if (content1.style.maxHeight) {
    content1.style.maxHeight = null;
    icon1.classList.remove("rotation");
  } else {
    content1.style.maxHeight = content1.scrollHeight + "px";
    content2.style.maxHeight = null;
    content3.style.maxHeight = null;
    content4.style.maxHeight = null;

    icon1.classList.add("rotation");
    icon2.classList.remove("rotation");
    icon3.classList.remove("rotation");
    icon4.classList.remove("rotation");
  }
});

colBtn2.addEventListener("click", function () {
  var content1 = this.nextElementSibling;
  var content2 = colBtn1.nextElementSibling;
  var content3 = colBtn3.nextElementSibling;
  var content4 = colBtn4.nextElementSibling;
  if (content1.style.maxHeight) {
    content1.style.maxHeight = null;
    icon2.classList.remove("rotation");
  } else {
    content1.style.maxHeight = content1.scrollHeight + "px";
    content2.style.maxHeight = null;
    content3.style.maxHeight = null;
    content4.style.maxHeight = null;

    icon1.classList.remove("rotation");
    icon2.classList.add("rotation");
    icon3.classList.remove("rotation");
    icon4.classList.remove("rotation");
  }
});

colBtn3.addEventListener("click", function () {
  var content1 = this.nextElementSibling;
  var content2 = colBtn2.nextElementSibling;
  var content3 = colBtn1.nextElementSibling;
  var content4 = colBtn4.nextElementSibling;
  if (content1.style.maxHeight) {
    content1.style.maxHeight = null;
    icon3.classList.remove("rotation");
  } else {
    content1.style.maxHeight = content1.scrollHeight + "px";
    content2.style.maxHeight = null;
    content3.style.maxHeight = null;
    content4.style.maxHeight = null;

    icon1.classList.remove("rotation");
    icon2.classList.remove("rotation");
    icon3.classList.add("rotation");
    icon4.classList.remove("rotation");
  }
});

colBtn4.addEventListener("click", function () {
  var content1 = this.nextElementSibling;
  var content2 = colBtn2.nextElementSibling;
  var content3 = colBtn3.nextElementSibling;
  var content4 = colBtn1.nextElementSibling;
  if (content1.style.maxHeight) {
    content1.style.maxHeight = null;
    icon4.classList.remove("rotation");
  } else {
    content1.style.maxHeight = content1.scrollHeight + "px";
    content2.style.maxHeight = null;
    content3.style.maxHeight = null;
    content4.style.maxHeight = null;

    icon1.classList.remove("rotation");
    icon2.classList.remove("rotation");
    icon3.classList.remove("rotation");
    icon4.classList.add("rotation");
  }
});

//snapshot and full screen

let fullScreen = document.getElementById("fullscreen");
let snapShot = document.getElementById("snapshot");

let check = true;
fullScreen.addEventListener("click", () => {
  if (check) {
    document.querySelector("#functions").classList.add("hide");
    document.querySelector(".heading").classList.add("hide");

    document.querySelector(".container").style.width = "100%";
    document.getElementById("myCanvasElement").style.height = "100vh";

    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // renderer.setSize(window.innerWidth, window.innerHeight, false);
    // render();
    check = false;
  } else {
    document.querySelector("#functions").classList.remove("hide");
    document.querySelector(".heading").classList.remove("hide");

    document.querySelector(".container").style.width = "80%";
    document.getElementById("myCanvasElement").style.height = "70vh";

    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    check = true;
  }
});
snapShot.addEventListener("click", () => {
  var canvas = document.getElementById("myCanvasElement");

  var url = canvas.toDataURL();

  var link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", "canvas.png");

  link.click();
});
