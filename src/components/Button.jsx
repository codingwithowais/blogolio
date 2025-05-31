import React from 'react'

function Button({ children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    // responsive design

    <button
      type={type}
      {...props}
      className={`
      inline-flex items-center justify-center 
      px-4 py-2 sm:px-6 sm:py-3 rounded-lg 
      font-medium text-sm sm:text-base 
      transition duration-200 ease-in-out 
      ${bgColor} ${textColor} 
      ${className}
    `}
    >
      {children}
    </button>
  )
}

export default Button