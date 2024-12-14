import { getVehicleById } from '../../../utils/dataHandler';
import capitalize from 'lodash/capitalize';
import Link from 'next/link';

interface VehicleDetailsProps {
  params: { id: string };
}

const VehicleDetails = async ({ params }: VehicleDetailsProps) => {
  const vehicleId = params.id;

  // Récupération des données du véhicule
  const vehicle = await getVehicleById(vehicleId);

  // Si le véhicule n'existe pas
  if (!vehicle) {
    return (
        <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">Vehicle Not Found</h1>
        <p className="text-gray-500 mt-4">
          Sorry, we couldn't find the vehicle you're looking for.
        </p>
        <Link href="/">
          <button className="btn btn-primary mt-4">Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="card w-full max-w-3xl bg-base-100 shadow-xl">
        <figure>
          <img
            src={`/images/generic_${vehicle.type.toLowerCase()}.jpg`}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            className="rounded-t-lg object-cover h-auto w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold">
            {`${vehicle.manufacturer} ${vehicle.model}`}
          </h2>
          <p className="text-gray-600">{vehicle.description}</p>
          <div className="divider"></div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Year:</strong> {vehicle.year}
              </p>
              <p>
                <strong>Type:</strong> {capitalize(vehicle.type)}
              </p>
              <p>
                <strong>Fuel Type:</strong> {capitalize(vehicle.fuelType)}
              </p>
              <p>
                <strong>Features:</strong> {vehicle.features.join(' | ')}
              </p>
            </div>
            <div>
              <p>
                <strong>Price:</strong> ${vehicle.price.toLocaleString()}
              </p>
              <p>
                <strong>Transmission:</strong> {vehicle.transmission}
              </p>
              <p>
                <strong>Mileage:</strong> {vehicle.mileage?.toLocaleString() || 'N/A'} km
              </p>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end p-4">
          <Link href="/">
            <button className="btn btn-primary">Back to Vehicles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
