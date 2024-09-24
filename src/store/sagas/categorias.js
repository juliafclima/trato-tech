import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createStandaloneToast } from "@chakra-ui/toast";

import {
  adicionarTodasAsCategorias,
  carregarCategorias,
} from "store/reducers/categorias";
import categoriasService from "services/categorias";

const { toast } = createStandaloneToast();

function* observarCategorias() {
  toast({
    title: "Carregando",
    description: "Carregando categorias",
    status: "loading",
    duration: 2000,
    isClosable: true,
  });
  try {
    yield delay(1500);
    const categorias = yield call(categoriasService.buscar);
    yield put(adicionarTodasAsCategorias(categorias));

    toast({
      title: "Sucesso!",
      description: "Categorias carregadas com sucesso!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Erro",
      description: "Erro na busca de categorias",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  }
}

export function* categoriasSaga() {
  const tarefa = yield takeEvery(carregarCategorias, observarCategorias);
  yield takeLatest(adicionarTodasAsCategorias, () => tarefa.cancel());
}
