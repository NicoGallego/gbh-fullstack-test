import { Vehicle } from '../../models/vehicle';
import Link from 'next/link';

interface VehicleTableProps {
  vehicles: Vehicle[];
}

const VehicleTable = ({ vehicles }: VehicleTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
        <tr>
            <th className="w-1/5">Brand</th>
            <th className="w-1/5">Model</th>
            <th className="w-1/6">Year</th>
            <th className="w-1/6">Type</th>
            <th className="w-1/6">Price</th>
            <th className="w-1/5"></th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.manufacturer}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.type}</td>
              <td>${vehicle.price.toLocaleString()}</td>
              <td>
                <Link
                  href={`/vehicles/${vehicle.id}`}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
