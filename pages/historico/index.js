import Header from "../../Components/Header";
import Item from "../../Components/item";
import Api from "../../api/api";
import { withSession } from "../../service/session";
import styles from "./historico.module.scss";
//import historicoImage from "/public/assets/historico.jpg"

export const getServerSideProps = withSession(async (ctx) => {
  const userId = ctx.req.session.data.user.userId;

  const historicoCompras = await Api.post("/historico", { id: userId });
  const historico = historicoCompras.data.map((cartao) => {
    return {
      ...cartao.iten,
      quantidade: cartao.quantidade,
      idCompra: cartao.id,
    };
  });
  return {
    props: {
      historico,
    },
  };
});

function Historico({ historico }) {
  console.log(historico);

  const handleTotal = () => {
    const soma = historico.reduce((acumulador, item) => {
      let total = item.preco * item.quantidade;
      return acumulador + total;
    }, 0);

    const numeroFormatado = soma.toFixed(2)

    return <p> R$ {numeroFormatado}</p>;
  };

  return (
    <>
      <Header
        titulo={"Historico de compras"}
        //descricao={itens.descricao}
      ></Header>
      <section className={styles.historico}>
        <div className={styles.itens}>
          {historico?.map((item) => (
            <div key={item.idCompra}>
              <Item props={item} />
            </div>
          ))}
        </div>
        <div className={styles.total}>{handleTotal()}</div>
      </section>
    </>
  );
}
export default Historico;
