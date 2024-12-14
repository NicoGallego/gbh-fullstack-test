import vehicles from '../../data/vehicles';
import { Vehicle } from '../models/vehicle';

/**
 * get all vehicles.
 */
export const getAllVehicles = (): Vehicle[] => {
  return vehicles;
};

/**
 * get vehicle by id.
 * @param id - vehicle id.
 */
export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

/**
 * get all manufacturers.
 */
export const getAllManufacturers = (): string[] => {
  const manufacturers = vehicles.map(vehicle => vehicle.manufacturer);
  return Array.from(new Set(manufacturers)).sort();
};
