import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import itensService from "services/itens";

export const buscarItens = createAsyncThunk(
  "itens/buscar",
  itensService.buscar
);

const itensSlice = createSlice({
  name: "itens",
  initialState: [],
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state = state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, id: uuid() });
    },
    mudarItem: (state, { payload }) => {
      return state.map((item) => {
        if (item.id === payload.id) item = { ...item, ...payload.item };
        return item;
      });
    },
    deletarItem: (state, { payload }) => {
      return state.filter((item) => item.id !== payload);
    },
    adicionarItens: (state, { payload }) => {
      state.push(...payload);
    },
  },
});

export const {
  mudarFavorito,
  cadastrarItem,
  mudarItem,
  deletarItem,
  adicionarItens,
} = itensSlice.actions;

export default itensSlice.reducer;
