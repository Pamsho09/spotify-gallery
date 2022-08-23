import React from 'react'

interface Iprops {
  placeholder: string
  value: string
  onChange: (id: string, e: string) => void
  type?: string
  id: string
}
const InputComponent = (props: Iprops) => {
  const { value, onChange, type = 'text', placeholder, id } = props
  return (
    <>
      <input
        className="p-3.5 h-auto w-full flex-1 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg  border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        id={id}
        name={id}
        type={type}
      />
    </>
  )
}

export default InputComponent
