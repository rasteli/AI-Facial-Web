import { useRef, useState } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

import { Spinner } from "../Spinner"
import { useFace } from "../../hooks/useFace"
import { GrantPermission } from "../GrantPermission"

export type LocationState = {
  login: string
  password: string
  requestType: "login" | "signup"
}

export function Webcam() {
  const location = useLocation()
  const state = location.state as LocationState

  const stripRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [canVideo, setCanVideo] = useState(
    localStorage.getItem("canVideo") === "true"
  )

  const { paintToCanvas } = useFace({
    state,
    stripRef,
    videoRef,
    canvasRef,
    canVideo
  })

  return (
    <div className={styles.container}>
      {canVideo ? (
        <>
          <video
            className={styles.faceCam}
            onCanPlay={paintToCanvas}
            ref={videoRef}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className={styles.info}>
            <p>Escaneando sua linda face</p>
            <Spinner />
          </div>

          <div>
            <div className={styles.shots} ref={stripRef} />
          </div>
        </>
      ) : (
        <GrantPermission setCanVideo={setCanVideo} />
      )}
    </div>
  )
}
