import styles from "./item.module.scss";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import classNames from "classnames";
import {
  deletaCarrinho,
  mudarQuantidade,
  salvarCarrinho,
} from "../../store/reducers/carrinho";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const quantidadeProps = {
  size: 32,
  color: "#1875E8",
};

export default function Item({ props }) {
  const {
    titulo,
    foto,
    preco,
    descricao,
    favorito,
    id,
    quantidade = 0,
  } = props;

  const router = useRouter();
  const dispatch = useDispatch();

  function resolverCarrinho() {
    if (!isCarrinho) {
      dispatch(
        salvarCarrinho({
          titulo,
          id,
          descricao,
          foto,
          preco,
          quantidade: 1,
        })
      );
    } else {
      dispatch(deletaCarrinho(id));
    }
  }

  const carrinhoPage = router.pathname.startsWith("/carrinho") ? true : false;
  const historicoPage = router.pathname.startsWith("/historico") ? true : false;
  const isCarrinho = useSelector((state) =>
    state.carrinho.some((item) => item.id === id)
  );

  const conteudoCarrinhoPage = () => {
    return (
      <div className={styles.quantidade}>
        Quantidade:{" "}
        <AiFillMinusCircle
          {...quantidadeProps}
          onClick={() => {
            if (quantidade >= 1) {
              dispatch(mudarQuantidade({ id, quantidade: -1 }));
            }
          }}
        ></AiFillMinusCircle>
        <span>{String(quantidade || 0).padStart(2, "0")}</span>
        <AiFillPlusCircle
          {...quantidadeProps}
          onClick={() => dispatch(mudarQuantidade({ id, quantidade: +1 }))}
        ></AiFillPlusCircle>
      </div>
    );
  };
  const conteudoFavorito = () => {
    return favorito ? (
      <AiFillHeart
        {...iconeProps}
        color="#ff0000"
        className={styles["item-acao"]}
        // onClick={resolverFavorito}
      />
    ) : (
      <AiOutlineHeart
        {...iconeProps}
        className={styles["item-acao"]}
        // onClick={resolverFavorito}
      />
    );
  };

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinhoPage,
      })}
    >
      <AiFillCloseCircle
        {...iconeProps}
        className={`${styles["item-acao"]} ${styles["item-deletar"]}`}
        onClick={() => dispatch(deletaCarrinho(id))}
      />
      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} />
      </div>
      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          <h2>{titulo}</h2>

          <p>{descricao}</p>
        </div>
        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>R$ {preco?.toFixed(2)}</div>
          <div className={styles["item-acoes"]}>
            {conteudoFavorito()}
            {carrinhoPage ? (
              conteudoCarrinhoPage()
            ) : historicoPage ? (
              <>
                <div className={styles.quantidade}>
                  <FaCartPlus />
                  {quantidade}
                </div>
              </>
            ) : (
              <>
                <FaCartPlus
                  {...iconeProps}
                  color={isCarrinho ? "#1A5D1A" : iconeProps.color}
                  className={styles["item-acao"]}
                  onClick={resolverCarrinho}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
