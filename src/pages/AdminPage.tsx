import React, { useState } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { useAdmin } from '../context/AdminContext';
import { Property } from '../types';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import PropertyForm from '../components/admin/PropertyForm';

const AdminPage: React.FC = () => {
  const { properties, deleteProperty } = usePropertyContext();
  const { admin } = useAdmin();
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (property: Property) => {
    setEditingProperty(property);
    setIsAddingProperty(false);
  };

  const handleAddNewClick = () => {
    setIsAddingProperty(true);
    setEditingProperty(null);
  };

  const handleDeleteClick = (propertyId: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(propertyId);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="pt-20 mb-20">
      <div className="bg-blue-900 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Property Management
          </h1>
          <p className="text-blue-100">
            Welcome back, {admin?.name || 'Admin'}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  {admin?.picture ? (
                    <img 
                      src={admin.picture} 
                      alt={admin?.name || 'Profile'} 
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span className="text-blue-800 text-xl font-semibold">
                      {(admin?.name || 'A')[0].toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{admin?.name || 'Admin'}</h2>
                  <p className="text-sm text-gray-500">{admin?.email}</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <a href="#" className="block py-2 px-4 rounded-md bg-blue-50 text-blue-800 font-medium">
                  Properties
                </a>
                <a href="#" className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Bookings
                </a>
                <a href="#" className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Messages
                </a>
                <a href="#" className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Reviews
                </a>
                <a href="#" className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Analytics
                </a>
                <a href="#" className="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                  Settings
                </a>
              </nav>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
                  <div className="text-sm text-gray-600">
                    <p className="flex justify-between py-1">
                      <span>Total Properties:</span>
                      <span className="font-medium">{properties.length}</span>
                    </p>
                    <p className="flex justify-between py-1">
                      <span>Featured:</span>
                      <span className="font-medium">{properties.filter(p => p.featured).length}</span>
                    </p>
                    <p className="flex justify-between py-1">
                      <span>Active Bookings:</span>
                      <span className="font-medium">12</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {isAddingProperty || editingProperty ? (
              <PropertyForm 
                property={editingProperty} 
                onCancel={() => {
                  setIsAddingProperty(false);
                  setEditingProperty(null);
                }}
              />
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 md:mb-0">
                    Properties
                  </h2>
                  <Button
                    variant="primary"
                    onClick={handleAddNewClick}
                    icon={<Plus size={16} />}
                  >
                    Add New Property
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md mb-6">
                  <div className="p-4 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Property
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredProperties.map((property) => (
                          <tr key={property.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0">
                                  <img
                                    src={property.images[0]}
                                    alt={property.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{property.name}</div>
                                  <div className="text-sm text-gray-500">{property.propertyType}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{property.location.city}</div>
                              <div className="text-sm text-gray-500">{property.location.country}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatCurrency(property.price.perNight, property.price.currency)} / night
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                property.featured
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {property.featured ? 'Featured' : 'Active'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => window.open(`/properties/${property.id}`, '_blank')}
                                >
                                  <Eye size={16} />
                                </button>
                                <button
                                  className="text-amber-600 hover:text-amber-900"
                                  onClick={() => handleEditClick(property)}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteClick(property.id)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredProperties.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No properties found. Add a new property or adjust your search.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;