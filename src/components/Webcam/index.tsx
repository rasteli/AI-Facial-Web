import { useEffect, useRef } from "react"
import * as faceapi from "face-api.js"

import { faceApi } from "../../services/faceApi"
import { detectFace } from "../../utils/detectFace"

const MIN_PROB_FACE = 50
const NUMBER_OF_PHOTOS = 20

export function Webcam() {
  let qtyImg = 0

  const stripRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    ;(function () {
      const MODEL_URL = "/models"
      const faceNets = faceapi.nets

      Promise.all([
        faceNets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceNets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceNets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceNets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(() => console.log("Models loading complete"))
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      await getVideo()
    })()
  }, [videoRef])

  async function getVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300 }
      })

      // Permission granted
      const video = videoRef.current as HTMLVideoElement

      video.srcObject = stream
      video.play()
    } catch (error) {
      // Permission denied
      console.error(error)
    }
  }

  function paintToCanvas() {
    const getForm = new FormData()

    const width = 320
    const height = 240

    const video = videoRef.current as HTMLVideoElement
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    canvas.width = width
    canvas.height = height

    const interval = setInterval(async () => {
      const { faceDescriptions, probability } = await detectFace(
        canvas,
        video,
        width,
        height
      )

      if (faceDescriptions.length === 1 && probability >= MIN_PROB_FACE) {
        const compareForm = new FormData()

        ctx.drawImage(video, 0, 0, width, height)

        if (qtyImg === 4) {
          console.log("Request")
          const getFaceResponse = await faceApi.post("/getface", getForm, {
            headers: { "Content-Type": "multipart/form-data" }
          })

          const { faces } = getFaceResponse.data

          compareForm.append("familiar_faces", "")
          compareForm.append("faces", faces)

          const compareFacesResponse = await faceApi.post(
            "/compare",
            compareForm,
            { headers: { "Content-Type": "multipart/form-data" } }
          )

          let { res, index } = compareFacesResponse.data
          const names = [
            "Joshua",
            "Rasteli",
            "Jarbas",
            "Leonardo",
            "João Bolito",
            "Fabrício",
            "Marrenta",
            "Guidelli"
          ]

          res = eval(res)
          index = Number(index)
          const prob = parseInt((res[index] * 100).toFixed(2))

          // Logging form entries in the console
          for (const key of getForm.entries()) {
            console.log(key[0] + ", " + key[1])
          }

          stopWebcam()
          alert(`Pessoa: ${names[index]}. Probabilidade de ${prob}%`)
          clearInterval(interval)
        } else {
          takePhoto(getForm)
        }
      }
    }, 250)

    return interval
  }

  function takePhoto(form: FormData) {
    let canvas = canvasRef.current as HTMLCanvasElement
    let strip = stripRef.current as HTMLDivElement

    const data = canvas.toDataURL("image/jpeg")
    const img = document.createElement("img")

    img.setAttribute("src", data)
    strip.insertBefore(img, strip.firstChild)

    canvas.toBlob(blob => {
      form.append(`img${qtyImg}`, blob as Blob, `img${qtyImg}.jpg`)
      qtyImg++
    }, "image/jpeg")
  }

  function stopWebcam() {
    const video = videoRef.current as HTMLVideoElement
    const stream = video.srcObject as MediaStream

    if (stream) {
      const tracks = stream.getTracks()

      for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i]
        track.stop()
      }

      video.srcObject = null
    }
  }

  return (
    <div>
      <div>
        <video onCanPlay={paintToCanvas} ref={videoRef} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div>
          <div ref={stripRef} />
        </div>
      </div>
    </div>
  )
}
