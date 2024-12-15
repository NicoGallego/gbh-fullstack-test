import { getAllVehicles, getAllManufacturers } from '../utils/dataHandler';
import VehiclesPage from './components/VehiclesPage';

export default async function Home() {
  let vehicles: any[] = [];
  let manufacturers: any[] = [];
  let errorMessage = '';

  try {
    vehicles = await getAllVehicles();
    manufacturers = await getAllManufacturers();
  } catch (error) {
    errorMessage = 'There was an issue loading the vehicles and manufacturers.';
  }

  if (errorMessage) {
    return (
      <main className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{errorMessage}</h1>
          <p className="text-gray-500 mt-4">Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <VehiclesPage vehicles={vehicles} manufacturers={manufacturers} />
    </main>
  );
}

export const revalidate = 3600; 
