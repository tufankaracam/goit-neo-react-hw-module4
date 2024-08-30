import styles from "./loader.module.css";
import { ProgressBar } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className={styles.container}>
      <ProgressBar color=" rgb(235, 86, 27)" />
    </div>
  );
}
