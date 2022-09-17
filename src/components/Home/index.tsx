import { useNavigate } from "react-router-dom"
import styles from "./styles.module.scss"

import help from "../../assets/help.svg"
import izzoLogo from "../../assets/izzo-logo.svg"

import facePoly from "../../assets/facePoly.png"
import talkingAI from "../../assets/talkingAI.png"
import thinkingAI from "../../assets/thinkingAI.png"

export function Home() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoBox}>
          <img src={izzoLogo} alt="" />
        </div>
        <nav>
          <button
            id="login"
            type="button"
            onClick={() => {
              navigate("/login", { replace: false })
            }}
          >
            ENTRAR
          </button>
          <button
            id="signup"
            type="button"
            onClick={() => {
              navigate("/signup", { replace: false })
            }}
          >
            CADASTRO
          </button>
        </nav>
      </header>
      {/* Parte principal do site */}
      <main>
        {/* Usando uma section para cada coisinha */}
        <section className={styles.sec1}>
          {/* Div p/conter a imagem do Guidelli */}
          <div className={styles.imgBox1}>
            <img src={talkingAI} alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            perspiciatis pariatur porro corrupti dignissimos corporis nihil
            illum! Atque, sapiente quas sequi, voluptas reprehenderit autem non
            laudantium beatae excepturi ad esse vitae pariatur error aliquid aut
            veritatis! Reiciendis, cumque autem eum mollitia numquam iure quae
            laboriosam similique optio ducimus aspernatur illo! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Rem perspiciatis
            pariatur porro corrupti dignissimos corporis nihil illum! Atque,
            sapiente quas sequi, voluptas reprehenderit autem non laudantium
            beatae excepturi ad esse vitae pariatur error aliquid aut veritatis!
            Reiciendis, cum
          </p>
        </section>

        {/* Essa div vai conter a imagem entre as duas secções */}
        <div className={styles.decImgBox}>
          <img src={facePoly} alt="" />
        </div>

        <section className={styles.sec2}>
          {/* Div p/conter a imagem do Guidelli */}
          <div className={styles.imgBox2}>
            <img src={thinkingAI} alt="" />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
            perspiciatis pariatur porro corrupti dignissimos corporis nihil
            illum! Atque, sapiente quas sequi, voluptas reprehenderit autem non
            laudantium beatae excepturi ad esse vitae pariatur error aliquid aut
            veritatis! Reiciendis, cumque autem eum mollitia numquam iure quae
            laboriosam similique optio ducimus aspernatur illo! Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Rem perspiciatis
            pariatur porro corrupti dignissimos corporis nihil illum! Atque,
            sapiente quas sequi, voluptas reprehenderit autem non laudantium
            beatae excepturi ad esse vitae pariatur error aliquid aut veritatis!
            Reiciendis, cum
          </p>
        </section>
      </main>

      {/* Não é *bem* um footer mas neh. */}
      <footer>
        {/* Esse botão tem que levar a algum lugar ou fazer alguma coisa... */}
        <button
          id="signup"
          type="button"
          onClick={() => {
            navigate("/", { replace: false })
          }}
        >
          <img src={help} alt="" />
        </button>
      </footer>
    </div>
  )
}
