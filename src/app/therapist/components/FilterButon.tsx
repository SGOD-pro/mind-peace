// FilterButton.tsx
import React from 'react';

interface FilterButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isSelected, onClick }) => (
  <li className="flex-shrink-0">
    <button
      className="therapist-filters"
      style={{
        background: isSelected ? "#95d4ce" : "#d1f5f1",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);

export default FilterButton;
