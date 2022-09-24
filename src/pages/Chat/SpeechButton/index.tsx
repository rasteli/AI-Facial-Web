import mic from "@/assets/mic.svg"
import noMic from "@/assets/no-mic.svg"
import { useViewport } from "@/hooks/useViewport"

interface SpeechButtonProps {
  transcript: string
  cannotListen: boolean
  handleListening: () => void
  isMicrophoneAvailable: boolean
  browserSupportsSpeechRecognition: boolean
}

export function SpeechButton({
  transcript,
  cannotListen,
  handleListening,
  isMicrophoneAvailable,
  browserSupportsSpeechRecognition
}: SpeechButtonProps) {
  const { aboveThreshold } = useViewport(540)

  return (
    <>
      <button onClick={handleListening}>
        <img src={cannotListen ? noMic : mic} />
      </button>
      {aboveThreshold && (
        <p>
          {cannotListen ||
          !isMicrophoneAvailable ||
          !browserSupportsSpeechRecognition
            ? `Sem captura de microfone`
            : "Seu microfone está sendo capturado"}

          {transcript.length > 0 && "..."}
        </p>
      )}
    </>
  )
}
