'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Vehicle } from '../../models/vehicle';
import { getAllVehicles, getAllManufacturers } from '../../utils/dataHandler';
import FilterSortForm from './FilterSortForm';
import VehicleTable from './VehicleTable';
import Pagination from './Pagination';

const VehiclesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [minYear, setMinYear] = useState<number>(0);
  const [maxYear, setMaxYear] = useState<number>(0);

  const vehiclesPerPage = 10;

  // Récupération initiale des véhicules et fabricants
  useEffect(() => {
    const allVehicles = getAllVehicles();
    const allManufacturers = getAllManufacturers();

    const years = allVehicles.map((v) => v.year);
    setMinYear(Math.min(...years));
    setMaxYear(Math.max(...years));

    setVehicles(allVehicles);
    setManufacturers(allManufacturers);
    setFilteredVehicles(allVehicles);
  }, []);

  // Filtrage des véhicules à chaque changement de `searchParams`
  useEffect(() => {
    if (vehicles.length === 0) return;

    const manufacturer = searchParams.getAll('manufacturer'); // Plusieurs fabricants
    const type = searchParams.get('type') || '';
    const year = searchParams.get('year') || '';
    const sort = searchParams.get('sort') || '';

    let filtered = vehicles;

    // Appliquer les filtres
    if (manufacturer.length > 0) {
      filtered = filtered.filter((v) => manufacturer.includes(v.manufacturer));
    }

    if (type) filtered = filtered.filter((v) => v.type === type);
    if (year) filtered = filtered.filter((v) => v.year === parseInt(year, 10));

    // Appliquer le tri
    if (sort) {
      const [field, order] = sort.split('-');

      if (field && (field in vehicles[0])) {
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

  // Gestion des filtres et pagination
  const handleFilterChange = (newFilter: { [key: string]: any }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.delete(key); // Supprimer les anciennes valeurs
        value.forEach((val) => params.append(key, val));
      } else if (value) {
        params.set(key, value); // Définir la nouvelle valeur
      } else {
        params.delete(key); // Supprimer la clé si aucune valeur
      }
    });

    // Réinitialiser la pagination à la première page
    params.set('page', '1');

    // Mettre à jour l'URL avec les nouveaux filtres
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString()); // Mettre à jour la page
    router.push(`/?${params.toString()}`);
  };

  // Gestion de la pagination
  const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
  const currentPage = Math.min(
    Math.max(parseInt(searchParams.get('page') || '1', 10), 1),
    totalPages
  );
  const startIndex = (currentPage - 1) * vehiclesPerPage;
  const paginatedVehicles = filteredVehicles.slice(
    startIndex,
    startIndex + vehiclesPerPage
  );

  return (
    <div>
      <FilterSortForm
        manufacturers={manufacturers}
        minYear={minYear}
        maxYear={maxYear}
        onFilterChange={handleFilterChange}
      />
      <VehicleTable vehicles={paginatedVehicles} />
      <Pagination
        currentPage={currentPage}
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
