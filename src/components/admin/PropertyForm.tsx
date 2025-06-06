import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { usePropertyContext } from '../../context/PropertyContext';
import { Property } from '../../types';
import Button from '../ui/Button';

interface PropertyFormProps {
  property?: Property | null;
  onCancel: () => void;
}

const DEFAULT_PROPERTY: Property = {
  id: '',
  name: '',
  location: {
    city: '',
    country: '',
    address: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  price: {
    perNight: 0,
    currency: 'USD'
  },
  rating: 0,
  bedrooms: 1,
  bathrooms: 1,
  capacity: 2,
  size: {
    value: 0,
    unit: 'sq ft'
  },
  description: '',
  shortDescription: '',
  amenities: [],
  images: [],
  propertyType: 'apartment'
};

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onCancel }) => {
  const { addProperty, updateProperty } = usePropertyContext();
  const [formData, setFormData] = useState<Property>(DEFAULT_PROPERTY);
  const [newAmenity, setNewAmenity] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (property) {
      setFormData(property);
    } else {
      // Generate a valid UUID for new properties
      setFormData({
        ...DEFAULT_PROPERTY,
        id: uuidv4()
      });
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof Property],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof Property],
          [child]: parseFloat(value)
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    }
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() !== '' && !formData.amenities.includes(newAmenity.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()]
      });
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index)
    });
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '' && !formData.images.includes(newImageUrl.trim())) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()]
      });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.location.city.trim()) newErrors['location.city'] = 'City is required';
    if (!formData.location.country.trim()) newErrors['location.country'] = 'Country is required';
    if (formData.price.perNight <= 0) newErrors['price.perNight'] = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (property) {
        await updateProperty(property.id, formData);
      } else {
        await addProperty(formData);
      }
      onCancel();
    } catch (error) {
      console.error('Error saving property:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {property ? 'Edit Property' : 'Add New Property'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-md shadow-sm ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type *
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="cottage">Cottage</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location.address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  id="location.address"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              
              <div>
                <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="location.city"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className={`w-full rounded-md shadow-sm ${errors['location.city'] ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors['location.city'] && <p className="mt-1 text-sm text-red-600">{errors['location.city']}</p>}
              </div>
              
              <div>
                <label htmlFor="location.country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  id="location.country"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className={`w-full rounded-md shadow-sm ${errors['location.country'] ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors['location.country'] && <p className="mt-1 text-sm text-red-600">{errors['location.country']}</p>}
              </div>
              
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="location.coordinates.lat" className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    id="location.coordinates.lat"
                    name="location.coordinates.lat"
                    value={formData.location.coordinates.lat}
                    onChange={handleNumberChange}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div className="w-1/2">
                  <label htmlFor="location.coordinates.lng" className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.000001"
                    id="location.coordinates.lng"
                    name="location.coordinates.lng"
                    value={formData.location.coordinates.lng}
                    onChange={handleNumberChange}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price.perNight" className="block text-sm font-medium text-gray-700 mb-1">
                  Price per Night *
                </label>
                <div className="flex">
                  <select
                    id="price.currency"
                    name="price.currency"
                    value={formData.price.currency}
                    onChange={handleChange}
                    className="rounded-l-md border-gray-300 shadow-sm"
                  >
                    <option value="USD">$</option>
                    <option value="EUR">€</option>
                    <option value="GBP">£</option>
                  </select>
                  <input
                    type="number"
                    id="price.perNight"
                    name="price.perNight"
                    value={formData.price.perNight}
                    onChange={handleNumberChange}
                    className={`flex-1 rounded-r-md ${errors['price.perNight'] ? 'border-red-300' : 'border-gray-300'}`}
                  />
                </div>
                {errors['price.perNight'] && <p className="mt-1 text-sm text-red-600">{errors['price.perNight']}</p>}
              </div>
              
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleNumberChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  min="0"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={handleNumberChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Guest Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min="1"
                  value={formData.capacity}
                  onChange={handleNumberChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="size.value" className="block text-sm font-medium text-gray-700 mb-1">
                    Size
                  </label>
                  <input
                    type="number"
                    id="size.value"
                    name="size.value"
                    min="0"
                    value={formData.size.value}
                    onChange={handleNumberChange}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                
                <div className="w-1/2">
                  <label htmlFor="size.unit" className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    id="size.unit"
                    name="size.unit"
                    value={formData.size.unit}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="sq ft">sq ft</option>
                    <option value="sq m">sq m</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleNumberChange}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className={`w-full rounded-md shadow-sm ${errors.shortDescription ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.shortDescription && <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full rounded-md shadow-sm ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add an amenity..."
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddAmenity}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
                    <span className="text-sm text-gray-800">{amenity}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveAmenity(index)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {formData.amenities.length === 0 && (
                  <p className="text-sm text-gray-500 italic">No amenities added yet</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Images</h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Add image URL..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className={`flex-1 rounded-md shadow-sm ${errors.images ? 'border-red-300' : 'border-gray-300'}`}
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddImage}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
              </div>
              {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property image ${index + 1}`}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                ))}
                {formData.images.length === 0 && (
                  <p className="text-sm text-gray-500 italic col-span-4">No images added yet</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Featured */}
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={!!formData.featured}
                onChange={() => setFormData({ ...formData, featured: !formData.featured })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                Featured Property
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">Featured properties appear on the homepage</p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {property ? 'Update Property' : 'Create Property'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;