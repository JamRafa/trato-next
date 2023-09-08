import styles from "./Carrinho.module.scss";
//import { useSelector } from 'react-redux';
import Header from "../../Components/Header";
//import Item from '../../Components/item';
import Button from "../../Components/Button";
import { useRouter } from "next/router";
import Api from "../../api/api";
import { withSessionHOC } from "../../service/session";
import Item from "../../Components/item";
import { useSelector } from "react-redux";

export async function getStaticPaths() {
  return {
    // paths: paths,
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const itensCategoria = await Api.get(`/someItens/${id}`);
  const itens = itensCategoria.data.map((categoria) => categoria);
  console.log(`Gerou! ${id}`);
  return {
    props: { itens },
  };
}

function Itens({ itens }) {
  const { itensFilter } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i')
    return {
      itensFilter: itens.filter(item => item.titulo.match(regexp))
    }
  })
  const router = useRouter();
  console.log(router)
  return (
    <div>
      <Header
        titulo={router.query.nome}
        descricao={itens.descricao}
        imagem={itens.header}
      >

      </Header>
      <div className={styles.categorias}>
        <div className={styles.itens}>
          {itensFilter?.map((item) => (
            <div key={item.id} >
               <Item props={item}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Itens