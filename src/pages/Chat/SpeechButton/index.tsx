import mic from "@/assets/mic.svg"
import noMic from "@/assets/no-mic.svg"
import { useViewport } from "@/hooks/useViewport"

interface SpeechButtonProps {
  transcript: string
  cannotListen: boolean
  stopListening: () => void
  isMicrophoneAvailable: boolean
  browserSupportsSpeechRecognition: boolean
  startListening: (isFirstRender: boolean) => void
}

export function SpeechButton({
  transcript,
  cannotListen,
  stopListening,
  startListening,
  isMicrophoneAvailable,
  browserSupportsSpeechRecognition
}: SpeechButtonProps) {
  const { aboveThreshold } = useViewport(540)

  return (
    <>
      <button
        onClick={() => {
          cannotListen ? startListening(false) : stopListening()
        }}
        title="Ligar/Desligar captura de voz"
      >
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
