import {
  SsdMobilenetv1Options,
  tf as _tf,
  detectAllFaces,
  nets,
  version,
} from "@vladmandic/face-api/dist/face-api.node.js";

import { join } from "path";
import { node } from "@tensorflow/tfjs-node";
import path from "path";

let optionsSSDMobileNet;

const __dirname = path.resolve();

async function image(file) {
  const decoded = node.decodeImage(file);
  const casted = decoded.toFloat();
  const result = casted.expandDims(0);
  decoded.dispose();
  casted.dispose();
  return result;
}

async function detect(tensor) {
  const result = await detectAllFaces(tensor, optionsSSDMobileNet);
  return result;
}

console.log("FaceAPI single-process test");

await _tf.setBackend("tensorflow");
await _tf.enableProdMode();
_tf.ENV.set("DEBUG", false);
await _tf.ready();

console.log(
  `Version: TensorFlow/JS ${_tf?.version_core} FaceAPI ${
    version.faceapi
  } Backend: ${_tf?.getBackend()}`
);

console.log("Loading FaceAPI models");
const modelPath = join(__dirname, "./models");
await nets.ssdMobilenetv1.loadFromDisk(modelPath);
optionsSSDMobileNet = new SsdMobilenetv1Options({
  minConfidence: 0.5,
});

export default async function main(file) {
  const tensor = await image(file);
  const result = await detect(tensor);

  tensor.dispose();

  return result;
}
