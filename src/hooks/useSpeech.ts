import { useEffect, useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition"

import { useMessage } from "../contexts/MessageContext"

export function useSpeech() {
  const { addMessage } = useMessage()

  const [notListening, setNotListening] = useState(true)
  const [cannotListen, setCannotListen] = useState(true)

  const {
    transcript,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    commands: [
      {
        command: new RegExp(/ISO|IZZO|IZO/gi),
        callback: () => {
          setCannotListen(false)
          resetTranscript()
        }
      },
      {
        command: "parar",
        matchInterim: true,
        callback: () => {
          setCannotListen(true)
          resetTranscript()
        }
      },
      {
        command: "Dar um F5",
        matchInterim: true,
        callback: () => {
          window.location.reload()
        }
      }
    ]
  })

  function startListening() {
    if (!isMicrophoneAvailable || !browserSupportsSpeechRecognition) return

    SpeechRecognition.startListening({
      continuous: true,
      language: "pt-BR"
    })
  }

  function handleListening() {
    setCannotListen(!cannotListen)

    if (cannotListen) {
      startListening()
    } else {
      SpeechRecognition.stopListening()
      resetTranscript()
    }
  }

  useEffect(() => {
    // Add message after 1 second of silence
    const timeout = setTimeout(() => {
      setNotListening(transcript.length === 0)
    }, 1000)

    if (transcript && !notListening && !cannotListen) {
      const message = {
        sender: "user",
        text: transcript,
        sentAt: Date.now()
      }

      addMessage(message)
      resetTranscript()
    }

    return () => clearTimeout(timeout)
  }, [transcript, notListening])

  return {
    transcript,
    cannotListen,
    startListening,
    handleListening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  }
}
