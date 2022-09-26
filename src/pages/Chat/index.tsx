import { useEffect } from "react"
import styles from "./styles.module.scss"

import mic from "@/assets/mic.svg"
import userImg from "@/assets/user.svg"
import noMic from "@/assets/no-mic.svg"
import izzoLogo from "@/assets/izzo-logo.svg"

import angryAI from "@/assets/angryAI.png"
import happyAI from "@/assets/happyAI.png"
import tongueAI from "@/assets/tongueAI.png"
import talkingAI from "@/assets/talkingAI.png"
import thinkingAI from "@/assets/thinkingAI.png"

import { SpeechButton } from "./SpeechButton"
import { MessageBubble } from "./MessageBubble"

import { useSpeech } from "@/hooks/useSpeech"
import { useAuth } from "@/contexts/AuthContext"
import { useMessage } from "@/contexts/MessageContext"

export function Chat() {
  const { user } = useAuth()
  const { messages } = useMessage()

  const {
    feeling,
    transcript,
    IzzoCanTalk,
    cannotListen,
    stopListening,
    setIzzoCanTalk,
    startListening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  } = useSpeech()

  const imgAndTextByFeeling = {
    ANGRY: {
      img: angryAI,
      text: "com raiva"
    },
    HAPPY: {
      img: happyAI,
      text: "feliz"
    },
    TONGUE: {
      img: tongueAI,
      text: "sapeca"
    },
    TALKING: {
      img: talkingAI,
      text: "falante"
    },
    THINKING: {
      img: thinkingAI,
      text: "pensativa"
    }
  }

  useEffect(() => {
    startListening(true)
  }, [])

  const AIFirstMessage = !browserSupportsSpeechRecognition
    ? "Infelizmente, parece que seu navegador não suporta reconhecimento de voz."
    : !isMicrophoneAvailable
    ? "Hmm, parece que você precisa permitir o uso do microfone a esse site. Você pode fazer isso nas configurações do seu navegador."
    : "Diga IZZO para começar a conversar comigo!"

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav>
          <a href="/">
            <img className={styles.logo} src={izzoLogo} alt="IZZO Logo" />
          </a>
          <a href="/profile" className={styles.profileNav}>
            {user?.nickname}
            <img src={userImg} />
          </a>
        </nav>
      </header>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <img
            className={styles.AIfelling}
            src={imgAndTextByFeeling[feeling].img}
          />
          <div className={styles.feelAndMute}>
            <p>
              Sentindo-se <span>{imgAndTextByFeeling[feeling].text}</span>
            </p>
            <button
              className={styles.muteAI}
              title="Ligar/Desligar voz da IZZO"
            >
              <img
                src={IzzoCanTalk ? mic : noMic}
                alt={IzzoCanTalk ? "Microfone ligado" : "Microfone desligado"}
                onClick={() => setIzzoCanTalk(!IzzoCanTalk)}
              />
            </button>
          </div>
        </aside>

        <main>
          <div className={styles.messages}>
            <MessageBubble
              sender="ai"
              text={`Olá, ${user?.nickname}, sou a Izzo. Sua IA interativa! ${AIFirstMessage}`}
              sentAt={Date.now()}
            />
            {messages.map((message, index) => (
              <MessageBubble
                key={index}
                sender={message.sender}
                text={message.text}
                sentAt={message.sentAt}
              />
            ))}
          </div>

          <footer>
            <SpeechButton
              transcript={transcript}
              cannotListen={cannotListen}
              stopListening={stopListening}
              startListening={startListening}
              isMicrophoneAvailable={isMicrophoneAvailable}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
            />
          </footer>
        </main>
      </div>
    </div>
  )
}
