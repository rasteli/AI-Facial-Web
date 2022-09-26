import { useEffect, useState } from "react"
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition"

import { chatApi } from "@/services/chatApi"
import { useMessage } from "@/contexts/MessageContext"

type Feeling = "ANGRY" | "HAPPY" | "TONGUE" | "TALKING" | "THINKING"

interface ChatResponse {
  talk: string
  message: string
  feeling: Feeling
}

export function useSpeech() {
  const { addMessage } = useMessage()

  const [IzzoCanTalk, setIzzoCanTalk] = useState(false)
  const [notListening, setNotListening] = useState(true)
  const [cannotListen, setCannotListen] = useState(true)
  const [feeling, setFeeling] = useState<Feeling>("TALKING")

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
        command: ["Dar um F5", "F5", "Dá um F5", "Atualizar"],
        matchInterim: true,
        callback: () => {
          window.location.reload()
        }
      }
    ]
  })

  function startListening(isFirstRender: boolean) {
    if (!isMicrophoneAvailable || !browserSupportsSpeechRecognition) return

    SpeechRecognition.startListening({
      continuous: true,
      language: "pt-BR"
    })

    if (!isFirstRender) setCannotListen(false)
  }

  function stopListening() {
    setCannotListen(true)

    SpeechRecognition.stopListening()
    resetTranscript()
  }

  function speakAI(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "pt-BR"
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)

    // Resumes infinitly the speech synthesis, because it stops with longer texts
    const interval = setInterval(() => {
      speechSynthesis.pause()
      speechSynthesis.resume()
    }, 5000)

    utterance.addEventListener("start", () => {
      stopListening()
    })

    utterance.addEventListener("end", () => {
      startListening(false)
      clearInterval(interval)
    })
  }

  function sendUserMessage() {
    const userMessage = {
      sender: "user",
      text: transcript,
      sentAt: Date.now()
    }

    addMessage(userMessage)
  }

  async function sendAIMessage() {
    const { data } = await chatApi.post<ChatResponse>("/talk", {
      message: transcript
    })

    let text = data.message

    if (text.includes("%OPEN")) {
      // data.message === "%OPEN:https://www.google.com"
      const url = text.replace("%OPEN:", "") // -> "https://www.google.com"

      text = `Abrindo ${url}`
      window.open(url, "_blank")
    }

    const AIMessage = {
      sender: "ai",
      text,
      sentAt: Date.now()
    }

    addMessage(AIMessage)
    setFeeling(data.feeling)
    if (IzzoCanTalk) speakAI(data.talk)
  }

  useEffect(() => {
    // Add message after 1 second of silence
    const timeout = setTimeout(() => {
      setNotListening(transcript.length === 0)
    }, 1000)

    if (transcript && !notListening && !cannotListen) {
      sendUserMessage()
      sendAIMessage()
      resetTranscript()
    }

    return () => clearTimeout(timeout)
  }, [transcript, notListening])

  return {
    feeling,
    transcript,
    IzzoCanTalk,
    cannotListen,
    stopListening,
    setIzzoCanTalk,
    startListening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  }
}
