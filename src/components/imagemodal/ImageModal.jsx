import styles from "./imagemodal.module.css";

export default function ImageModal({ photo }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={photo?.urls?.regular}
        alt={photo?.alt_description}
      />
    </div>
  );
}
