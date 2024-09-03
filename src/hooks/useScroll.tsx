import { useEffect, useState } from "react";

interface Props {
  VIEW_ELEMENTS: number;
  numberOfElement: number;
  idElement: string;
}

const useScroll = ({ VIEW_ELEMENTS, numberOfElement, idElement }: Props) => {
  const [currentElement, setCurrentElement] = useState(0);

  useEffect(() => {
    const scrollElement = document.getElementById(idElement);

    if (scrollElement) {
      const firstChild = scrollElement.firstChild as HTMLElement;

      if (firstChild) {
        const widthFirstChild = firstChild.offsetWidth;
        const styles = window.getComputedStyle(firstChild);
        const marginElement = Number(styles.marginRight.replace("px", "")) + Number(styles.marginLeft.replace("px", ""));
        const newWidth = `${(widthFirstChild + marginElement) * VIEW_ELEMENTS}px`;
        scrollElement.style.width = newWidth;

        const moveLeft = `${(widthFirstChild + marginElement) * currentElement}`;
        scrollElement.scrollTo({
          left: Number(moveLeft),
          behavior: "smooth",
        });
        // console.log({
        //   scrollElement,
        //   firstChild,
        //   widthFirstChild,
        //   marginElement,
        //   newWidth,
        //   moveLeft,
        // });
      }
    }
  }, [currentElement, VIEW_ELEMENTS, numberOfElement, idElement]);

  function siguientes(amount: number) {
    if (currentElement + amount < numberOfElement) {
      setCurrentElement(currentElement + VIEW_ELEMENTS);
    }
  }

  function anteriores(amount: number) {
    if (currentElement - amount >= 0) {
      setCurrentElement(currentElement - VIEW_ELEMENTS);
    }
  }

  return {
    siguientes,
    anteriores,
    currentElement,
  };
};

export default useScroll;
