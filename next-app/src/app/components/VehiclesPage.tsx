'use client';

import React, { useState } from 'react';
import FilterSortForm from './FilterSortForm';
import VehicleTable from './VehicleTable';
import Pagination from './Pagination';
import { Vehicle } from '../../models/vehicle';
import { useRouter, useSearchParams } from 'next/navigation';

interface VehiclesPageProps {
  vehicles: Vehicle[];
  manufacturers: string[];
}

const VehiclesPage = ({ vehicles, manufacturers }: VehiclesPageProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const vehiclesPerPage = 10;

  const handleFilterChange = (newFilter: { manufacturer?: string[]; type?: string; year?: string; sort?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((val) => params.append(key, val));
      } else if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  
  React.useEffect(() => {
    if (vehicles.length === 0) return;

    const manufacturer = searchParams.getAll('manufacturer');
    const type = searchParams.get('type') || '';
    const year = searchParams.get('year') || '';
    const sort = searchParams.get('sort') || '';

    let filtered = vehicles;

    if (manufacturer.length > 0) {
      filtered = filtered.filter((v) => manufacturer.includes(v.manufacturer));
    }

    if (type) filtered = filtered.filter((v) => v.type === type);
    if (year) filtered = filtered.filter((v) => v.year === parseInt(year, 10));

    if (sort) {
      const [field, order] = sort.split('-');

      if (field && field in vehicles[0]) {
        filtered = [...filtered].sort((a, b) => {
          const valueA = a[field as keyof Vehicle];
          const valueB = b[field as keyof Vehicle];

          if (typeof valueA === 'number' && typeof valueB === 'number') {
            return order === 'desc' ? valueB - valueA : valueA - valueB;
          }

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return order === 'desc'
              ? valueB.localeCompare(valueA)
              : valueA.localeCompare(valueB);
          }

          return 0;
        });
      }
    }

    setFilteredVehicles(filtered);
  }, [searchParams, vehicles]);

  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const pageFromParams = Math.min(
    Math.max(parseInt(searchParams.get('page') || '1', 10), 1),
    totalPages
  );
  const startIndex = (pageFromParams - 1) * vehiclesPerPage;
  const paginatedVehicles = filteredVehicles.slice(
    startIndex,
    startIndex + vehiclesPerPage
  );

  return (
    <div>
      <FilterSortForm
        manufacturers={manufacturers}
        minYear={Math.min(...vehicles.map((v) => v.year))}
        maxYear={Math.max(...vehicles.map((v) => v.year))}
        onFilterChange={handleFilterChange}
      />
      <VehicleTable vehicles={paginatedVehicles} />
      <Pagination
        currentPage={pageFromParams}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {filteredVehicles.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No vehicles found.</p>
      )}
    </div>
  );
};

export default VehiclesPage;
