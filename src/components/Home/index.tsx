import * as Dialog from "@radix-ui/react-dialog"

import styles from "./styles.module.scss"

import help from "../../assets/help.svg"

import facePoly from "../../assets/facePoly.png"
import talkingAI from "../../assets/talkingAI.png"
import thinkingAI from "../../assets/thinkingAI.png"

import { Header } from "../Header"
import { ContactDialog } from "../ContactDialog"

export function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <section className={styles.sec1}>
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

        <div className={styles.decImgBox}>
          <img src={facePoly} alt="" />
        </div>

        <section className={styles.sec2}>
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

      <Dialog.Root>
        <footer>
          <Dialog.Trigger id="signup" type="button">
            <img src={help} alt="" />
          </Dialog.Trigger>
        </footer>

        <ContactDialog />
      </Dialog.Root>
    </div>
  )
}
