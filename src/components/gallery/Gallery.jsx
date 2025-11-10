/**
 * Gallery.jsx - PlantCare Manager Gallery Component
 * 
 * Visual gallery for displaying plant growth timelines and photos.
 * Features list view mode, image carousel, and plant details modal.
 * 
 * @author Amit Ingle
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.plants - Array of plant objects to display in gallery
 */

import React, { useState } from 'react';
import { List , X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = ({ plants }) => {

  const [selectedPlant, setSelectedPlant] = useState(null); // Currently selected plant for modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Current image in carousel

  /**
   * Enhance plants with additional photo data for gallery display
   * Adds growth timeline photos to each plant object
   */
  const plantsWithPhotos = plants.map(plant => ({
    ...plant, // Spread existing plant properties
    photos: [
      "https://images.unsplash.com/photo-1618158807378-35769f30af82?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNlZWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      "https://images.unsplash.com/photo-1629096346363-b96e4d9634a1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FwbGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600", // Growth photo
      plant.image // Main plant image
    ]
  }));

  /**
   * Navigate to next image in carousel
   * Implements circular navigation (wraps around to first image)
   */
  const nextImage = () => {
    if (selectedPlant) {
      setCurrentImageIndex(prev => 
        prev === selectedPlant.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  /**
   * Navigate to previous image in carousel
   * Implements circular navigation (wraps around to last image)
   */
  const prevImage = () => {
    if (selectedPlant) {
      setCurrentImageIndex(prev => 
        prev === 0 ? selectedPlant.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="p-6">
      {/* Gallery Header with View Mode Toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Plant Gallery</h1>
      </div>
      <div className="space-y-4">
          {plantsWithPhotos.map(plant => (
            <div
              key={plant.id}
              className="bg-white rounded-xl shadow-sm border p-5 cursor-pointer hover:shadow-lg transition-all duration-300 flex items-center gap-5"
              onClick={() => {
                setSelectedPlant(plant);
                setCurrentImageIndex(0);
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && setSelectedPlant(plant)}
            >
              <img 
                src={plant.photos[2]} 
                alt={plant.name}
                className="w-20 h-20 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-xl">{plant.name}</h3>
                <p className="text-green-600 text-base">{plant.type}</p>
              </div>
              <div className="text-gray-500 text-lg">
                {plant.photos.length} photos
              </div>
            </div>
          ))}
        </div>

      

      {/* Empty State - Shows when no plants available */}
      {plants.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-xl">No plants to display in gallery</p>
          <p className="text-lg mt-2">Add plants to see them here</p>
        </div>
      )}

      {/* Plant Detail Modal - Shows when a plant is selected */}
      {selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl max-w-4xl lg:w-[40%] w-[90%] max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold">{selectedPlant.name}</h2>
              {/* Close Button */}
              <button
                onClick={() => setSelectedPlant(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Carousel Section */}
            <div className="relative">
              <img 
                src={selectedPlant.photos[currentImageIndex]} 
                alt={selectedPlant.name}
                className="w-full h-50 lg:h-70 "
              />
              
              {/* Navigation Arrows - Only show if multiple photos exist */}
              {selectedPlant.photos.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded text-base">
                {currentImageIndex + 1} / {selectedPlant.photos.length}
              </div>
            </div>


            {/* Plant Information Section */}
            <div className="p-6 border-t">
              <div className="grid grid-cols-2 gap-6 text-base">
                <div>
                  <span className="font-medium text-lg">Type:</span>
                  <p className="text-lg">{selectedPlant.type}</p>
                </div>
                <div>
                  <span className="font-medium text-lg">Health:</span>
                  <p className={`text-lg ${
                    selectedPlant.health === 'Excellent' ? 'text-green-600' :
                    selectedPlant.health === 'Good' ? 'text-blue-600' :
                    'text-red-600'  // Fallback for Poor health
                  }`}>
                    {selectedPlant.health}
                  </p>
                </div>
              </div>
              
              {/* Plant Notes - Conditionally rendered */}
              {selectedPlant.notes && (
                <div className="mt-4">
                  <span className="font-medium text-lg">Notes:</span>
                  <p className="text-gray-600 text-base mt-2">{selectedPlant.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;