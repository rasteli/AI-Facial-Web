import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export function Home() {

    const navigate = useNavigate();

    return(
        <div className={styles.container}>
            {/* Header. */}
            <div className={styles.header}> 
                {/* Essa div vai conter a logo. Por enquanto é um cubo bege para mexer com o display */}
                <div className={styles.imgBox}></div>
                {/* Essa div segura os dois botões */}
                <div className={styles.hBBox}>
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
                </div>
            </div>
        </div>
    )
}