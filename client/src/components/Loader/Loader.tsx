import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div
      className={`${styles.loader} absolute top-[24.5em] left-[8.5em]`}
    ></div>
  );
};

export default Loader;
