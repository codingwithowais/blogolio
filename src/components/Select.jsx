import React, { use, useId } from 'react'


function Select({
  options,
  className,
  label,
  ...props
}, ref) {
  const id = useId();
  return (
    // responsive design

    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1 pl-1"
        >
          {label} <span className="text-red-500">*</span>
        </label>
      )}

      <select
        id={id}
        ref={ref}
        {...props}
        className={`
        w-full px-3 py-2 sm:py-2.5 
        rounded-lg bg-white text-black 
        border border-gray-300 outline-none 
        focus:ring-2 focus:ring-black focus:bg-gray-50 
        text-sm sm:text-base transition duration-200 
        ${className}
      `}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select);