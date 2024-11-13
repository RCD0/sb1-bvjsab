import React, { useState, useMemo } from 'react';
import { ChevronRight, Filter, Search, Settings, Share, Trash, Plus } from 'lucide-react';

const steps = ['Select Products', 'Product Details', 'Presentation Settings'];

export default function CreateCatalog() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    material: '',
    color: '',
  });

  const products = [
    {
      id: 1,
      name: 'Executive Desk',
      category: 'Office Furniture',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80',
      material: 'Wood',
      color: 'Brown',
      price: 599.99,
    },
    {
      id: 2,
      name: 'Ergonomic Chair',
      category: 'Office Furniture',
      image: 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?auto=format&fit=crop&w=300&q=80',
      material: 'Mesh',
      color: 'Black',
      price: 299.99,
    },
  ];

  const categories = [...new Set(products.map(p => p.category))];
  const materials = [...new Set(products.map(p => p.material))];
  const colors = [...new Set(products.map(p => p.color))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesMaterial = !filters.material || product.material === filters.material;
      const matchesColor = !filters.color || product.color === filters.color;
      
      return matchesSearch && matchesCategory && matchesMaterial && matchesColor;
    });
  }, [searchTerm, filters]);

  const handleProductSelect = (productId: number) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const handleGenerateCatalog = () => {
    const catalogData = {
      products: products.filter(p => selectedProducts.includes(p.id)),
      settings: {
        requireEmailVerification: document.getElementById('require-email')?.checked,
        expiryDate: (document.getElementById('expiry-date') as HTMLInputElement)?.value,
        password: (document.getElementById('link-password') as HTMLInputElement)?.value,
      }
    };
    
    // Here you would typically send this to your backend
    console.log('Generating catalog with data:', catalogData);
    alert('Catalog generated successfully! Ready to share with your customers.');
  };

  const renderFilters = () => (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h4 className="font-medium text-gray-700">Filters</h4>
      <div className="space-y-3">
        <select
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select
          value={filters.material}
          onChange={(e) => setFilters(prev => ({ ...prev, material: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Materials</option>
          {materials.map(material => (
            <option key={material} value={material}>{material}</option>
          ))}
        </select>
        <select
          value={filters.color}
          onChange={(e) => setFilters(prev => ({ ...prev, color: e.target.value }))}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Colors</option>
          {colors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      </div>
      <button
        onClick={() => setFilters({ category: '', material: '', color: '' })}
        className="w-full mt-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Clear Filters
      </button>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button 
                className="flex items-center px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => document.getElementById('filters')?.classList.toggle('hidden')}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${
                        selectedProducts.includes(product.id)
                          ? 'ring-2 ring-indigo-500'
                          : ''
                      }`}
                      onClick={() => handleProductSelect(product.id)}
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
                        <p className="mt-2 text-lg font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="filters" className="w-64 hidden lg:block">
                {renderFilters()}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Color
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products
                    .filter((p) => selectedProducts.includes(p.id))
                    .map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            defaultValue={product.price}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            defaultValue={product.material}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            defaultValue={product.color}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Catalog Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Link Expiry Date
                  </label>
                  <input
                    id="expiry-date"
                    type="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Link Password
                  </label>
                  <input
                    id="link-password"
                    type="password"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    id="require-email"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="require-email"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Require email verification
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Catalog</h1>
        <p className="mt-2 text-gray-600">
          Create and share your product catalog in three simple steps
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`flex items-center ${
                  index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= currentStep ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}
                >
                  {index < currentStep ? (
                    <Settings className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {renderStepContent()}

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
            currentStep === 0 ? 'invisible' : ''
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            currentStep === steps.length - 1
              ? handleGenerateCatalog()
              : setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
          }
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {currentStep === steps.length - 1 ? (
            <div className="flex items-center">
              <Share className="h-5 w-5 mr-2" />
              Generate Catalog
            </div>
          ) : (
            'Next'
          )}
        </button>
      </div>
    </div>
  );
}