import { useDispatch, useSelector } from 'react-redux';
import styles from './busca.module.scss';
import { useEffect } from 'react';
import { mudarBusca, resetarBusca } from '../../store/reducers/busca';
import { useRouter } from 'next/router';

export default function Busca() {

  const busca = useSelector(state => state.busca)
  const dispatch = useDispatch()
  const route = useRouter()


    useEffect(() => {
        dispatch(resetarBusca())
    }, [route.pathname, dispatch])
  return (
    <div className={styles.busca}>
      <input
        className={styles.input}
        placeholder="O que você procura?"
        value={busca}
        onChange={ev => dispatch(mudarBusca(ev.target.value))}
      />
    </div>
  )
}