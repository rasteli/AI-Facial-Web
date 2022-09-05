import * as faceapi from "face-api.js"

type Landmark68 = faceapi.FaceLandmarks68
type Detection = { detection: faceapi.FaceDetection }
type FaceDescription = faceapi.WithFaceLandmarks<Detection, Landmark68>

export async function detectFace(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  width: number,
  height: number
) {
  let probability = 0
  let faceDescriptions: FaceDescription[] = []

  if (video.srcObject) {
    const tinyFaceOptions = new faceapi.TinyFaceDetectorOptions()

    canvas.innerHTML = `${faceapi.createCanvasFromMedia(video)}`
    faceapi.matchDimensions(canvas, { width, height })

    faceDescriptions = await faceapi
      .detectAllFaces(video, tinyFaceOptions)
      .withFaceLandmarks()
      .withFaceDescriptors()

    faceDescriptions = faceapi.resizeResults(faceDescriptions, {
      width,
      height
    })

    probability = parseInt(
      (faceDescriptions[0]?.detection.score * 100).toFixed(2)
    )
  }

  return { faceDescriptions, probability }
}
