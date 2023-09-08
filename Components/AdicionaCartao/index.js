import { useState } from "react";
import Input from "../Input";
import styles from "./AdicionaCartao.module.scss";
import Api from "../../api/api";
export default function AdicionaCartao({
  open,
  setOpen,
  userId,
  setArmazenaCartoes,
  armazenaCartoes,
}) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState('');

  const handleSub = async (ev) => {
    ev.preventDefault();

    const novoCartao = await Api.post("/adicionaCartao", {
      id: userId,
      nome,
      valor,
    });
    setArmazenaCartoes([...armazenaCartoes, novoCartao.data]);

    setOpen(!open);
  };

  if (!open) {
    return "";
  } else {
    return (
      <form className={styles.box} onSubmit={(ev) => handleSub(ev)}>
        <p>Adicione seu cartao</p>
        <div className={styles.input}>
          <Input
            placeholder="nome"
            value={nome}
            onChange={(ev) => setNome(ev.target.value)}
          />
          <Input
            placeholder="valor"
            type="number"
            value={valor}
            onChange={(ev) => setValor(ev.target.value)}
          />
        </div>
        <div className={styles.adicionar}>
          <button className={styles.botao} type="submit">
            Adicionar cartao
          </button>
        </div>
      </form>
    );
  }
}
