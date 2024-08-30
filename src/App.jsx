import { useEffect, useRef, useState } from "react";
import "./App.css";
import getPhotos from "./api/unsplash";
import SearchBar from "./components/searchbar/SearchBar";
import ImageGallery from "./components/imagegallery/ImageGallery";
import LoadMoreBtn from "./components/loadmorebtn/LoadMoreBtn";
import ErrorMessage from "./components/errormessage/ErrorMessage";
import Loader from "./components/loader/Loader";
import Modal from "react-modal";
import { Toaster } from "react-hot-toast";
import ImageModal from "./components/imagemodal/ImageModal";

Modal.setAppElement("#root");

function App() {
  const loadMoreRef = useRef();
  const galleryRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [activePhoto, setActivePhoto] = useState(null);
  const [params, setParams] = useState({
    query: "",
    page: 1,
  });

  function openModal(photoParams) {
    setActivePhoto(photoParams);
    setIsOpen(true);
  }

  function closeModal() {
    setActivePhoto(null);
    setIsOpen(false);
  }

  const loadPhotos = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await getPhotos(params);

      if (data.results.length == 0) {
        setError("We couldn't find any results.");
      }

      if (params.page == 1) {
        setPhotos(data.results);
      } else {
        setPhotos((prev) => [...prev, ...data.results]);
      }

      setTotalPages(data.total_pages);
    } catch (e) {
      setError(
        "Opps! Somethings gone wrong. Please refresh your page and try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const searchPhotos = async (query) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      query,
    }));
  };

  const getNextPage = async () => {
    setParams((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    if (params.query.length >= 3) {
      loadPhotos();
    }
  }, [params.query, params.page]);

  useEffect(() => {
    if (!loading && photos.length > 0) {
      const checkImagesLoaded = () => {
        if (galleryRef.current) {
          const images = galleryRef.current.querySelectorAll("img");
          const allImagesLoaded = Array.from(images).every(
            (img) => img.complete
          );

          if (allImagesLoaded) {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
          } else {
            requestAnimationFrame(checkImagesLoaded);
          }
        }
      };

      requestAnimationFrame(checkImagesLoaded);
    }
  }, [photos, loading]);

  return (
    <>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <ImageModal photo={activePhoto} />
      </Modal>
      <Toaster position="top-right" />
      <SearchBar searchPhotos={searchPhotos} />

      {photos.length > 0 && (
        <ImageGallery
          photos={photos}
          galleryRef={galleryRef}
          openModal={openModal}
        />
      )}

      {loading ? (
        <Loader />
      ) : (
        photos.length > 0 &&
        totalPages > params.page && (
          <LoadMoreBtn getNextPage={getNextPage} loadMoreRef={loadMoreRef} />
        )
      )}
      {error && <ErrorMessage message={error} />}
    </>
  );
}

export default App;
