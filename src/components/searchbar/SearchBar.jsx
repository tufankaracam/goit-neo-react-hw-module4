import { useRef, useState } from "react";
import styles from "./searchbar.module.css";
import { IoSearch } from "react-icons/io5";
import toast from "react-hot-toast";

export default function SearchBar({ searchPhotos }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length < 3) {
      toast.error("Search text must be minimum 3 characters.");
      return;
    }
    searchPhotos(query);
    setQuery("");
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button className={styles.button} type="submit">
          <IoSearch className={styles.icon} />
        </button>
        <input
          className={styles.input}
          type="text"
          name="query"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
