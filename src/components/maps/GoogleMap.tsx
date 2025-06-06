import React, { useEffect, useRef } from 'react';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ lat, lng, zoom = 14, className = 'w-full h-full' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Create a global flag to track API loading status
    const globalWithGoogle = window as typeof window & {
      isGoogleMapsLoading?: boolean;
      initGoogleMaps?: () => void;
    };

    const initMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        new google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
        });
      }
    };

    // Check if the API is already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else if (!globalWithGoogle.isGoogleMapsLoading) {
      // Set the loading flag
      globalWithGoogle.isGoogleMapsLoading = true;

      // Store the callback globally
      globalWithGoogle.initGoogleMaps = () => {
        globalWithGoogle.isGoogleMapsLoading = false;
        initMap();
      };

      // Load the script only if it's not already being loaded
      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMaps`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className={className}></div>;
};

export default GoogleMap;