import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import * as faceapi from "face-api.js"

import { GrantPermission } from "../GrantPermission"
import { useAuth } from "../../contexts/AuthContext"

import { detectFace } from "../../utils/detectFace"
import { signUp, login } from "../../utils/webcamRequests"

type LocationState = {
  login: string
  password: string
  requestType: "login" | "signUp"
}

const MIN_PROB_FACE = 50
const NUMBER_OF_PHOTOS = 4

export function Webcam() {
  const { logIn } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const stripRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [intervalDone, setIntervalDone] = useState(false)
  const [canVideo, setCanVideo] = useState(
    localStorage.getItem("canVideo") === "true"
  )

  let qtyImg = 0
  var interval: number

  const form = new FormData()
  const state = location.state as LocationState

  useEffect(() => {
    // If there's no state — meaning this location was accessed directly
    // via URL —, redirect to the previous location.
    if (!state) return navigate(-1)
  }, [])

  useEffect(() => {
    ;(function () {
      if (!canVideo) return

      const MODEL_URL = "/models"
      const faceNets = faceapi.nets

      Promise.all([
        faceNets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceNets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceNets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceNets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(() => console.log("Models loading complete"))
    })()
  }, [canVideo])

  useEffect(() => {
    ;(async function () {
      if (!canVideo) return

      await getVideo()
    })()
  }, [videoRef, canVideo])

  useEffect(() => {
    clearInterval(interval)
  }, [intervalDone])

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
    const width = 320
    const height = 240

    const video = videoRef.current as HTMLVideoElement
    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    canvas.width = width
    canvas.height = height

    interval = setInterval(async () => {
      const { faceDescriptions, probability } = await detectFace(
        canvas,
        video,
        width,
        height
      )

      if (faceDescriptions.length === 1 && probability >= MIN_PROB_FACE) {
        ctx.drawImage(video, 0, 0, width, height)

        if (qtyImg === NUMBER_OF_PHOTOS) {
          qtyImg++

          // Logging form entries in the console
          console.log(Array.from(form.entries()))

          const requests = {
            signUp: () => signUp(form),
            login: () =>
              login(form, state.login, state.password, logIn, navigate)
          }

          const request = requests[state.requestType]

          await request()

          stopWebcam()
          setIntervalDone(true)

          navigate("/", { replace: true })
        } else if (qtyImg < NUMBER_OF_PHOTOS) {
          takePhoto(form)
        }
      }
    }, 250)

    return interval
  }

  function takePhoto(form: FormData) {
    console.log(`Trying with ${qtyImg}`)

    let canvas = canvasRef.current as HTMLCanvasElement
    let strip = stripRef.current as HTMLDivElement

    const data = canvas.toDataURL("image/jpeg")
    const img = document.createElement("img")

    img.setAttribute("src", data)
    strip.insertBefore(img, strip.firstChild)

    canvas.toBlob(blob => {
      form.append(`img-${qtyImg}`, blob as Blob, `img-${qtyImg}.jpg`)
      console.log(`Took photo: img-${qtyImg}`)
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

      // video.srcObject = null
      video.pause()
    }
  }

  return (
    <div>
      {canVideo ? (
        <>
          <video onCanPlay={paintToCanvas} ref={videoRef} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div>
            <div ref={stripRef} />
          </div>
        </>
      ) : (
        <GrantPermission setCanVideo={setCanVideo} />
      )}
    </div>
  )
}
