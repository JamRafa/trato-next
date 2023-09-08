import { useRouter } from "next/router";
import styles from "./login.module.scss";
import { useState } from "react";
import Api from "../../api/api";
import { authService } from "../../service/authService";
import LogoImage from "/public/assets/logo.svg";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [nome, setNome] = useState("Rafael Carvalho");
  const [senha, setSenha] = useState("123");

  const hendlerSubmit = async (ev) => {
    ev.preventDefault();
    authService.login({ nome, senha }).then(() => {
      router.push("/");
    });
  };

  return (
    <>
      <div className={styles.authPage}>
        <div className={styles.title}>
          <Image
            src={LogoImage}
            alt="Logo"
            className={styles.logo}
            width={300}
            onClick={() => router.push("/")}
          />
          <p>Seu site de compras favorito faça suas compras aqui!</p>
        </div>
        <form
          className={styles.formulario}
          onSubmit={(ev) => hendlerSubmit(ev)}
        >
          <div className={styles.caixa}>
            <div className={styles.text}>Bem vindo ao trato Next</div>
            <div className={styles.inputs}>
              <input
                className={styles["inputs-nome"]}
                placeholder="nome"
                value={nome}
                onChange={(ev) => setNome(ev.target.value)}
              />
              <input
                className={styles["inputs-senha"]}
                placeholder="senha"
                type="password"
                value={senha}
                onChange={(ev) => setSenha(ev.target.value)}
              />
            </div>
            <div className={styles.botoes}>
              <button type="submit" className={styles["botoes-login"]}>
                Logar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
