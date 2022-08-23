import React, { useState } from 'react'
export interface IOptionsDropdown {
  label: string
  value: string
}
interface Iprops {
  options: IOptionsDropdown[]
  value: IOptionsDropdown
  onChange: (value: IOptionsDropdown) => void
}

const DropdownComponent = (props: Iprops) => {
  const [isShowOpt, setIsShowOpt] = useState(false)
  return (
    <div className="relative">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 p-3.5  text-center inline-flex items-center h-auto "
        type="button"
        onClick={() => setIsShowOpt(true)}
      >
        {props.value.label}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isShowOpt && (
        <div
          id="dropdown"
          className="absolute z-50 w-44 right-0  bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            {props.options.map((option, index) => (
              <li
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                key={index}
                onClick={() => {
                  props.onChange(option)
                  setIsShowOpt(false)
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default DropdownComponent
