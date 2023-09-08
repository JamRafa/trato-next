import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import { withSession, withSessionHOC } from "../../service/session";
import Item from "../../Components/item";
import styles from "./carrinho.module.scss"
import Button from "../../Components/Button";
import Api from "../../api/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import AdicionaCartao from "../../Components/AdicionaCartao";



  export const getServerSideProps = withSession(async(ctx) => {
    const {req} = ctx;
    const userId = (req.session.data.user.userId)
    const card = await Api.post("/getCartoes", {id: userId})

    const cartoes = card.data.map(cartao => cartao)
    return{
        props: {
            cartoes,
            userId
        }
    }
})

function Carrinho({cartoes, userId}){
    const [armazenaCartoes, setArmazenaCartoes] = useState(cartoes)
    console.log(armazenaCartoes)
    const [cardValue, setCardValue] = useState({
        id: 0,
        value: 0
    })
    const [open, setOpen] = useState(false)

    let total = 0
    const itensNocarrinho = useSelector(state => {
        state.carrinho.map(itens => {
            total = (itens.preco * itens.quantidade) + total
        })
        return(state.carrinho)
    })
    

const handleCard = (ev) => {
    console.log(ev.target.value)
    if (ev.target.value == 0) {
        setCardValue({
            id: ev.target.value,
            value: 0
        })
        return
    }
    const valor = armazenaCartoes.find(cartao => cartao.id === Number(ev.target.value))
    setCardValue({
        id: ev.target.value,
        value: valor.valor
    })
}
const hendlePagamento = async () => {
    if (cardValue.value < total){
        alert('saldo insuficiente')
    }else{
        setCardValue(cardValue.value - total)

        const itensComprados = itensNocarrinho.map(itens => {
           return{
               id: itens.id, 
               quantidade: itens.quantidade
           } 
        })
        await Api.post("/efetuaCompra", {
            itensComprados, 
            newCardValue: cardValue,
            userId

        })
    }
    
}


    return(
        <div>
            <Header
             titulo='Carrinho de compras'
             descricao='Confira produtos que você adicionou ao carrinho.'/>
            <div className={styles.carrinho}>
                {itensNocarrinho?.map(item => <Item key={item.id} props={...item} />)}
                <div className={styles.total}>
                    <strong>
                        Resumo da compra
                    </strong>
                    <span>
                    Subtotal: <strong>{total.toFixed(2)}</strong>
                    </span>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardBox}>
                        <select className={styles.select} value={cardValue.id} onChange={(ev) => handleCard(ev)}>
                            <option className={styles.selectValue} value={0}>Selecione cartao</option>
                            {armazenaCartoes?.map(cartao => <option key={cartao.id} className={styles.cardValue} value={cartao.id}>{cartao.nome}</option>)}
                        </select>
                        <div className={styles.adicionarCartao} onClick={()  => setOpen(!open)}>
                            <BsFillPlusSquareFill className={styles.teste}/>
                            <p>Adicionar cartão</p>
                        </div>
                    </div>
                    <span>
                    Saldo do cartao: <strong>{cardValue.value}</strong>
                    </span>
                </div>
                
                <AdicionaCartao open={open} setOpen={setOpen} userId={userId} setArmazenaCartoes={setArmazenaCartoes} armazenaCartoes={armazenaCartoes}/>
                <Button onClick={hendlePagamento} disabled={!total}>
                    Finalizar compra
                </Button>
            </div>
        </div>
    )
}

export default Carrinho