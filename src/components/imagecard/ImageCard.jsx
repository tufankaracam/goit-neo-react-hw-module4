import styles from "./imagecard.module.css";
export default function ImageCard({ photo, openModal }) {
  return (
    <div
      className={styles.card}
      onClick={() => {
        openModal(photo);
      }}
    >
      <img
        className={styles.image}
        src={photo.urls.small}
        alt={photo.alt_descriptionalt_description}
      />
    </div>
  );
}
