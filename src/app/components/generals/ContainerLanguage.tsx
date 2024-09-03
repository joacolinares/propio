"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { setCookieClientSide } from "@/lib/utils";
import LanguajeSVG from "@/assets/icons/LanguajeIcon";
import ModalComponent from "./ModalComponent";

const ContainerLanguage = () => {
  const locale = useLocale();
  const submenuRef = useRef<null | HTMLDivElement>(null);
  const [isOpenMenuLanguage, setIsOpenMenuLanguage] = useState<boolean>(false);
  const [langSelected, setLangSelected] = useState(locale);

  // funcion  para cerrar el menu de idiomas cuando se haga click fuera de el
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsOpenMenuLanguage(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpenMenuLanguage]);

  function openMenuLanguage() {
    setIsOpenMenuLanguage(!isOpenMenuLanguage);
  }

  function changeLanguage(lang: string) {
    setCookieClientSide("NEXT_LOCALE", lang);
    location.reload();
    setLangSelected(locale);
  }

  // console.log(i18n)
  const languageList = [
    {
      name: "Arabic",
      type: "ar",
    },
    {
      name: "Chinese",
      type: "zh",
    },
    {
      name: "English",
      type: "en",
    },
    {
      name: "Español",
      type: "es",
    },
    {
      name: "French",
      type: "fr",
    },
    {
      name: "Hindi",
      type: "hi",
    },
    {
      name: "Japanese",
      type: "ja",
    },
    {
      name: "Korean",
      type: "ko",
    },
    {
      name: "Persian",
      type: "fa",
    },
    {
      name: "Portuguese",
      type: "pt",
    },
    {
      name: "Russian",
      type: "ru",
    },
    {
      name: "Thai",
      type: "th",
    },
    {
      name: "Turkish",
      type: "tr",
    },
    {
      name: "Urdu",
      type: "ur",
    },
    {
      name: "Vietnamese",
      type: "vi",
    },
    {
      name: "Italian",
      type: "it",
    },
  ];

  let ImagenesObj = {
    es: "ES",
    en: "EN",
    zh: "CH",
    ru: "RU",
    ar: "AR",
  };

  return (
    <div className="container-idiomas relative cursor-pointer" ref={submenuRef}>
      <div onClick={openMenuLanguage}>
        <LanguajeSVG stroke="#fff" width={24} height={24} />
      </div>
      <ModalComponent
        isOpen={isOpenMenuLanguage}
        setIsOpen={setIsOpenMenuLanguage}
        classBody="bg-white w-[280px] h-[280px] rounded-[20px] shadow-lg overflow-y-scroll"
      >
        {isOpenMenuLanguage ? (
          <ul
            className="absolute z-10 mt-1 w-full rounded-[20px] bg-white py-1 px-0 text-base shadow-lg sm:text-sm list-none
        font-normal divide-y divide-gray-100"
          >
            {languageList
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <li
                  className="relative cursor-default select-none px-6 pt-6 pb-4 hover:cursor-pointer hover:bg-gray-200 w-full"
                  key={item.type}
                  onClick={() => {
                    changeLanguage(item.type);
                    openMenuLanguage();
                  }}
                >
                  <div>
                    <span className="text-[16px] block">{item.name}</span>
                  </div>

                  {item.type === langSelected ? (
                    <span className=" bg-[#7A2FF4] absolute top-1/2 right-6 transform -translate-y-1/2 rounded-full  px-1 py-1">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#fff">
                        <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                      </svg>
                    </span>
                  ) : (
                    ""
                  )}
                </li>
              ))}
          </ul>
        ) : (
          ""
        )}
      </ModalComponent>
    </div>
  );
};

export default ContainerLanguage;
