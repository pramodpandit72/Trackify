import React, { useState, useRef, useEffect } from 'react';

const FormDropdown = ({ 
  label, 
  icon, 
  value, 
  onChange,
  onBlur,
  name,
  options, 
  placeholder = 'Select an option',
  placeholderIcon = '✨',
  error
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

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-[#32284a] mb-2">
          {icon && <i className={`${icon} mr-2 text-[#775fab]`}></i>}
          {label}
        </label>
      )}
      
      {/* Hidden input for form */}
      <input type="hidden" name={name} value={value || ''} />
      
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={onBlur}
        className={`w-full pl-4 pr-12 py-3 bg-gray-50 border-2 rounded-xl text-left font-medium cursor-pointer transition-all duration-300 flex items-center gap-2
          ${isOpen 
            ? 'border-[#775fab] bg-white shadow-lg shadow-[#775fab]/10' 
            : 'border-gray-200 hover:border-[#775fab]/50 hover:shadow-md hover:bg-white'
          }
          ${error ? 'border-red-400' : ''}`}
      >
        {selectedOption ? (
          <>
            <span className="text-lg">{selectedOption.icon}</span>
            <span className="text-gray-800">{selectedOption.label}</span>
          </>
        ) : (
          <>
            <span className="text-lg">{placeholderIcon}</span>
            <span className="text-gray-400">{placeholder}</span>
          </>
        )}
        
        {/* Gradient Arrow */}
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#775fab] to-[#32284a] text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md
          ${isOpen ? 'rotate-180 scale-110' : 'group-hover:scale-110'}`}
        >
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className="max-h-56 overflow-y-auto py-2 custom-scrollbar">
            {/* Options */}
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#775fab]/10 hover:to-transparent
                  ${value === option.value ? 'bg-gradient-to-r from-[#775fab]/15 to-[#775fab]/5 border-l-4 border-[#775fab]' : ''}`}
              >
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm transition-all duration-200
                  ${value === option.value 
                    ? 'bg-gradient-to-br from-[#775fab] to-[#32284a] text-white scale-105' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-50'
                  }`}>
                  {option.icon}
                </span>
                <div className="flex-1 text-left">
                  <span className={`font-medium ${value === option.value ? 'text-[#775fab]' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <p className="text-xs text-gray-400 mt-0.5">{option.description}</p>
                  )}
                </div>
                {value === option.value && (
                  <div className="w-6 h-6 rounded-full bg-[#775fab] flex items-center justify-center">
                    <i className="fa-solid fa-check text-white text-xs"></i>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormDropdown;
