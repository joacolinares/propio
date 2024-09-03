"use client";

import { useTranslations } from "next-intl";

interface Props {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  totalPages: number;
  goToPage: (page: number) => void;
}

function Pagination({ currentPage, goToNextPage, goToPreviousPage, totalPages, goToPage }: Props) {
  const t = useTranslations();

  // Circle rendering with conditional fill
  const renderCircle = (page: number) => (
    <button
      key={page}
      onClick={() => goToPage(page)}
      className={`text-lightslategray-200 dark:text-darkslategray-200 rounded-full w-4 h-4 border border-lightslategray-200 dark:border-darkslategray-200 ${
        currentPage === page ? "bg-white" : "bg-white opacity-10"
      }`}
    />
  );

  // Generate circles based on totalPages
  const circles = [];
  for (let page = 1; page <= totalPages; page++) {
    circles.push(renderCircle(page));
  }

  // Previous button
  const renderPreviousButton = () => (
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className={`text-lightslategray-200 dark:text-darkslategray-200 hover:text-lightslateBlue-100 dark:hover:text-lightslateBlue-100 cursor-pointer ${
        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-4 h-4 md:w-5 md:h-5">
        <path d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );

  // Next button
  const renderNextButton = () => (
    <button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className={`text-lightslategray-200 dark:text-darkslategray-200 hover:text-lightslateBlue-100 dark:hover:text-lightslateBlue-100 cursor-pointer ${
        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="w-4 h-4 md:w-5 md:h-5">
        <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );

  return (
    <div className="flex items-center justify-end space-x-2 md:space-x-4 text-[12px] text-[#A9AEB4]">
      <span className="border border-solid border-[#ffffff1a] rounded-[6px] p-2 hover:bg-[#ffffff1a]" onClick={() => goToPage(1)}>
        {t("First")}
      </span>
      {renderPreviousButton()}
      <span>
        {t("Page")} {currentPage} {t("of")} {totalPages}
      </span>
      {/* {circles} */}
      {renderNextButton()}
      <span className="border border-solid border-[#ffffff1a] rounded-[6px] p-2 hover:bg-[#ffffff1a]" onClick={() => goToPage(totalPages)}>
        {t("Last")}
      </span>
    </div>
  );
}

export default Pagination;
