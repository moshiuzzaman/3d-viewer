let mainController;
if (typeof (userController) == "object") {
  mainController = userController;
} else {
  mainController = {
    // Header
    header: "3d viewer",
    // Defaul model link
    defaultModelLink: "https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf",
    // Rotation
    autoRotationMinSpeed: -50,
    autoRotationMaxSpeed: 50,
    rotationTopMinLimit: 0,
    rotationTopMaxLimit: 1.3707963267948966,
    rotationBottomMinLimit: 0,
    rotationBottomMaxLimit: 1.5707963267948966,

    // Zoom
    zoomInMinLimit: 0,
    zoomInMaxLimit: 30,
    zoomOutMinLimit: 0,
    zoomOutMaxLimit: 20,

    // Background color
    color_1: "rgb(13, 202, 240)",
    color_2: "rgb(220, 53, 69)",
    color_3: "rgb(108, 117, 125)",
    color_4: "rgb(13, 110, 253)",
    color_5: "rgb(25, 135, 84)",
    color_6: "rgb(255, 193, 7)",

    // Default background color
    defaultBackgroundColor : ["rgb(130, 202, 140)"],

    // Texture Background
    textureBackground: {
      bg_1: {
        posx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/posx.jpg",
        negx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/negx.jpg",
        posy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/posy.jpg",
        negy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/negy.jpg",
        posz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/posz.jpg",
        negz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_1/negz.jpg"
      },
      bg_2: {
        posx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/posx.jpg",
        negx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/negx.jpg",
        posy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/posy.jpg",
        negy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/negy.jpg",
        posz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/posz.jpg",
        negz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_2/negz.jpg"

      },
      bg_3: {
        posx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/posx.jpg",
        negx: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/negx.jpg",
        posy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/posy.jpg",
        negy: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/negy.jpg",
        posz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/posz.jpg",
        negz: "https://raw.githubusercontent.com/abirhussain/threejsProject/main/textures/scene_3/negz.jpg"

      }
    }
  }
}

// Background color
const backgroundColor = {
  color_1: "rgb(13, 202, 240)",
  color_2: "rgb(220, 53, 69)",
  color_3: "rgb(108, 117, 125)",
  color_4: "rgb(13, 110, 253)",
  color_5: "rgb(25, 135, 84)",
  color_6: "rgb(255, 193, 7)",

}

document.getElementById("root").innerHTML = `
<!--Outermost div start-->
<div id="outerMostDiv">
  <!--Home component start-->
  <div id="homeComponent" class="homeComponent">
    <h1 class="mb-3" align="center">${mainController.header ? mainController.header : " "}</h1>
    <div class="row">
      <!--Canvas start-->
      <div id="canvasComponent" class="col-md-7 canvasComponent">
        <div id="canvasControl" class="canvasControl">
          <button type="button" id="button" class="btn btn-light" >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5h5V3H3v7h2zm5 14H5v-5H3v7h7zm11-5h-2v5h-5v2h7zm-2-4h2V3h-7v2h5z"
              ></path>
            </svg>
          </button>
          <button type="button" id="snapButton" class="btn btn-light">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  d="M3 3h2v2H3V3zm4 0h2v2H7V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm0 4h2v2h-2V7zM3 19h2v2H3v-2zm0-4h2v2H3v-2zm0-4h2v2H3v-2zm0-4h2v2H3V7zm7.667 4l1.036-1.555A1 1 0 0 1 12.535 9h2.93a1 1 0 0 1 .832.445L17.333 11H20a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2.667zM14 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        <div
          style="
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          "
          id="renderCanvas"
          width="650"
          height="3000"
          class="canvas-style"
        >
          <canvas
            id="modelCanvas"
            style="display: block; width: 643.333px; height: 511.667px"
            tabindex="-1"
            width="643"
            height="511"
          >
          </canvas>
        </div>
      </div>
      <!--Canvas End-->
      <!--Configuration start-->
      <div id="conficComponent" class="col-md-5">
        <!--Configuration Header Start-->
        <div class="config-section-header">
          <h6>Configuration</h6>
        </div>
        <!--Configuration Header End-->
        <!--Accordion start-->
        <!--Rotation Button Start-->
        <button class="accordion">Rotation<i class="fa fa-angle-right" style="font-size:24px; float: right;"></i></button>
        <div id="panel" class="panel">
          <div class="mb-2 row">
            <div class="col-md-8">Autorotation</div>
            <div class="d-flex justify-content-end col-md-4">
              <div class="form-check form-switch">
                <input id="autoRotationControl" class="form-check-input" type="checkbox" checked>
              </div>

            </div>
          </div>
          <div class="rotation_speed">
            <p class="mb-1">Autorotation speed</p>
            <input
              type="range"
              id="autoRotationSpeed"
              class="form-range"
              name="AutoRotationSpeed"
              min="${mainController.autoRoationMinSpeed? mainController.autoRoationMinSpeed: -50}"
              max="${mainController.autoRoationMaxSpeed? mainController.autoRoationMaxSpeed: 50}"
              value="5"
            />
          </div>
          <div class="rotation_limit">
            <p class="mb-1">Rotation Top Limit</p>
            <input
              type="range"
              id="rotation_top_limit"
              class="form-range"
              min= "${mainController.rotationTopMinLimit? mainController.rotationTopMinLimit: 0}"
              max="${mainController.rotationTopMaxLimit? mainController.rotationTopMaxLimit: 1.3707963267948966}"
              step="0.1"
              
            />
          </div>
          <div class="rotation_limit">
            <p class="mb-1">Rotation Bottom Limit</p>
            <input
              type="range"
              id="rotation_bottom_limit"
              class="form-range"
              min="${mainController.rotationBottomMinLimit? mainController.rotationBottomMinLimit: 0}"
              max="${mainController.rotationBottomMaxLimit? mainController.rotationBottomMaxLimit: 1.5707963267948966}"
              step="0.1"
              
            />
          </div>
        </div>
        <!--Zoom Button start-->
        <button class="accordion">Zoom<i class="fa fa-angle-right" style="font-size:24px; float: right;"></i></button>
        <div class="panel">
          <div class="mb-2 row">
            <div class="col-md-8">Zoom Enable</div>
            <div class="d-flex justify-content-end col-md-4">
              <div class="form-check form-switch">
    
                  <input
                  class="form-check-input"
                  type="checkbox"
                  id="ZoomControl"
                  checked
                />
              </div>
            </div>
          </div>
          <div class="zoom_in_limit">
            <p class="mb-1">Zoom In limit</p>
            <input
              type="range"
              class="form-range"
              min="${mainController.zoomInMinLimit? mainController.zoomInMinLimit: 0}"
              max="${mainController.zoomInMaxLimit? mainController.zoomInMaxLimit: 30}"
              step="5"
              id="zoom_in_limit"
              value="0"
            />
          </div>
          <div class="zoom_out_limit">
            <p class="mb-1">Zoom Out limit</p>
              <input
              type="range"
              class="form-range"
              min="${mainController.zoomOutMinLimit? mainController.zoomOutMinLimit: 0}"
              max="${mainController.zoomOutMaxLimit? mainController.zoomOutMaxLimit: 20}"
              step="4"
              id="zoom_out_limit"
              value="0"
            />
          </div>
        </div>
        <!--Background Button Start-->
        <button class="accordion">Background<i class="fa fa-angle-right" style="font-size:24px; float: right;"></i></button>
        <div class="panel">
          <div role="group" class="mb-2 w-100 btn-group">
            <button id="plainText" type="button" class="btn btn-info">
              Plain Background
            </button>
            <button
              id="textureUpload"
              type="button"
              class="btn btn-primary"
            >
              Texture Background
            </button>
          </div>
          <div id="set_background" class="accordion-body">
            <div
              id="plain_background_colors"
              class="plain_background_colors"
            >
              <p class="mb-1">Choose Plain Background Color</p>
              <div
                id="pb_1"
                style="
                  background: ${mainController.backgroundColor.color_1 ? mainController.backgroundColor.color_1: backgroundColor.color_1} none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
              <div
                id="pb_2"
                style="
                  background: ${mainController.backgroundColor.color_2 ? mainController.backgroundColor.color_2: backgroundColor.color_2}  none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
              <div
                id="pb_3"
                style="
                  background:${mainController.backgroundColor.color_3? mainController.backgroundColor.color_3: backgroundColor.color_3}  none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
              <div
                id="pb_4"
                style="
                  background: ${mainController.backgroundColor.color_4 ? mainController.backgroundColor.color_4: backgroundColor.color_4} none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
              <div
                id="pb_5"
                style="
                  background: ${mainController.backgroundColor.color_5 ? mainController.backgroundColor.color_5: backgroundColor.color_5} none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
              <div
                id="pb_6"
                style="
                  background: ${mainController.backgroundColor.color_6 ? mainController.backgroundColor.color_6: backgroundColor.color_6} none repeat scroll 0% 0%;
                "
                class="bc1"
              ></div>
            </div>
            <div
              id="texture_background_colors"
              class="texture_background_colors display-none"
            >
              <p class="mb-1">Choose Texture Background</p>
              <div
                id="texture_1"
                style="
                  background: rgba(0, 0, 0, 0)
                    url('${mainController.textureBackground.bg_1 ? mainController.textureBackground.bg_1.posx:""}') repeat scroll 0% 0%;
                "
                class="bc4"
              ></div>
              <div
                id="texture_2"
                style="
                  background: rgba(0, 0, 0) url('${mainController.textureBackground.bg_2 ? mainController.textureBackground.bg_2.posy:""}')
                    repeat scroll 0% 0%;
                "
                class="bc4"
              ></div>
              <div
                id="texture_3"
                style="
                  background: rgba(0, 0, 0, 0)
                  url('${mainController.textureBackground.bg_3 ? mainController.textureBackground.bg_3.posy:""}') repeat scroll 0% 0%;
                "
                class="bc4"
              ></div>
            </div>
          </div>
        </div>
        <!--Update A Model Button Start-->
        <button class="accordion">Upload A model<i class="fa fa-angle-right" style="font-size:24px; float: right;"></i></button>
        <div class="panel">
          <div class="accordion-body">
            <div role="group" class="mb-2 w-100 btn-group">
              <button
                id="fileUploadButton"
                type="button"
                class="btn btn-info"
              >
                File Upload
              </button>
              <button
                id="urlUploadButton"
                type="button"
                class="btn btn-primary"
              >
                Url Upload
              </button>
            </div>
            <div id="uploadModel" class="upload_model">
              <div id="fileUpload" class="mb-3">
                <label class="form-label" for="formFile"
                  >Upload a gltf/obj/fbx file</label
                ><input
                  type="file"
                  id="formFile"
                  class="form-control"
                  accept=".gltf,.fbx,.obj, .glb"
                /><button
                  id="uploadFile"
                  type="button"
                  class="w-100 mt-3 btn btn-success"
                >
                  File Upload
                </button>
              </div>
              <div id="urlUpload" class="mb-3 display-none">
                <label class="form-label" for="urlformFile"
                  >gltf/fbx/obj model url</label
                ><input
                  type="text"
                  id="urlformFile"
                  class="form-control"
                /><button
                  id="urlFileUpload"
                  type="button"
                  class="w-100 mt-3 btn btn-success"
                >
                  Url Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Accordion End-->
    </div>
    <!--Configuration End-->
  </div>
  <!--Home component end-->
</div>
<!--Outermost div end-->
<!--Action Script-->
`



// Bootstrap CSS Link
const bootstrapCssLink = document.createElement('link');
bootstrapCssLink.setAttribute(
  'href',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
);
bootstrapCssLink.setAttribute(
  'rel',
  'stylesheet'
);
bootstrapCssLink.setAttribute(
  'integrity',
  'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
)
bootstrapCssLink.setAttribute(
  'crossorigin',
  'anonymous'
)
document.head.appendChild(bootstrapCssLink);

// Bootstrap JS Link
const bootstrapScript = document.createElement('script');
bootstrapScript.setAttribute(
  'src',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
);
bootstrapScript.setAttribute(
  'integrity',
  'sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM'
)
bootstrapScript.setAttribute(
  'crossorigin',
  'anonymous'
)
document.head.appendChild(bootstrapScript);

// Font-awesome link
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.setAttribute(
  'rel',
  'stylesheet'
);
fontAwesomeLink.setAttribute(
  'href',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
);
document.head.appendChild(fontAwesomeLink);

// Add css file
let style = document.createElement("style");
style.innerHTML = `* {
  margin: 0px;
}
body {
  font-family: "Helvetica Neue", sans-serif;
}


h1,
h6 {
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.homeComponent {
  width: 1120px;
  margin: 0 auto !important;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}

.homeComponentFullScreen {
  width: 100%;
  margin: 0 auto !important;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}

.canvasComponent {
  position: relative;
}
.canvasControl {
  position: absolute;
  z-index: 5;
  right: 24px;
  top: 13px;
}
.config-section-header {
  background: #f1f1f1;
  font-size: 14px;
  font-weight: 500;
  padding: 18px 0 15px 30px;
  border-bottom: 1px solid #d8dee2;
  stroke: #eaeaea;
  text-align: center;
}

.bc1,
.bc2,
.bc3,
.bc4,
.bc5,
.bc6 {
  width: 40px;
  height: 40px;
  border-radius: 7px;
  display: inline-block;
  margin: 2px;
}
#loading_indicator {
  width: 650px;
}

.homeComponentFullScreen {
  width: 100%;
  height: 100%;
  margin: 0 auto !important;
  margin-top: 0px;
  margin-right: auto;
  margin-bottom: 0px;
  margin-left: auto;
}
.display-none {
  display: none;
}

.canvas-style {
  width: 641px;
  height: 511.667px !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.canvas-style-change {
  height: 100vh !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}

.canvasControl button {
  border-radius: 34px;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  border-bottom-right-radius: 34px;
  border-bottom-left-radius: 34px;
  border-top-left-radius: 34px;
  border-top-right-radius: 34px;
  border-bottom-right-radius: 34px;
  border-bottom-left-radius: 34px;
  width: 40px;
  margin: 3px;
  margin-top: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
  margin-left: 3px;
  position: relative;
}

.config-section-header {
  width: 100%;
  background: #f1f1f1;
  background-color: rgb(241, 241, 241);
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-attachment: scroll;
  background-image: none;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  font-size: 14px;
  font-weight: 500;
  padding: 18px 0 15px 30px;
  padding-top: 18px;
  padding-right: 0px;
  padding-bottom: 15px;
  padding-left: 30px;
  border-bottom: 1px solid #d8dee2;
  border-bottom-color: rgb(216, 222, 226);
  border-bottom-style: solid;
  border-bottom-width: 1px;
  stroke: #eaeaea;
  text-align: center;
}

.accordion {
  background-color: rgb(246, 243, 243);
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  overflow: hidden;
}
.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  display: none;
  background-color: white;
  overflow: hidden;
}

.display-none {
  display: none;
}

.accordion:after {
  content: "";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}


div.panel.show {
  display: block !important;
}
`
document.head.appendChild(style);

// Texture background button image
document.getElementById("texture_1").className = "display-none";
document.getElementById("texture_2").className = "display-none";
document.getElementById("texture_3").className = "display-none";

const textureItems = mainController.textureBackground;
for (const textureItem in textureItems) {
  if (textureItem == "bg_1") {
    document.getElementById("texture_1").className = "bc4";
  } else if (textureItem == "bg_2") {
    document.getElementById("texture_2").className = "bc4";
  } else if (textureItem == "bg_3") {
    document.getElementById("texture_3").className = "bc4";
  }
}

// Backgrouond color changing button color
for (let i = 1; i <= 6; i++) {
  document.getElementById("pb_" + i).className = 'display-none';
}

let backgroundColorList = Object.keys(mainController.backgroundColor);


for (let i = 0; i < backgroundColorList.length; i++) {
  if (backgroundColorList[i] == "color_1") {
    document.getElementById("pb_1").className = 'bc1';
  } else if (backgroundColorList[i] == "color_2") {
    document.getElementById("pb_2").className = 'bc1';
  } else if (backgroundColorList[i] == "color_3") {
    document.getElementById("pb_3").className = 'bc1';
  } else if (backgroundColorList[i] == "color_4") {
    document.getElementById("pb_4").className = 'bc1';
  } else if (backgroundColorList[i] == "color_5") {
    document.getElementById("pb_5").className = 'bc1';
  } else if (backgroundColorList[i] == "color_6") {
    document.getElementById("pb_6").className = 'bc1';
  }

}

/*************************Page Loading Event End************************** */

/*************************Three.js event start *************************** */
import * as THREE from "three";
import {
  OrbitControls
} from "https://cdn.jsdelivr.net/gh/Siam456/FT_Filees@main/files/OrbitControls.js";
import {
  GLTFLoader,
  OBJLoader,
  FBXLoader,
} from "https://cdn.jsdelivr.net/gh/Siam456/FT_Filees@main/files/Loader.js";

let scene, camera, renderer, mixer, controls, textureCube;
let object = "";
let clock = new THREE.Clock();
let isAutRotation = true;

init();

function init() {
  // Canvas
  const Canvas = document.getElementById("modelCanvas");

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 2, 25);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(mainController.defaultBackgroundColor?mainController.defaultBackgroundColor[0]:"rgb(130, 202, 140)");

  // Light
  let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);

  scene.add(light);

  let DirectionalLightbt = new THREE.DirectionalLight(0xffffff, 0.5);
  DirectionalLightbt.position.set(3, -5, 0);

  scene.add(DirectionalLightbt);

  let DirectionalLightside = new THREE.DirectionalLight(0xffffff, 0.5);
  DirectionalLightside.position.set(5, 5, 0);

  scene.add(DirectionalLightside);

  let DirectionalLightside2 = new THREE.DirectionalLight(0xffffff, 0.5);
  DirectionalLightside2.position.set(-5, 8, 0);

  scene.add(DirectionalLightside2);

  // Model
  const fileName = mainController.defaultModelLink.split(".");
  const fileExtension = fileName[fileName.length - 1];
  loadFile(mainController.defaultModelLink, fileExtension);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: Canvas,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(Canvas.offsetWidth, Canvas.offsetHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // OrbitControl
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = isAutRotation;
  controls.enablePan = false;
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
  renderer.setAnimationLoop(animate);
}

// Window resize
function onWindowResize() {
  const can = renderer.domElement;
  const width = can.clientWidth;
  const height = can.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.setSize(width, height, false);
}

// Animate
function animate() {
  // Rotation
  const isAutoRotatinActive = document.getElementById(
    "autoRotationControl"
  ).checked;
  if (isAutoRotatinActive) {
    controls.autoRotate = true;
    const scale = document.getElementById("autoRotationSpeed").value / 1000;
    if (scale < 0) {
      if (object) {
        object.rotation.y += scale;
        controls.autoRotateSpeed = scale*30;
        controls.update();
      }
    } else if (scale > 0) {
      if (object) {
        object.rotation.y += scale;
        controls.autoRotateSpeed = scale*30;
        controls.update();
      }
    }
  } else {
    controls.autoRotate = false;
  }
  const upperRotationAngle =
    Math.PI / 2 - -document.getElementById("rotation_top_limit").value;
  const lowerRotationAngle =
    Math.PI / 2 - document.getElementById("rotation_bottom_limit").value;
  controls.maxPolarAngle = upperRotationAngle;
  controls.minPolarAngle = lowerRotationAngle;

  // Zoom
  const isZoomChecked = document.getElementById("ZoomControl");
  if (isZoomChecked.checked == true) {
    const inLimit = document.getElementById("zoom_in_limit").value;
    const outLimit = document.getElementById("zoom_out_limit").value;

    if (inLimit == 0 && outLimit == 0) {
      controls.maxDistance = 80;
      controls.minDistance = 40;
      
    } else {
      controls.minDistance = 35 - inLimit;
      controls.maxDistance = 100 + Number(outLimit);
    }

  } else {
    controls.maxDistance = controls.minDistance = 70;
  }


  // Render
  camera.lookAt(0, 0, 0);
  controls.update();
  if (mixer) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}


function setTextureBackground(texture) {
  const loader = new THREE.CubeTextureLoader();
  if (texture == "id_1") {
    textureCube = loader.load([
      mainController.textureBackground.bg_1.posx,
      mainController.textureBackground.bg_1.negx,
      mainController.textureBackground.bg_1.posy,
      mainController.textureBackground.bg_1.negy,
      mainController.textureBackground.bg_1.posz,
      mainController.textureBackground.bg_1.negz,
    ]);
  } else if (texture == "id_2") {
    textureCube = loader.load([
      mainController.textureBackground.bg_2.posx,
      mainController.textureBackground.bg_2.negx,
      mainController.textureBackground.bg_2.posy,
      mainController.textureBackground.bg_2.negy,
      mainController.textureBackground.bg_2.posz,
      mainController.textureBackground.bg_2.negz,
    ]);
  } else if (texture == "id_3") {
    textureCube = loader.load([
      mainController.textureBackground.bg_3.posx,
      mainController.textureBackground.bg_3.negx,
      mainController.textureBackground.bg_3.posy,
      mainController.textureBackground.bg_3.negy,
      mainController.textureBackground.bg_3.posz,
      mainController.textureBackground.bg_3.negz,
    ]);
  }

  textureCube.encoding = THREE.sRGBEncoding;
  scene.background = textureCube;
}

// Background color
function setColorBackground(colorValue) {
  scene.background = new THREE.Color(colorValue);
}

// Model Loading
function loadFile(file, fileExtension) {
  scene.remove(object);
  if (fileExtension === "gltf" || fileExtension === "glb") {
    const loader = new GLTFLoader();
    loader.load(
      file,
      function (gltf) {
        object = gltf.scene;
        let bbox = new THREE.Box3().setFromObject(object);
        let size = bbox.getSize(new THREE.Vector3());
        let maxAxis = Math.max(size.x, size.y, size.z);
        if (!isNaN(maxAxis)) {
          object.scale.multiplyScalar(30 / maxAxis);
        } else {
          obj.scale.set(0.03, 0.03, 0.03);
          // var maxAxis = Math.max(size.x, size.y, size.z);
          // object.scale.multiplyScalar(60 / maxAxis);
          // console.log(size);
          // bbox.setFromObject(object);
          // bbox.getCenter(cent);
          // bbox.getSize(size);
          // object.position.copy(cent).multiplyScalar(-1);
          // object.position.y -= size.y * 0.5;
        }
        const offSet = new THREE.Vector3();
        bbox.getCenter(offSet).negate();
        object.children.forEach((elem) => {
          if (elem.children.length === object.children.length)
            elem.position.set(offSet.x, offSet.y, offSet.z);
        });
        object.traverse((c) => {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            if (object.material.map) {
              object.material.map.anisotrophy = 20;
            }
          }
        });
        if (gltf.animations.length != 0) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.play();
        }
        object.position.set(0, 0, 0);
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  } else if (fileExtension === "fbx") {
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      file,
      (fbx) => {
        object = fbx;
        var bbox = new THREE.Box3().setFromObject(object);
        //var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());
        let maxAxis = Math.max(size.x, size.y, size.z);
        if (!isNaN(maxAxis)) {
          object.scale.multiplyScalar(30 / maxAxis);
        } else {
          object.scale.setScalar(0.03);

        }
        const offSet = new THREE.Vector3();
        bbox.getCenter(offSet).negate();
        object.children.forEach((elem) => {
          if (elem.children.length == object.children.length) {
            elem.position.set(offSet.x, offSet.y, offSet.z);
          }
        })
        // if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z)) {
        //   object.scale.setScalar(0.05);
        // // } else {
        //   var maxAxis = Math.max(size.x, size.y, size.z);
        //   object.scale.multiplyScalar(60 / maxAxis);
        //   console.log(size);
        //   bbox.setFromObject(object);
        //   bbox.getCenter(cent);
        //   bbox.getSize(size);
        //   object.position.copy(cent).multiplyScalar(-1);
        //   object.position.y -= size.y * 0.5;
        // }
        object.traverse((c) => {
          c.castShadow = true;
        });
        if (object.animations[0] != null) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        }
        //object.position.set(0, 0, 0);
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  } else if (fileExtension === "obj") {
    const objLoader = new OBJLoader();
    objLoader.load(
      file,
      (obj) => {
        object = obj;
        var bbox = new THREE.Box3().setFromObject(obj);
        var size = bbox.getSize(new THREE.Vector3());
        var maxAxis = Math.max(size.x, size.y, size.z);

        if (!isNaN(maxAxis)) {
          obj.scale.multiplyScalar(30 / maxAxis);
        } else {
          obj.scale.set(0.05, 0.05, 0.05);
        }

        const offset = new THREE.Vector3();
        bbox.getCenter(offset).negate();
        obj.children.forEach((element) => {
          if (element.children.length === obj.children.length)
            element.position.set(offset.x, offset.y, offset.z);
        });
        object.traverse((c) => {
          c.castShadow = true;
        });
        if (object.animations[0] != null) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        }
        //object.position.set(0, 0, 0);
        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

// Renderer size
function setSize(rendererWidth, rendererHeight) {
  renderer.setSize(rendererWidth, rendererHeight);
}

/*******************************Action Script*******************************************/

// Model upload from url
document.getElementById("urlFileUpload").addEventListener("click", function () {
  const url = document.getElementById("urlformFile").value;
  const fileName = url.split(".");
  const fileExtension = fileName[fileName.length - 1];
  if (fileExtension === "gltf" || fileExtension === "glb") {
    loadFile(url, fileExtension);
  } else if (fileExtension === "fbx") {
    loadFile(url, fileExtension);
  } else if (fileExtension === "obj") {
    loadFile(url, fileExtension);
  }
});

// Accordion
let accordionClassDiv = document.getElementsByClassName("accordion");
let panelClassDiv = document.getElementsByClassName("panel");
for (let i = 0; i < accordionClassDiv.length; i++) {
  accordionClassDiv[i].onclick = function () {
    this.childNodes[1].className = "fa fa-angle-down";
    var setClasses = !this.classList.contains("active");
    setClass(accordionClassDiv, "active", "remove");
    setClass(panelClassDiv, "show", "remove");

    if (setClasses) {
      this.childNodes[1].className = "fa fa-angle-down";
      this.classList.toggle("active");
      this.nextElementSibling.classList.toggle("show");
    }
  };
}

function setClass(els, className, fnName) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    if (els[i].childNodes[1].className === "fa fa-angle-down") {
      els[i].childNodes[1].className = "fa fa-angle-right";
    }
  }
}

// Screen maximize and minimize
document.getElementById("button").addEventListener("click", function () {
  this.classList.toggle("active");
  let canvasWidth, canvasHeight;
  let canvas = document.getElementById("homeComponent");
  if (canvas.className === "homeComponent") {
    canvas.className = "homeComponentFullScreen";
    document.getElementById("canvasComponent").className =
      " canvasComponent col-md-12";
    document.getElementById("conficComponent").className =
      "col-md-5 display-none";
    document.getElementById("renderCanvas").className = "canvas-style-change";
    canvasWidth = document.getElementById("homeComponent").clientWidth;
    canvasHeight = document.getElementsByClassName(
      "homeComponentFullScreen"
    ).clientHeight;
    setSize(canvasWidth, window.innerHeight);
  } else {
    canvas.className = "homeComponent";
    document.getElementById("canvasComponent").className =
      "canvasComponent col-md-7";
    document.getElementById("conficComponent").className = "col-md-5";
    document.getElementById("renderCanvas").className = "canvas-style";

    canvasWidth = document.getElementById("renderCanvas").offsetWidth;
    canvasHeight = document.getElementById("renderCanvas").offsetHeight;
    setSize(canvasWidth, canvasHeight);
  }
});

// Screenshot
document.getElementById("snapButton").addEventListener("click", () => {
  var canv = document.getElementById("modelCanvas");
  console.log("clicked");
  var url = canv.toDataURL("image/jpeg");
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", "screenshot.jpeg");
  link.click();
});

// Background color
document.getElementById("plainText").addEventListener("click", function () {
  document.getElementById("plain_background_colors").className =
    "plain_background_colors";
  document.getElementById("texture_background_colors").className =
    "display-none";
});

//  Texture background
document.getElementById("textureUpload").addEventListener("click", function () {
  document.getElementById("texture_background_colors").className =
    "texture_background_colors";
  document.getElementById("plain_background_colors").className = "display-none";
});

// Texture background button 1
document.getElementById("texture_1").addEventListener("click", function () {
  setTextureBackground("id_1");
});

// Texture background button 2
document.getElementById("texture_2").addEventListener("click", function () {
  setTextureBackground("id_2");
});

// Texture background button 3
document.getElementById("texture_3").addEventListener("click", function () {
  setTextureBackground("id_3");
});

// Color background button 1

document.getElementById("pb_1").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_1 ? mainController.backgroundColor_1 : backgroundColor.color_1);
});

// Color background button 2
document.getElementById("pb_2").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_2 ? mainController.backgroundColor_2 : backgroundColor.color_2);
});

// Color background button 3
document.getElementById("pb_3").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_3 ? mainController.backgroundColor_3 : backgroundColor.color_3);
});

// Color background button 4
document.getElementById("pb_4").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_4 ? mainController.backgroundColor_4 : backgroundColor.color_4);
});

// Color background button 5
document.getElementById("pb_5").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_5 ? mainController.backgroundColor_5 : backgroundColor.color_5);
});

// Color background button 6
document.getElementById("pb_6").addEventListener("click", function () {
  setColorBackground(mainController.backgroundColor_6 ? mainController.backgroundColor_6 : backgroundColor.color_6);
});

// Model upload
document
  .getElementById("fileUploadButton")
  .addEventListener("click", function () {
    document.getElementById("fileUpload").className = "mb-3";
    document.getElementById("urlUpload").className = "display-none";
  });

// Model url upload
document
  .getElementById("urlUploadButton")
  .addEventListener("click", function () {
    document.getElementById("urlUpload").className = "mb-3";
    document.getElementById("fileUpload").className = "display-none";
  });

// File upload from computer
document.getElementById("uploadFile").addEventListener("click", function () {
  var x = document.getElementById("formFile");
  if ("files" in x) {
    if (x.files.length != 0) {
      var fileName = x.files[0].name;
      var splitFileName = fileName.split(".");
      var fileExtension = splitFileName[splitFileName.length - 1];
      //console.log(fileExtension);
      var objectURL = URL.createObjectURL(x.files[0]);
      if (fileExtension === "gltf" || fileExtension === "glb") {
        loadFile(objectURL, fileExtension);
      } else if (fileExtension === "fbx") {
        loadFile(objectURL, fileExtension);
      } else if (fileExtension === "obj") {
        loadFile(objectURL, fileExtension);
      }
    }
  }
});
