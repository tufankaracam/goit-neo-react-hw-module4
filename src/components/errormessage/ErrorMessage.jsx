import styles from "./errormessage.module.css";
export default function ErrorMessage({ message }) {
  return <div className={styles.message}>{message}</div>;
}
