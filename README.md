# GBH Technical Test

[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

# Vehicle Management Application

This project is a simple **Vehicle Management System** built using **Next.js** and **TailwindCSS**. The app allows users to view a list of vehicles, filter them based on various parameters (such as manufacturer, type, year, etc.), and see detailed information about each vehicle.

## Features

- **View Vehicle List**: Display all available vehicles.
- **Filter and Sort Vehicles**: Users can filter vehicles by manufacturer, type, and year, and sort them by price or year.
- **Responsive Design**: Optimized for both desktop and mobile views.
- **Detailed Vehicle Information**: Users can view detailed information about a vehicle, including its price, mileage, and features.

## Technologies Used

- **Next.js** 
- **TailwindCSS + DaisyUI**
- **TypeScript**


## Getting Started

Follow these steps to get your development environment set up.

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/NicoGallego/gbh-fullstack-test.git

   cd gbh-fullstack-test
  ```

2. Install dependencies:

```bash
  If you are using npm:

  npm install

  If you are using yarn:

  yarn install
  ```

3. Run the development server:

  ```bash
  If you are using npm:
  npm run dev
  If you are using yarn:
  yarn dev
  ```

#### Open your browser and go to http://localhost:3000 to see the app in action.

3. Important Files:

/src/app/vehicles/[id]/page.tsx: Page displaying detailed information of a specific vehicle.
/src/app/vehicles/page.tsx: Page displaying the list of vehicles with sorting and filtering capabilities.
/src/utils/dataHandler.ts: Contains functions for fetching and manipulating vehicle data.

4. Usage
#### Vehicle List Page
On the main page, you can see the list of available vehicles. You can filter them by manufacturer, type, and year, and sort the list by price or year.

#### Vehicle Detail Page
Clicking on any vehicle will redirect you to the vehicle details page, where you can see additional information such as price, mileage, fuel type, and features.
