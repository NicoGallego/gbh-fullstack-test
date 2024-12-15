import vehicles from '../../data/vehicles'; 
import { Vehicle } from '../models/vehicle'; 

/**
 * Fetch all vehicles, sorted by manufacturer.
 * @returns {Promise<Vehicle[]>} A promise resolving with all vehicles sorted alphabetically.
 */
export const getAllVehicles = async (): Promise<Vehicle[]> => {
  try {
    return vehicles.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    throw new Error('Failed to fetch vehicles. Please try again later.');
  }
};

/**
 * Fetch a specific vehicle by its ID.
 * @param {string} id - The ID of the vehicle to fetch.
 * @returns {Promise<Vehicle | null>} A promise resolving with the vehicle, or null if not found.
 */
export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    const vehicle = vehicles.find((v) => v.id === id);
    if (!vehicle) {
      return null;
    }
    return vehicle;
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    return null; 
  }
};

/**
 * Fetch a list of unique manufacturers, sorted alphabetically.
 * @returns {Promise<string[]>} A promise resolving with sorted manufacturers.
 */
export const getAllManufacturers = async (): Promise<string[]> => {
  try {
    return [...new Set(vehicles.map((v) => v.manufacturer))].sort(
      (a, b) => a.localeCompare(b)
    );
  } catch (error) {
    console.error('Error fetching manufacturers:', error);
    throw new Error('Failed to fetch manufacturers. Please try again later.');
  }
};
