import Perfil from "../Perfil";
import TituloComImagem from "./ComImagem";
import styles from "./Header.module.scss";
import TituloSemImagem from "./SemImagem";

export default function Header({
  titulo,
  descricao,
  className = "",
  imagem,
  children,
}) {
  return (
    <div className={styles.topoTodo}>
      <header className={`${styles.header}`}>
        {titulo && !imagem && (
          <TituloSemImagem titulo={titulo} descricao={descricao}>
            {children}
          </TituloSemImagem>
        )}
        {titulo && imagem && (
          <TituloComImagem
            titulo={titulo}
            descricao={descricao}
            imagem={imagem}
            className={className}
          >
            {children}
          </TituloComImagem>
        )}
      </header>
    </div>
  );
}
