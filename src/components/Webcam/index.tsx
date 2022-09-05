import { useEffect, useRef } from "react"

const NUMBER_OF_PHOTOS = 20

export function Webcam() {
  let qtyImg = 0
  const form = new FormData()

  const stripRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    ;(async function () {
      getVideo()
    })()
  }, [videoRef])

  async function getVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300 }
      })
      const video = videoRef.current as HTMLVideoElement

      video.srcObject = stream
      video.play()
    } catch (error) {
      console.error(error)
    }
  }

  function paintToCanvas() {
    const video = videoRef.current as HTMLVideoElement
    const photo = canvasRef.current as HTMLCanvasElement

    const ctx = photo.getContext("2d") as CanvasRenderingContext2D

    const width = 320
    const height = 240
    photo.width = width
    photo.height = height

    const interval = setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height)

      if (qtyImg === NUMBER_OF_PHOTOS) {
        console.log("Request")
        stopWebcam()
        clearInterval(interval)
      } else {
        takePhoto()
      }
    }, 200)

    return interval
  }

  function takePhoto() {
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
    const tracks = stream.getTracks()

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i]
      track.stop()
    }

    video.srcObject = null
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
