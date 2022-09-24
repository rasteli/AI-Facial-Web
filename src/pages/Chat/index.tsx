import { useEffect } from "react"
import styles from "./styles.module.scss"

import userImg from "../../assets/user.svg"
import izzoLogo from "../../assets/izzo-logo.svg"
import talkingAI from "../../assets/talkingAI.png"

import { SpeechBubble } from "../../components/SpeechBubble"
import { SpeechButton } from "../../components/SpeechButton"

import { useSpeech } from "../../hooks/useSpeech"
import { useAuth } from "../../contexts/AuthContext"
import { useMessage } from "../../contexts/MessageContext"

export function Chat() {
  const { user } = useAuth()
  const { messages } = useMessage()

  const {
    transcript,
    cannotListen,
    startListening,
    handleListening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition
  } = useSpeech()

  useEffect(() => {
    startListening()
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
          <a href="">
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
          <img className={styles.AIfelling} src={talkingAI} />
          <p>
            Sentindo-se <span>falante</span>
          </p>
        </aside>

        <main>
          <div className={styles.messages}>
            <SpeechBubble
              sender="ai"
              text={`Olá, sou a Izzo. Sua IA interativa! ${AIFirstMessage}`}
              sentAt={Date.now()}
            />
            {messages.map((message, index) => (
              <SpeechBubble
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
              handleListening={handleListening}
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
