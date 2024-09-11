import { createListenerMiddleware } from "@reduxjs/toolkit";

import { carregarUmaCategoria } from "store/reducers/categorias";
import criarTarefa from "./utils/crarTarefa";
import itensService from "services/itens";
import { adicionarItens } from "store/reducers/items";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { dispatch, fork, getState, unsubscribe }) => {
    const { itens } = getState();
    const nomeCategoria = action.payload;
    const itensCarregados = itens.some(
      (item) => item.categoria === nomeCategoria
    );

    if (itensCarregados) return;
    if (itens.length >= 4) return unsubscribe();

    await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregadas com sucesso!`,
      textoErro: "Erro ao buscar as itens",
    });
  },
});
