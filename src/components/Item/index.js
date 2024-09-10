import {
  AiOutlineHeart,
  AiFillHeart,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineCheck,
  AiFillEdit,
  AiFillCloseCircle,
} from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useState } from "react";

import styles from "./Item.module.scss";

import { deletarItem, mudarFavorito, mudarItem } from "store/reducers/items";
import { mudarCarrinho, mudarQuantidade } from "store/reducers/carrinho";
import { formatarPreco } from "utils/formatarPreco";
import Input from "components/Input";

const iconeProps = {
  size: 24,
  color: "#041833",
};

const quantidadeProps = {
  size: 32,
  color: "#1875E8",
};

export default function Item(props) {
  const { titulo, foto, preco, descricao, favorito, id, carrinho, quantidade } =
    props;

  const [modoDeEdicao, setModoDeEdicao] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(titulo);

  const estaNoCarrinho = useSelector((state) =>
    state.carrinho.some((itemNoCarrinho) => itemNoCarrinho.id === id)
  );

  const dispatch = useDispatch();

  function resolverFavorito() {
    dispatch(mudarFavorito(id));
  }

  function resolverCarrinho() {
    dispatch(mudarCarrinho(id));
  }

  function aumentarQuantidade() {
    dispatch(mudarQuantidade({ id, quantidade: +1 }));
  }

  function diminuirQuantidade() {
    if (quantidade >= 1) dispatch(mudarQuantidade({ id, quantidade: -1 }));
  }

  const componenteModoDeEdicao = (
    <>
      {modoDeEdicao ? (
        <AiOutlineCheck
          {...iconeProps}
          className={styles["item-acao"]}
          onClick={() => {
            setModoDeEdicao(false);
            dispatch(
              mudarItem({
                id,
                item: { titulo: novoTitulo },
              })
            );
          }}
        />
      ) : (
        <AiFillEdit
          {...iconeProps}
          className={styles["item-acao"]}
          onClick={() => setModoDeEdicao(true)}
        />
      )}
    </>
  );

  return (
    <div
      className={classNames(styles.item, {
        [styles.itemNoCarrinho]: carrinho,
      })}
    >
      <AiFillCloseCircle
        {...iconeProps}
        className={`${styles["item-acao"]} ${styles["item-deletar"]}`}
        onClick={() => dispatch(deletarItem(id))}
      />

      <div className={styles["item-imagem"]}>
        <img src={foto} alt={titulo} title={titulo} />
      </div>

      <div className={styles["item-descricao"]}>
        <div className={styles["item-titulo"]}>
          {modoDeEdicao ? (
            <Input
              value={novoTitulo}
              onChange={(evento) => setNovoTitulo(evento.target.value)}
            />
          ) : (
            <h2>{titulo}</h2>
          )}
          <p>{descricao}</p>
        </div>

        <div className={styles["item-info"]}>
          <div className={styles["item-preco"]}>{formatarPreco(preco)}</div>

          <div className={styles["item-acoes"]}>
            {favorito ? (
              <AiFillHeart
                {...iconeProps}
                color="#ff0000"
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            ) : (
              <AiOutlineHeart
                {...iconeProps}
                className={styles["item-acao"]}
                onClick={resolverFavorito}
              />
            )}

            {carrinho ? (
              <div className={styles.quantidade}>
                Quantidade:
                <AiFillMinusCircle
                  {...quantidadeProps}
                  onClick={diminuirQuantidade}
                />
                <span>{String(quantidade || 0).padStart(2, "0")}</span>
                <AiFillPlusCircle
                  {...quantidadeProps}
                  onClick={aumentarQuantidade}
                />
              </div>
            ) : (
              <>
                <FaCartPlus
                  {...iconeProps}
                  color={estaNoCarrinho ? "#1875E8" : iconeProps.color}
                  className={styles["item-acao"]}
                  onClick={resolverCarrinho}
                />

                {componenteModoDeEdicao}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
