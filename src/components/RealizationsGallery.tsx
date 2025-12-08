import { useState, useMemo } from "react";
import {
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  realizations,
  realizationCategories,
  type Realization,
} from "../data/realizations";

export default function RealizationsGallery() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const limit = 12;

  // Filter realizations
  const filteredRealizations = useMemo(() => {
    if (selectedCategory === null) {
      return realizations;
    }
    return realizations.filter((r) => r.categoryId === selectedCategory);
  }, [selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredRealizations.length / limit);
  const paginatedRealizations = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filteredRealizations.slice(start, start + limit);
  }, [filteredRealizations, currentPage]);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const openModal = (index: number) => {
    // Calculate index in full filtered array
    const fullIndex = (currentPage - 1) * limit + index;
    setModalIndex(fullIndex);
    setModalOpen(true);
    setScale(1);
  };

  const closeModal = () => {
    setModalOpen(false);
    setScale(1);
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setModalIndex((prev) =>
        prev > 0 ? prev - 1 : filteredRealizations.length - 1
      );
    } else {
      setModalIndex((prev) =>
        prev < filteredRealizations.length - 1 ? prev + 1 : 0
      );
    }
    setScale(1);
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!modalOpen) return;
    if (e.key === "ArrowLeft") navigateModal("prev");
    if (e.key === "ArrowRight") navigateModal("next");
    if (e.key === "Escape") closeModal();
  };

  // Add keyboard listener
  if (typeof window !== "undefined") {
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
  }

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const pages: (number | string)[] = [];
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      pages.push(1);
      let startPage = Math.max(currentPage - 1, 2);
      let endPage = Math.min(currentPage + 1, totalPages - 1);

      if (startPage > 2) pages.push("...");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);

      return pages;
    };

    return (
      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          title="Pierwsza strona"
        >
          «
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          title="Poprzednia strona"
        >
          ‹
        </button>

        {getVisiblePages().map((page, i) => (
          <button
            key={i}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            className={`w-10 h-10 rounded ${
              currentPage === page
                ? "bg-primary text-white"
                : page === "..."
                ? "bg-transparent cursor-default"
                : "bg-gray-100 hover:bg-gray-200"
            } transition-colors`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          title="Następna strona"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 rounded bg-gray-100 disabled:opacity-50 hover:bg-gray-200 transition-colors"
          title="Ostatnia strona"
        >
          »
        </button>
      </div>
    );
  };

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header and filters */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-center text-secondary mb-8">
              Nasze realizacje
            </h1>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Desktop categories */}
              <div className="hidden md:flex gap-3 flex-wrap">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Wszystkie
                </button>
                {realizationCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedCategory === category.id
                        ? "bg-primary text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Mobile filter button */}
              <button
                className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={20} />
                Filtry
              </button>
            </div>

            {/* Mobile filters */}
            {isFilterOpen && (
              <div className="md:hidden mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Wszystkie ({realizations.length})
                </button>
                {realizationCategories.map((category) => {
                  const count = realizations.filter(
                    (r) => r.categoryId === category.id
                  ).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategory === category.id
                          ? "bg-primary text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {category.name} ({count})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedRealizations.map((realization, index) => (
              <div
                key={realization.id}
                className="group cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src={realization.imageUrl}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>

          <Pagination />
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale((s) => Math.max(1, s - 0.5));
              }}
              className="text-white hover:text-gray-300 p-2"
            >
              <ZoomOut size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScale((s) => Math.min(3, s + 0.5));
              }}
              className="text-white hover:text-gray-300 p-2"
            >
              <ZoomIn size={24} />
            </button>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-300 p-2"
            >
              <X size={32} />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-full">
            {modalIndex + 1} / {filteredRealizations.length}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateModal("prev");
            }}
            className="absolute left-4 text-white hover:text-gray-300"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateModal("next");
            }}
            className="absolute right-4 text-white hover:text-gray-300"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredRealizations[modalIndex]?.imageUrl}
              alt=""
              className="max-w-full max-h-[85vh] object-contain transition-transform duration-300"
              style={{ transform: `scale(${scale})` }}
            />
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 rounded-lg overflow-x-auto max-w-[80vw]">
            {filteredRealizations
              .slice(
                Math.max(0, modalIndex - 5),
                Math.min(filteredRealizations.length, modalIndex + 6)
              )
              .map((r, i) => {
                const actualIndex = Math.max(0, modalIndex - 5) + i;
                return (
                  <button
                    key={r.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalIndex(actualIndex);
                      setScale(1);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                      actualIndex === modalIndex ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img
                      src={r.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
