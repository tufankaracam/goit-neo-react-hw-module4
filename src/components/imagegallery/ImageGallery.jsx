import ImageCard from "../imagecard/ImageCard";
import styles from "./imagegallery.module.css";
export default function ImageGallery({ photos, galleryRef, openModal }) {
  return (
    <ul className={styles.container} ref={galleryRef}>
      {photos?.map((photo) => (
        <li key={photo.id} className={styles.card}>
          <ImageCard photo={photo} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
}
