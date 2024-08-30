import styles from "./loadmorebtn.module.css";
export default function LoadMoreBtn({ getNextPage, loadMoreRef }) {
  return (
    <button
      onClick={() => {
        getNextPage();
      }}
      className={styles.button}
      ref={loadMoreRef}
    >
      Load More
    </button>
  );
}
