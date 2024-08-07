import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CgSelect } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FliterData";

function Fliters(props) {
  const {
    categories,
    category,
    setCategory,
    language,
    setLanguage,
    year,
    setYear,
    times,
    setTimes,
    rates,
    setRates,
  } = props?.data;
  const Fliter = [
    {
      value: category,
      onChange: setCategory,
      items:
        categories?.length > 0
          ? [{ title: "All Categories" }, ...categories]
          : [{ title: "No Category Found" }],
    },
    {
      value: language,
      onChange: setLanguage,
      items: LanguageData,
    },
    {
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 bg-dry border text-dryGray border-gray-800 grid md:grid-cols-5 grid-cols-2 lg:gap-12 gap-2 rounded p-6 ">
      {Fliter.map((item, index) => (
        <Listbox key={index} value={item.value} onChange={item.onChange}>
          <div className="relative">
            <Listbox.Button className="relative border border-gray-800 bg-main w-full text-white rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
              <span className="block truncate">{item.value.title}</span>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none  ">
                <CgSelect className="w-5 h-5" aria-hidden="true" />
              </div>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transitin ease-in duration-100 "
              leaveFrom="opacity-100 "
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 z-10 w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {item.items.map((iterm, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-subMain text-white" : "text-main"
                      }`
                    }
                    value={iterm}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncated ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {iterm.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <FaCheck className="w-3 h-3" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      ))}
    </div>
  );
}

export default Fliters;
