'use client';

import { useState, useRef, useEffect } from 'react';
import { VehicleType } from '../../models/vehicle';
import capitalize from 'lodash/capitalize';

interface FilterSortFormProps {
  manufacturers: string[];
  minYear: number;
  maxYear: number;
  onFilterChange: (filters: {
    manufacturer?: string[];
    type?: string;
    year?: string;
    sort?: string;
  }) => void;
}

const FilterSortForm = ({
  manufacturers,
  minYear,
  maxYear,
  onFilterChange,
}: FilterSortFormProps) => {
  const [year, setYear] = useState<string>('');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleManufacturerChange = (manufacturer: string) => {
    const updatedManufacturers = selectedManufacturers.includes(manufacturer)
      ? selectedManufacturers.filter((item) => item !== manufacturer)
      : [...selectedManufacturers, manufacturer];

    setSelectedManufacturers(updatedManufacturers);
    onFilterChange({ manufacturer: updatedManufacturers });
  };

  const clearManufacturerFilter = () => {
    setSelectedManufacturers([]);
    onFilterChange({ manufacturer: [] });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'year') {
      setYear(value);
    }

    onFilterChange({
      [name]: value || undefined,
    });
  };

  const clearYearFilter = () => {
    setYear('');
    onFilterChange({ year: undefined });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div className="form-control w-full relative" ref={dropdownRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="input input-bordered w-full text-left truncate"
          >
            {selectedManufacturers.length > 0
              ? selectedManufacturers.join(', ')
              : 'All Brands'}
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
              <div className="p-2 border-b">
                <button
                  type="button"
                  onClick={clearManufacturerFilter}
                  className="w-full flex items-center justify-center py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-500 hover:text-gray-800"
                >
                  Clear All
                </button>
              </div>
              {manufacturers.map((manufacturer) => (
                <label
                  key={manufacturer}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={selectedManufacturers.includes(manufacturer)}
                    onChange={() => handleManufacturerChange(manufacturer)}
                    className="form-checkbox mr-2"
                  />
                  {manufacturer}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-control w-full">
        <select
          name="type"
          onChange={handleFilterChange}
          className="select select-bordered w-full"
        >
          <option value="">All Types</option>
          {Object.values(VehicleType).map((type) => (
            <option key={type} value={type}>
              {capitalize(type)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control w-full relative">
        <div className="relative">
          <input
            type="number"
            name="year"
            value={year}
            placeholder="Year"
            onChange={handleFilterChange}
            className="input input-bordered w-full pr-6"
            min={minYear}
            max={maxYear}
          />
          {year && (
            <button
              type="button"
              onClick={clearYearFilter}
              className="absolute right-10 top-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="form-control w-full">
        <select
          name="sort"
          onChange={handleFilterChange}
          className="select select-bordered w-full"
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="year-asc">Year: Oldest First</option>
          <option value="year-desc">Year: Newest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortForm;
