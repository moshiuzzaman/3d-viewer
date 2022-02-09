document.getElementById("bs__root").innerHTML = `
<div class="container">
  <div class="heading">
    <h1>3D Viewer</h1>
  </div>
  <div class="wrapper" id="wrapperId">
    <div class="canvasWrapper">
      <div class="actionButton">
        <button id="fullscreen"><img height="15px" src="https://img.icons8.com/ios-glyphs/30/000000/full-screen--v1.png" /></button>
        <button id="snapshot"><img height="15px" src="https://img.icons8.com/ios-glyphs/30/000000/screenshot.png" /></button>
      </div>
      <canvas id="myCanvasElement"></canvas>
    </div>

    <div id="functions" class="">
      <div class="config">
        <h6 class="configText">Configuration</h6>
      </div>

      <!-- rotation section -->
      <button id="col1" class="collapsible">
        <span>Rotation</span><img id="icon1" src="https://img.icons8.com/ios-filled/50/000000/expand-arrow--v1.png" />
      </button>
      <div class="content">
        <div class="sectionWrapper">
          <div class="autoRotation flexSpaceBetween">
            <p>Autorotation</p>
            <label class="switch">
              <input type="checkbox" id="autoRotationBtn" checked />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="autoRotation">
            <p>Autorotation speed</p>
            <input type="range" min="-50" max="50" step="5" value="10" class="sliderRange" id="myRange" />
          </div>

          <div class="autoRotation">
            <p>Rotation Top Limit</p>
            <input type="range" min="1.6" max="3.2" step="0.2" value="3.1" class="sliderRange" id="myRangeTopLimite" />
          </div>
          <div class="autoRotation">
            <p>Rotation Bottom Limit</p>
            <input type="range" min="0" max="1.6" step="0.2" value="0" class="sliderRange reversedRange" id="myRangeBottomLimite" />
          </div>
        </div>
      </div>

      <!-- zoom section  -->

      <button id="col2" class="collapsible">
        <span>Zoom</span>
        <img id="icon2" src="https://img.icons8.com/ios-filled/50/000000/expand-arrow--v1.png" />
      </button>
      <div class="content">
        <div class="sectionWrapper">
          <div class="autoRotation flexSpaceBetween">
            <p>Zoom Enable</p>
            <label class="switch">
              <input type="checkbox" id="ZoomBtn" checked />
              <span class="slider round"></span>
            </label>
          </div>

          <div class="autoRotation">
            <p>Zoom In limit</p>
            <input type="range" min="-10" max="10" step="2" value="10" class="sliderRange reversedRange" id="ZoomLimiteIn" />
          </div>
          <div class="autoRotation">
            <p>Zoom Out limit</p>
            <input type="range" min="50" max="90" step="2" value="50" class="sliderRange" id="ZoomLimiteOut" />
          </div>
        </div>
      </div>

      <!-- background section -->
      <button id="col3" class="collapsible"><span>background</span> <img id="icon3" src="https://img.icons8.com/ios-filled/50/000000/expand-arrow--v1.png" /></button>
      <div class="content">
        <div class="btnGroup">
          <button class="bgBtn bgLeftBtn">Plain Background</button>
          <button class="bgBtn bgRightBtn">Texture Background</button>
        </div>
        <div class="sectionWrapper">
          <div id="plainBackground">
            <p>Choose Plain Background Color</p>
            <br />
            <div class="bgInputWrapper">
              <div class="radioInputDiv">
                <input class="hide" type="radio" id="skyblue" name="bg" value="skyblue" />
                <label class="radioLabel Skyblue" for="skyblue"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="red" name="bg" value="red" />
                <label class="radioLabel red" for="red"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="gray" name="bg" value="gray" />
                <label class="radioLabel gray" for="gray"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="blue" name="bg" value="blue" />
                <label class="radioLabel blue" for="blue"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="green" name="bg" value="green" />
                <label class="radioLabel green" for="green"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="yellow" name="bg" value="yellow" />
                <label class="radioLabel yellow" for="yellow"></label>
              </div>
            </div>
          </div>
          <div id="TextureBackground" class="hide">
            <p>Choose Texture Background</p>
            <br />
            <div class="bgInputWrapper">
              <div class="radioInputDiv">
                <input class="hide" type="radio" id="texture1" name="bg" value="texture1" />
                <label class="radioLabel texture1" for="texture1"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="texture2" name="bg" value="texture2" />
                <label class="radioLabel texture2" for="texture2"></label>
              </div>

              <div class="radioInputDiv">
                <input class="hide" type="radio" id="texture3" name="bg" value="texture3" />
                <label class="radioLabel texture3" for="texture3"></label>
              </div>
            </div>
          </div>
        </div>
        <br /><br />
      </div>

      <!-- upload section -->
      <button id="col4" class="collapsible"><span>Upload a model</span> <img id="icon4" src="https://img.icons8.com/ios-filled/50/000000/expand-arrow--v1.png" /></button>
      <div class="content">
        <div class="btnGroup">
          <button class="bgBtn upLeftBtn">File Upload</button>
          <button class="bgBtn upRightBtn">URL Upload</button>
        </div>

        <div class="sectionWrapper">
          <div id="uploadFile">
            <p>Upload a gltf/obj/fbx file</p>
            <br />
            <input type="file" id="fileInput" />
            <button id="fileUploadBtn" class="btn">File Upload</button>
          </div>
          <div id="urlFile" class="hide">
            <p>gltf/fbx/obj model url</p>
            <br />
            <input type="text" id="urlInput" placeholder="Enter URL Here" autocomplete="off" />
            <button id="urlUploadBtn" class="btn">URL Upload</button>
          </div>

          <br /><br />
        </div>
      </div>
    </div>
  </div>
</div>`;

// Add style ***********

let styles = `@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai+Looped:wght@100;300&display=swap');

* {
    margin: 0;
    padding: 0;
}
*:focus {
    outline: none;
}

body {
    height: 100vh;
}

.container {
    width: 90%;
    margin: auto;
    height: auto;
}

.wrapper {
    display: flex;
    height: 80%;
}

.wrapperClone {
    display: grid;
    grid-template-columns: auto;
    height: 80%;
}

.canvasWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    
}

canvas {
    height: 70vh;
    width: 100%;
}

.actionButton {
    position: absolute;
    right: 10px;
    top: 10px;
}

.actionButton button {
    padding: 13px 15px;
    margin: 2px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
}

.heading h1 {
    text-align: center;
    font-size: 50px;
    margin-bottom: 1rem;
    font-family: IBM Plex Sans Thai Looped;
}

#functions {
    padding: 0 20px;
    width: 67%;
}
.sectionWrapper {
    width: 95%;
    margin: auto;
}

.hide {
    display: none;
}

.reversedRange {
    direction: rtl;
}

.config {
    padding: 15px 0;
    background: #f1f1f1;
}

.configText {
    text-align: center;
    font-family: IBM Plex Sans Thai Looped;
    /* font-weight: bold; */
    font-size: 1rem;
}

.font_style{
    font-family: IBM Plex Sans Thai Looped;
    font-weight: bold;
}

/* collapsable */

.collapsible {
    background-color: white;
    color: #009fdb;
    font-weight: bold;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 2px;
    cursor: pointer;
    padding: 17px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
    outline: none;
    font-size: 15px;
}

.rotation {
    transform: rotate(-180deg);
}

i{
    transition: 00.5s ease;
    color: black;
}

button img {
    transition: 00.5s ease;
    width: 16px;
}
.content {
    padding: 0 18px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #f1f1f1;
}

/* rotation section  */

.autoRotation {
    margin: 10px ;
}

.flexSpaceBetween {
    display: flex;
    justify-content: space-between;
}

/* checkbox design/ */

.switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:checked + .slider {
    background-color: #2196f3;
}

input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

/* range input design  */

.sliderRange {
    margin: 10px;
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 1;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
}

.sliderRange::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: blue;
    cursor: pointer;
}

.sliderRange::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04aa6d;
    cursor: pointer;
}

/* background section */

.bgInputWrapper {
    display: flex;
}

.radioInputDiv {
    margin: 5px;
}

.radioLabel {
    padding: 15px 23px;
    border-radius: 5px;
    cursor: pointer;
}

.Skyblue {
    background: ${bgColor[0]};
}

.red {
    background: #d14250;
}

.gray {
    background: #8b9298;
}

.blue {
    background: #3888fd;
}

.green {
    background: #198754;
}

.yellow {
    background: #ffc107;
}

/* texture background start */
.texture1 {
    background: url("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_rt.jpg");
    background-repeat: no-repeat;
    background-size: 50px 50px;
}
.texture2 {
    background: url("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_rt.jpg");
    background-repeat: no-repeat;
    background-size: 50px 50px;
}
.texture3 {
    background: url("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_lf.jpg");
    background-repeat: no-repeat;
    background-size: 50px 50px;
}

/* texture background end */
.btnGroup {
    display: flex;
    margin: 15px;
    /*  */
}
.bgBtn {
    background: none;
    flex: 1 1 auto;
    padding: 13px 0;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
.bgLeftBtn,
.upLeftBtn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    background: #37c1dc;
    transition: background-color 0.5s ease;
}
.bgRightBtn,
.upRightBtn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    background: #246ad0;
    color: white;
    transition: background-color 0.5s ease;
}
.bgLeftBtn:hover,
.upLeftBtn:hover {
    background: #34b1c9;
}
.bgRightBtn:hover,
.upRightBtn:hover {
    background: #215eb8;
}

#plainBackground {
    width: 100%;
}
#TextureBackground {
    width: 100%;
}

input {
    width: 100%;
}

/* file upload */

#fileInput,
#urlInput {
    padding: 8px;
    border: 1px solid #ccc;
}

.btn {
    width: 100%;
    padding: 10px;
    border: none;
    margin: 10px 0;
    background: #157347;
    color: white;
    border-radius: 5px;
    transition: background-color 0.5s ease;
}
.btn:hover {
    background: rgb(9, 77, 45);
}

/* container */

@media only screen and (max-width: 1000px) {
    .container {
        width: 97%;
    }
}
@media only screen and (max-width: 750px) {
    .wrapper {
        display: block;
    }
    #functions {
        padding: 20px 0;
        width: auto;
    }
    .container {
        width: 80%;
    }
}
`;
let styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
