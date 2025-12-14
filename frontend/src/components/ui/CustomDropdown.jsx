import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ 
  label, 
  icon, 
  value, 
  onChange, 
  options, 
  placeholder = 'Select an option',
  placeholderIcon = '✨'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get selected option details
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef}>
      {label && (
        <label className="block text-xs font-semibold text-[#443049] dark:text-gray-300 mb-1.5">
          {icon && <i className={`${icon} mr-1.5 text-[#775fab] text-xs`}></i>}
          {label}
        </label>
      )}
      
      {/* Dropdown Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-xl text-left text-sm font-medium cursor-pointer transition-all duration-300 flex items-center gap-2
            ${isOpen 
              ? 'border-[#775fab] shadow-lg shadow-[#775fab]/10' 
              : 'border-gray-200 dark:border-gray-600 hover:border-[#775fab]/50 hover:shadow-md'
            }`}
        >
          {selectedOption ? (
            <>
              <span className="text-sm">{selectedOption.icon}</span>
              <span className="text-gray-700 dark:text-gray-200">{selectedOption.label}</span>
            </>
          ) : (
            <>
              <span className="text-sm">{placeholderIcon}</span>
              <span className="text-gray-500">{placeholder}</span>
            </>
          )}
        </button>
        
        {/* Gradient Arrow - positioned relative to button */}
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#775fab] to-[#32284a] text-white w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shadow-md pointer-events-none
          ${isOpen ? 'rotate-180 scale-110' : ''}`}
        >
          <i className="fa-solid fa-chevron-down text-[10px]"></i>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-black/30 overflow-hidden">
            <div className="max-h-56 overflow-y-auto py-1.5">
              {/* All/Default Option */}
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 flex items-center gap-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#775fab]/10 hover:to-transparent
                  ${value === '' ? 'bg-gradient-to-r from-[#775fab]/15 to-[#775fab]/5 border-l-3 border-[#775fab]' : ''}`}
              >
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-sm shadow-sm">
                  {placeholderIcon}
                </span>
                <div className="flex-1 text-left">
                  <span className={`text-sm font-medium ${value === '' ? 'text-[#775fab]' : 'text-gray-700 dark:text-gray-200'}`}>
                    {placeholder}
                  </span>
                </div>
                {value === '' && (
                  <i className="fa-solid fa-check text-[#775fab] text-xs"></i>
                )}
              </button>

              {/* Options */}
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3 py-2 flex items-center gap-2 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#775fab]/10 hover:to-transparent
                    ${value === option.value ? 'bg-gradient-to-r from-[#775fab]/15 to-[#775fab]/5 border-l-3 border-[#775fab]' : ''}`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shadow-sm
                    ${value === option.value 
                      ? 'bg-gradient-to-br from-[#775fab] to-[#32284a] text-white' 
                      : 'bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800'
                    }`}>
                    {option.icon}
                  </span>
                  <div className="flex-1 text-left">
                    <span className={`text-sm font-medium ${value === option.value ? 'text-[#775fab]' : 'text-gray-700 dark:text-gray-200'}`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <p className="text-[11px] text-gray-400 mt-0.5">{option.description}</p>
                    )}
                  </div>
                  {value === option.value && (
                    <i className="fa-solid fa-check text-[#775fab] text-xs"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
