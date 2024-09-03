"use client";
import React from "react";

interface Props {
  openAndClose: () => void;
  listSelect: string[];
  filterBy: string;
  selectedSingle: (state: string) => void;
  isOpenList: boolean;
  textView: string;
  styles?: string;
  id?: string;
}

const SelectBtn = ({
  textView,
  isOpenList,
  filterBy,
  listSelect,
  openAndClose,
  selectedSingle,
  styles,
  id,
}: Props) => {
  console.log({ id });
  return (
    <div className="relative" id={id}>
      <p className="my-1 textThemeOne">{textView}</p>
      <button className={`${styles}`} onClick={() => openAndClose()}>
        <div className="flex justify-between items-center w-full px-3">
          <p>{filterBy}</p>
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className='stroke="text-black hover:text-indigo-100"'
          >
            <path
              d="M1 1L4 4L7 1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
      {isOpenList ? (
        <ul
          className="
        absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 px-0 text-base shadow-lg sm:text-sm list-none
        font-normal divide-y divide-gray-100   dark:divide-gray-600
        "
        >
          {listSelect.map((item) => (
            <li
              className="textThemeOne relative cursor-default select-none py-2 hover:cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
              key={item}
              onClick={() => {
                selectedSingle(item);
                openAndClose();
              }}
            >
              <div className="fontSize1">
                <span className="font-normal ml-3 block">{item}</span>
              </div>

              {item === filterBy ? (
                <span className="text-indigo-600 dark:text-blue-500 absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
    </div>
  );
};

export default SelectBtn;
