import React, { use, useId } from 'react'

const Input = React.forwardRef(function ({
  label,
  type = "text",
  className = "",
  required,
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
      <input
        type={type}
        id={id}
        ref={ref}
        className={`
        w-full px-3 py-2 sm:py-2.5 rounded-lg border border-gray-300 
        text-black bg-white focus:bg-gray-50 outline-none 
        transition duration-200 ease-in-out 
        text-sm sm:text-base
        ${className}
      `}
        {...props}
      />
    </div>
  )
}


)



export default Input
