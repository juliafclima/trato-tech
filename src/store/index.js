import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import categoriasSlice from "./reducers/categorias";
import itensSlice from "./reducers/items";
import carrinhoSlice from "./reducers/carrinho";
import buscaSlice from "./reducers/busca";
import usuarioSlice from "./reducers/usuario";
import { itensListener } from "./middlewares/itens";
import { categoriasSaga } from "./sagas/categorias";
import { carrinhoSaga } from "./sagas/carrinho";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    categorias: categoriasSlice,
    itens: itensSlice,
    carrinho: carrinhoSlice,
    busca: buscaSlice,
    usuario: usuarioSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      //categoriasListener.middleware,
      itensListener.middleware,
      sagaMiddleware
    ),
});

sagaMiddleware.run(categoriasSaga);
sagaMiddleware.run(carrinhoSaga);

export default store;
