import { Property } from '../types';

export const sampleProperties: Property[] = [
  {
    id: '1',
    name: 'Oceanfront Villa',
    location: {
      city: 'Malibu',
      country: 'USA',
      address: '123 Ocean Drive',
      coordinates: {
        lat: 34.025922,
        lng: -118.779757
      }
    },
    price: {
      perNight: 1200,
      currency: 'USD'
    },
    rating: 4.9,
    bedrooms: 5,
    bathrooms: 4.5,
    capacity: 10,
    size: {
      value: 3500,
      unit: 'sq ft'
    },
    description: 'Experience luxury living in this stunning oceanfront villa with panoramic views of the Pacific. This spacious retreat features floor-to-ceiling windows, a gourmet kitchen, infinity pool, and direct beach access. Perfect for family gatherings or a luxurious getaway with friends.',
    shortDescription: 'Stunning oceanfront villa with panoramic views and direct beach access',
    amenities: ['Infinity Pool', 'Hot Tub', 'Home Theater', 'Gourmet Kitchen', 'Beach Access', 'Ocean View', 'Outdoor Kitchen', 'Fire Pit', 'Smart Home', 'Wine Cellar'],
    images: [
      'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
      'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg'
    ],
    featured: true,
    propertyType: 'villa'
  },
  {
    id: '2',
    name: 'Manhattan Luxury Penthouse',
    location: {
      city: 'New York',
      country: 'USA',
      address: '888 5th Avenue',
      coordinates: {
        lat: 40.7736,
        lng: -73.9566
      }
    },
    price: {
      perNight: 2500,
      currency: 'USD'
    },
    rating: 4.8,
    bedrooms: 3,
    bathrooms: 3.5,
    capacity: 6,
    size: {
      value: 2800,
      unit: 'sq ft'
    },
    description: 'Indulge in the epitome of luxury in this stunning Manhattan penthouse. Featuring 360-degree views of the city skyline, this meticulously designed residence offers a private terrace, chef\'s kitchen, and smart home features throughout. Located in the heart of the city with access to world-class dining and entertainment.',
    shortDescription: 'Luxurious penthouse with panoramic views of Manhattan skyline',
    amenities: ['Private Terrace', 'Doorman', 'Gym Access', 'Concierge Service', 'Smart Home', 'City Views', 'Chef\'s Kitchen', 'Fireplace', 'Wine Fridge', 'Soaking Tub'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/275484/pexels-photo-275484.jpeg',
      'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg'
    ],
    featured: true,
    propertyType: 'penthouse'
  },
  {
    id: '3',
    name: 'Tuscan Countryside Villa',
    location: {
      city: 'Florence',
      country: 'Italy',
      address: 'Via del Chianti 45',
      coordinates: {
        lat: 43.7696,
        lng: 11.2558
      }
    },
    price: {
      perNight: 850,
      currency: 'EUR'
    },
    rating: 4.9,
    bedrooms: 4,
    bathrooms: 3,
    capacity: 8,
    size: {
      value: 3200,
      unit: 'sq ft'
    },
    description: 'Escape to the rolling hills of Tuscany in this authentic 18th-century villa. Surrounded by vineyards and olive groves, this beautifully restored property offers a private pool, original stone architecture, and modern amenities. Enjoy panoramic countryside views, cook in the traditional kitchen, and dine al fresco under the pergola.',
    shortDescription: 'Authentic Tuscan villa surrounded by vineyards with private pool',
    amenities: ['Private Pool', 'Vineyard Views', 'Wine Cellar', 'Fireplace', 'Pizza Oven', 'Garden', 'Terrace', 'Countryside Views', 'Historic Architecture', 'Olive Grove'],
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg',
      'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg',
      'https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg'
    ],
    featured: true,
    propertyType: 'villa'
  },
  {
    id: '4',
    name: 'Modern Beach House',
    location: {
      city: 'Miami',
      country: 'USA',
      address: '456 Ocean Drive',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    },
    price: {
      perNight: 950,
      currency: 'USD'
    },
    rating: 4.7,
    bedrooms: 4,
    bathrooms: 3.5,
    capacity: 8,
    size: {
      value: 2800,
      unit: 'sq ft'
    },
    description: 'Experience the vibrant energy of Miami in this contemporary beachfront home. The open-concept design features floor-to-ceiling windows that frame the Atlantic Ocean, a sleek kitchen with premium appliances, and a private pool deck perfect for entertaining. Just steps from the beach and minutes from South Beach nightlife.',
    shortDescription: 'Contemporary Miami beach house with private pool and ocean views',
    amenities: ['Beachfront', 'Private Pool', 'Floor-to-ceiling Windows', 'Smart Home', 'Outdoor Shower', 'BBQ Area', 'Ocean View', 'Designer Furniture', 'Sound System', 'Beach Equipment'],
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg',
      'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
      'https://images.pexels.com/photos/2119714/pexels-photo-2119714.jpeg'
    ],
    featured: true,
    propertyType: 'house'
  },
  {
    id: '5',
    name: 'Alpine Luxury Chalet',
    location: {
      city: 'Aspen',
      country: 'USA',
      address: '789 Mountain View Road',
      coordinates: {
        lat: 39.1911,
        lng: -106.8175
      }
    },
    price: {
      perNight: 1800,
      currency: 'USD'
    },
    rating: 4.9,
    bedrooms: 6,
    bathrooms: 5.5,
    capacity: 12,
    size: {
      value: 4200,
      unit: 'sq ft'
    },
    description: 'Nestled in the mountains of Aspen, this luxurious ski chalet offers the perfect winter getaway or summer retreat. Featuring exposed timber beams, a stone fireplace, indoor hot tub, and panoramic mountain views. Just minutes from world-class skiing and hiking trails.',
    shortDescription: 'Luxury mountain chalet with hot tub and stunning Aspen views',
    amenities: ['Hot Tub', 'Ski-in/Ski-out', 'Fireplace', 'Mountain Views', 'Home Theater', 'Boot Warmers', 'Game Room', 'Heated Floors', 'Sauna', 'Wine Cellar'],
    images: [
      'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
      'https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/5998041/pexels-photo-5998041.jpeg'
    ],
    propertyType: 'house'
  },
  {
    id: '6',
    name: 'Paris Luxury Apartment',
    location: {
      city: 'Paris',
      country: 'France',
      address: '25 Avenue Montaigne',
      coordinates: {
        lat: 48.8662,
        lng: 2.3008
      }
    },
    price: {
      perNight: 750,
      currency: 'EUR'
    },
    rating: 4.8,
    bedrooms: 2,
    bathrooms: 2,
    capacity: 4,
    size: {
      value: 1500,
      unit: 'sq ft'
    },
    description: 'Experience the romance of Paris in this elegant Haussmannian apartment. This beautifully appointed residence features high ceilings, herringbone floors, and a balcony with Eiffel Tower views. Located in the prestigious 8th arrondissement, steps from luxury shopping and fine dining.',
    shortDescription: 'Elegant Parisian apartment with Eiffel Tower views',
    amenities: ['Eiffel Tower View', 'Balcony', 'Historical Building', 'Concierge', 'Elevator', 'Designer Furniture', 'Fully Equipped Kitchen', 'Central Location', 'Air Conditioning', 'Washer/Dryer'],
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg',
      'https://images.pexels.com/photos/3958958/pexels-photo-3958958.jpeg',
      'https://images.pexels.com/photos/3958954/pexels-photo-3958954.jpeg'
    ],
    propertyType: 'apartment'
  }
];