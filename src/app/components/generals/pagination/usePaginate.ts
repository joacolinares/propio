"use client";
import { useEffect, useState } from "react";

export interface UsePaginateOptions<Element> {
  listElement: Element[] 
  numberByPage: number;
}
// Custom hook for pagination
export function usePaginate<Element>({
  listElement,
  numberByPage,
}: UsePaginateOptions<Element>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elementVisible, setElementVisible] = useState<Element[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  // Function to go to a specific page
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Update the visible elements when the current page changes
  useEffect(() => {
    const totalPage = Math.ceil(listElement.length / numberByPage);
    setTotalPage(totalPage);
    // Function to get the visible elements for the current page
    const elemetsVisibleByPage = () => {
      const list = listElement.slice(
        (currentPage - 1) * numberByPage,
        currentPage * numberByPage
      );
      return list;
    };
    const list = elemetsVisibleByPage();
    setElementVisible(list);
  }, [currentPage, listElement, numberByPage]);

  return {
    goToPage,
    goToPreviousPage,
    goToNextPage,
    currentPage,
    totalPages: totalPage,
    elemetsVisibleByPage: elementVisible,
  };
}
