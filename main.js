import NodeWebcam from "node-webcam";
import faceapi from "./faceapiService.js";
import fs from "fs";
import turnOffDisplay from "turn-off-display";

// import "@tensorflow/tfjs-node";
// import * as faceapi from "face-api.js";

const Webcam = NodeWebcam.create({
  //Picture related
  width: 1280,
  height: 720,
  quality: 100,

  // Number of frames to capture
  // More the frames, longer it takes to capture
  // Use higher framerate for quality. Ex: 60
  frames: 1,

  //Delay in seconds to take shot
  //if the platform supports miliseconds
  //use a float (0.1)
  //Currently only on windows
  delay: 0,

  //Save shots in memory
  saveShots: true,

  // [jpeg, png] support varies
  // Webcam.OutputTypes
  output: "jpeg",

  //Which camera to use
  //Use Webcam.list() for results
  //false for default device
  device: false,

  // [location, buffer, base64]
  // Webcam.CallbackReturnTypes
  callbackReturn: "location",

  //Logging
  verbose: false,
});

async function main() {
  let warn = 0;

  while (true) {
    let detections;
    try {
      const imageData = await new Promise((resolve, reject) => {
        Webcam.capture("test_picture", (err, data) => {
          if (err) return reject(err);
          else resolve(data);
        });
      });

      const imageFile = fs.readFileSync(imageData);

      detections = await faceapi(imageFile);
    } catch (error) {
      console.log("👀 ~ error:", error);
      continue;
    }

    console.log(
      "Face detection:",
      detections.length,
      new Date().toLocaleString(),
      warn
    );

    if (detections.length > 1) {
      if (warn >= 10) {
        warn = 0;
        turnOffDisplay();
        await sleep(60_000);
      } else {
        warn += 2 * detections.length;
      }
    } else if (detections.length === 1) {
      if (warn > 0) warn -= 1;
    } else {
      warn = 0;
      turnOffDisplay();
      await sleep(60_000);
    }

    await sleep(3_000);
  }
}

main();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
