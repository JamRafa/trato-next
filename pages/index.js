import Button from "../Components/Button";
import Header from "../Components/Header";
import Api from "../api/api";
import relogio from "/public/assets/inicial.png";
import styles from "./Home.module.scss";
import Link from "next/link";
import { withSessionHOC } from "../service/session";
// depois testar com getServerSideProps


export async function getStaticProps() {
  const dados = await Api.get("/allCategories");

  const categorias = dados.data.map((categoria) => categoria);
  return {
    props: {
      categorias,
    },
    revalidate: 10,
  };
}

//<Button onClick={() => navigate("/anuncie")}>Quero anunciar</Button>


function Home({categorias}) {
  return (
    <div>
      <Header
        titulo="Classificados Tech"
        descricao="Compre diversos tipos de produtos no melhor site do Brasil!"
        imagem={relogio}
        className={styles.header}
      >
      </Header>
      <div className={styles.categorias}>
        <div className={styles["categorias-title"]}>
          <h1>Categorias</h1>
        </div>
        <div className={styles["categorias-container"]}>
          {categorias.map((categoria) => (
            <Link
              key={categoria.id}
              href={`itens/${categoria.id}/?nome=${categoria.nome}`}
              passHref
              prefetch={false}
            >
              <div
              //onClick={() => navigate(`/categoria/${categoria.id}`)}
              >
                <img src={categoria.thumbnail} alt={categoria.nome} />
                <h1>{categoria.nome}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
