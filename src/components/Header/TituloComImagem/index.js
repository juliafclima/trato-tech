import styles from "./TituloComImagem.module.scss";

export default function TituloComImagem({
  titulo,
  descricao,
  className = "",
  imagem,
}) {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles["header-texto"]}>
        <h1>{titulo}</h1>
        <h2>{descricao}</h2>
      </div>
      
      <div className={styles["header-imagem"]}>
        <img alt={titulo} src={imagem} title={titulo} />
      </div>
    </header>
  );
}
