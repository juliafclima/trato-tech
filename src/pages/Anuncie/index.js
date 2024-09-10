import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { cadastrarItem } from "store/reducers/items";
import Header from "components/Header";
import Button from "components/Button";

import styles from "./Anuncie.module.scss";
import { useParams } from "react-router-dom";
import Input from "components/Input";

const schema = yup.object().shape({
  titulo: yup.string().required("Nome do produto é obrigatório"),
  descricao: yup.string().required("Descrição do produto é obrigatória"),
  foto: yup
    .string()
    .url("URL da imagem deve ser válida")
    .required("URL da imagem do produto é obrigatória"),
  categoria: yup.string().required("Selecione uma categoria"),
  preco: yup
    .number()
    .transform((value) => (value === "" ? null : value))
    .typeError("O preço deve ser um número")
    .positive("O preço deve ser um valor válido")
    .required("O preço do produto é obrigatório"),
});

export default function Anuncie() {
  const dispatch = useDispatch();
  const { nomeCategoria = "" } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoria: nomeCategoria,
    },
  });

  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }

  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui!"
        descricao="Anuncie seu produto no melhor site do Brasil"
      />

      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("titulo")}
          placeholder="Nome do produto"
          alt="nome do produto"
        />
        {errors.titulo && (
          <span className={errors.titulo ? styles["input-erro-message"] : ""}>
            {errors.titulo.message}
          </span>
        )}

        <Input
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("descricao")}
          placeholder="Descrição do produto"
          alt="descrição do produto"
        />
        {errors.descricao && (
          <span className={errors.titulo ? styles["input-erro-message"] : ""}>
            {errors.descricao.message}
          </span>
        )}

        <Input
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("foto")}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        {errors.foto && (
          <span className={errors.titulo ? styles["input-erro-message"] : ""}>
            {errors.foto.message}
          </span>
        )}

        <select
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("categoria")}
          disabled={nomeCategoria}
        >
          <option value="" disabled>
            Selecione a categoria
          </option>

          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className={errors.titulo ? styles["input-erro-message"] : ""}>
            {errors.categoria.message}
          </span>
        )}

        <Input
          className={errors.titulo ? styles["input-erro"] : ""}
          {...register("preco")}
          type="number"
          placeholder="Preço do produto"
        />
        {errors.preco && (
          <span className={errors.titulo ? styles["input-erro-message"] : ""}>
            {errors.preco.message}
          </span>
        )}

        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
