import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { formatarPreco } from "utils/formatarPreco";
import Header from "components/Header";
import Item from "components/Item";
import Button from "components/Button";

import styles from "./Carrinho.module.scss";

export default function Carrinho() {
  const navigate = useNavigate();

  const { carrinho, total } = useSelector((state) => {
    let total = 0;

    const regexp = new RegExp(state.busca, "i");

    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find((item) => item.id === itemNoCarrinho.id);

      total += item.preco * itemNoCarrinho.quantidade;

      if (item.titulo.match(regexp)) {
        itens.push({
          ...item,
          quantidade: itemNoCarrinho.quantidade,
        });
      }

      return itens;
    }, []);

    return {
      carrinho: carrinhoReduce,
      total,
    };
  });

  return (
    <div>
      <Header
        titulo="Carrinho de compras"
        descricao="Confira produtos que você adicionou ao carrinho."
      />

      <div className={styles.carrinho}>
        {carrinho.map((item) => (
          <Item key={item.id} {...item} carrinho />
        ))}

        <div className={styles.total}>
          <strong>Resumo da compra</strong>

          <span>
            Subtotal: <strong>{formatarPreco(total)}</strong>
          </span>
        </div>

        <Button onClick={() => navigate('/pagamento')}>
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}
