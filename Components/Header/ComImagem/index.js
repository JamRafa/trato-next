import styles from "./ComImagem.module.scss";
import Image from 'next/image'
export default function TituloComImagem({
  titulo,
  descricao,
  imagem,
  className,
  children,
}) {
  return (
    <div className={`${className} ${styles.header}`}>
      <div className={styles["header-texto"]}>
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
        {children}
      </div>
      <div className={styles["header-imagem"]}>
        <Image alt={titulo} src={imagem} />
      </div>
    </div>
  );
}
