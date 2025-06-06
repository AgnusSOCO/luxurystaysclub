import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Star, 
  Bed, 
  Bath, 
  Users, 
  Home, 
  Share2, 
  Heart,
  Check,
  ArrowLeft
} from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import Button from '../components/ui/Button';
import GoogleMap from '../components/maps/GoogleMap';
import PropertyBookingWidget from '../components/booking/PropertyBookingWidget';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById, properties } = usePropertyContext();
  const [property, setProperty] = useState(getPropertyById(id || ''));
  const [mainImage, setMainImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (property) {
      setMainImage(property.images[0]);
      setIsLoading(false);
    }
  }, [property]);

  // Get related properties based on location and type
  const getRelatedProperties = () => {
    if (!property) return [];
    
    return properties
      .filter(p => 
        p.id !== property.id && 
        (p.location.city === property.location.city || p.propertyType === property.propertyType)
      )
      .slice(0, 3);
  };

  if (isLoading) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 max-w-md mx-auto mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 max-w-sm mx-auto rounded"></div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-20 container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Not Found</h2>
        <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/properties">
          <Button variant="primary">Browse All Properties</Button>
        </Link>
      </div>
    );
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const relatedProperties = getRelatedProperties();

  return (
    <div className="pt-20 pb-16">
      {/* Property Header */}
      <div className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Link to="/properties" className="flex items-center hover:text-blue-800 transition-colors">
                  <ArrowLeft size={16} className="mr-1" />
                  Back to properties
                </Link>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{property.name}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={16} className="mr-1" />
                <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full mr-4">
                  <Star size={14} className="fill-blue-800 mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="ml-1 text-blue-800/70">Exceptional</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mr-4">
                  <Bed size={16} className="mr-1" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mr-4">
                  <Bath size={16} className="mr-1" />
                  <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users size={16} className="mr-1" />
                  <span>Up to {property.capacity} Guests</span>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-6 md:mt-0 space-x-3">
              <button 
                className="flex items-center text-gray-600 hover:text-blue-800 transition-colors"
              >
                <Share2 size={18} className="mr-1" />
                <span>Share</span>
              </button>
              <button 
                className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
              >
                <Heart size={18} className="mr-1" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="w-full h-96 md:h-[600px] overflow-hidden rounded-lg">
              <img 
                src={mainImage} 
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {property.images.slice(0, 4).map((img, index) => (
              <div 
                key={index} 
                className={`w-full h-40 overflow-hidden rounded-lg cursor-pointer ${img === mainImage ? 'ring-2 ring-blue-800 ring-offset-2' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img 
                  src={img} 
                  alt={`${property.name} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">About this property</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{property.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-700">
                  <Home size={18} className="mr-2 text-blue-800" />
                  <span>
                    {property.size.value} {property.size.unit}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Bed size={18} className="mr-2 text-blue-800" />
                  <span>
                    {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Bath size={18} className="mr-2 text-blue-800" />
                  <span>
                    {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users size={18} className="mr-2 text-blue-800" />
                  <span>
                    Up to {property.capacity} Guests
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <Check size={18} className="mr-2 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Location</h2>
              <div className="bg-white rounded-lg h-80">
                <GoogleMap 
                  lat={property.location.coordinates?.lat || 0} 
                  lng={property.location.coordinates?.lng || 0}
                  zoom={15}
                />
              </div>
            </div>

            {/* Policies */}
            <div className="mb-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Check-in & Check-out</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>Check-in: 3:00 PM - 8:00 PM</li>
                    <li>Check-out: 11:00 AM</li>
                    <li>No pets allowed</li>
                    <li>No parties or events</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cancellation Policy</h3>
                  <p className="text-gray-700">
                    Free cancellation up to 30 days before check-in. Cancel within 30 days of check-in and receive a 50% refund, minus the service fee.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <PropertyBookingWidget property={property} />
            </div>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProperties.map(relatedProperty => (
                <Link 
                  key={relatedProperty.id}
                  to={`/properties/${relatedProperty.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProperty.images[0]} 
                      alt={relatedProperty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedProperty.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedProperty.shortDescription}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-blue-900 font-bold">
                        {formatCurrency(relatedProperty.price.perNight, relatedProperty.price.currency)} / night
                      </div>
                      <Button variant="link" className="text-blue-800">
                        View
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;