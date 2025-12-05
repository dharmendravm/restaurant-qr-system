import React from 'react'

export const InputFild = ({label , icon , type , name , value , onChange , placeholder}) => {
  return (
      <div>
        <label className="text-xs text-gray-300 mb-2 block">{label}</label>
        <div className="relative">
          {icon}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full pl-11 pr-3 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-orange-300/40 focus:ring-1 focus:ring-orange-400/20 transition-all duration-200 text-sm"
          />
        </div>
      </div>
  )
}
