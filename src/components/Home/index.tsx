import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();

    return(
        // Pensando em tirar essa div depois.
        <div className={styles.container}>
            {/* Header. */}
            <header className={styles.header}> 
                {/* Essa div vai conter a logo. Por enquanto é um cubo bege para mexer com o display */}
                <div className={styles.logoBox}></div>
                {/* Essa div segura os dois botões */}
                <nav>
                    <button
                        id="login"
                        type="button"
                        onClick={() => {
                            navigate("/login", { replace: false })
                        }}
                    >
                        LOGIN
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
                    <div className={styles.imgBox1}></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Rem perspiciatis pariatur porro corrupti dignissimos corporis 
                        nihil illum! Atque, sapiente quas sequi, voluptas 
                        reprehenderit autem non laudantium beatae excepturi ad esse 
                        vitae pariatur error aliquid aut veritatis! Reiciendis, cumque 
                        autem eum mollitia numquam iure quae laboriosam similique 
                        optio ducimus aspernatur illo!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Rem perspiciatis pariatur porro corrupti dignissimos corporis 
                        nihil illum! Atque, sapiente quas sequi, voluptas 
                        reprehenderit autem non laudantium beatae excepturi ad esse 
                        vitae pariatur error aliquid aut veritatis! Reiciendis, cum</p>
                </section>
                
                {/* Essa div vai conter a imagem entre as duas secções */}
                <div className={styles.decImgBox}></div>

                <section className={styles.sec2}>
                    {/* Div p/conter a imagem do Guidelli */}
                    <div className={styles.imgBox2}></div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Rem perspiciatis pariatur porro corrupti dignissimos corporis 
                        nihil illum! Atque, sapiente quas sequi, voluptas 
                        reprehenderit autem non laudantium beatae excepturi ad esse 
                        vitae pariatur error aliquid aut veritatis! Reiciendis, cumque 
                        autem eum mollitia numquam iure quae laboriosam similique 
                        optio ducimus aspernatur illo!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Rem perspiciatis pariatur porro corrupti dignissimos corporis 
                        nihil illum! Atque, sapiente quas sequi, voluptas 
                        reprehenderit autem non laudantium beatae excepturi ad esse 
                        vitae pariatur error aliquid aut veritatis! Reiciendis, cum</p>
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
                        AJUDA
                    </button>
            </footer>
        </div>
    )
}