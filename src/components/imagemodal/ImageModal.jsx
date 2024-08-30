import styles from "./imagemodal.module.css";
import Modal from "react-modal";
export default function ImageModal({ photo, isOpen, onRequestClose }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={photo?.urls?.regular}
          alt={photo?.alt_description}
        />
      </div>
    </Modal>
  );
}
