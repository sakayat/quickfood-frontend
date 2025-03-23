# QuickFood - Restaurant Management System

QuickFood is a comprehensive restaurant management platform built with Next.js that helps restaurant owners manage their menus, track orders, and provide online food ordering services to customers.

## Features

### For Restaurant Owners

- **Dashboard Overview**: Get a quick snapshot of your business with key metrics and recent activities
- **Restaurant Management**: Add, edit, and manage restaurant locations
- **Menu Management**: Create and organize menu items with descriptions, prices, and images
- **Order Tracking**: Monitor incoming orders and update order statuses
- **Customer Management**: View customer profiles and order history

### For Customers

- **Restaurant Discovery**: Browse through available restaurants
- **Menu Browsing**: View restaurant menus with images and detailed descriptions
- **Online Ordering**: Place food orders online with ease
- **User Profiles**: Create accounts to save preferences and view order history

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **State Management**: React Context API
- **UI Components**: Custom components with Tailwind styling
- **Icons**: Lucide React
- **Authentication**: JWT with HTTP-only cookies

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Backend API service running (see API setup below)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sakayat/quickfood-frontend.git
   cd quickfood-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
   NEXT_PUBLIC_URL=http://127.0.0.1:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.


## Deployment

This Next.js application can be deployed to Vercel or any other hosting service that supports Next.js applications.

```bash
# Build for production
npm run build
# or
yarn build

# Start production server
npm run start
# or
yarn start
```

## API Backend

This frontend application requires a backend API service. The backend provides:
- User authentication and authorization
- Restaurant and menu CRUD operations
- Order processing and management
- Image storage
