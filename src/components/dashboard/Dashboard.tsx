import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Executive Desk',
    category: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80',
    material: 'Wood',
    color: 'Brown',
  },
  {
    id: 2,
    name: 'Ergonomic Chair',
    category: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?auto=format&fit=crop&w=300&q=80',
    material: 'Mesh',
    color: 'Black',
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
        <p className="mt-2 text-gray-600">
          View and manage your digitized products
        </p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Link
          to="/create-catalog"
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {product.material} • {product.color}
                </span>
                <button className="flex items-center text-indigo-600 hover:text-indigo-700">
                  <FileText className="h-4 w-4 mr-1" />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}