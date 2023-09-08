import styles from "./NavBar.module.scss";
import classNames from "classnames";
import { RiShoppingCartLine, RiShoppingCartFill } from "react-icons/ri";
import { ImExit } from "react-icons/im";
import Busca from "../Busca";
import LogoImage from "/public/assets/logo.svg"; // Caminho para a imagem
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Perfil from "../Perfil";
import { tokenService } from "../../service/tokenService";
import { AiFillHome, AiOutlineHistory } from "react-icons/ai";

const iconeProps = {
  size: "24px",
  color: "white",
};
const iconePropsHover = {
  size: "24px",
};

function NavBar() {
  const router = useRouter();

  const handleExit = () => {
    tokenService.deletaToken();
    router.push("/login/login");
  };

  return (
    <nav className={styles.nav}>
      <Image
        src={LogoImage}
        alt="Logo"
        className={styles.logo}
        onClick={() => router.push("/")}
      />
      <div className={styles.links}>
        <Link
          href="/"
          className={classNames(styles.link, {
            [styles.selected]: router.pathname === "/",
          })}
        >
          <AiFillHome {...iconePropsHover}/> Home
        </Link>
        <Link
          href="/historico"
          className={classNames(styles.link, {
            [styles.selected]: router.pathname === "/",
          })}
        >
          <AiOutlineHistory {...iconePropsHover}/> Historico
        </Link>

      </div>
      <div className={styles.busca}>
        <Busca />
      </div>
      <div className={styles.icones}>
        <Link href={`/carrinho`}>
          {router.pathname.startsWith("/carrinho") ? (
            <RiShoppingCartFill {...iconeProps} />
          ) : (
            <RiShoppingCartLine {...iconeProps} />
          )}
        </Link>
        <Perfil />
        <div className={styles.icones}>
          <ImExit {...iconeProps} onClick={() => handleExit()} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
