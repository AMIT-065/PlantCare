/**
 * PlantCard.jsx - PlantCare Manager Plant Card Component
 * 
 * Reusable card component for displaying individual plant information.
 * Features inline editing, watering functionality, and health status tracking.
 * Implements CRUD operations through callback props.
 * 
 * @author Amit Ingle
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.plant - Plant data object
 * @param {Function} props.onDelete - Callback to delete this plant
 * @param {Function} props.onUpdate - Callback to update plant data
 * @param {Function} props.onWater - Callback to mark plant as watered
 */

import React, { useState } from 'react';
import { Droplets, Sun, Calendar, Edit, Trash2, MoreVertical } from 'lucide-react';

const PlantCard = ({ plant, onDelete, onUpdate, onWater }) => {
  // State for UI interactions and editing mode
  const [showMenu, setShowMenu] = useState(false); // Controls dropdown menu visibility
  const [isEditing, setIsEditing] = useState(false); // Toggles between view and edit mode
  const [editData, setEditData] = useState(plant); // Local state for form data during editing

  /**
   * Saves edited plant data and exits editing mode
   * Calls parent update callback with new data
   */
  const handleSave = () => {
    onUpdate(plant.id, editData);
    setIsEditing(false); // Return to view mode after save
  };

  /**
   * Returns Tailwind classes based on plant health status
   * Provides visual indicators for different health states
   * @param {string} health - Plant health status
   * @returns {string} Tailwind CSS classes
   */
  const getHealthColor = (health) => {
    switch (health) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  /**
   * Calculates days until next watering
   * Handles date comparison and conversion from milliseconds to days
   * @returns {number} Days until next watering (can be negative if overdue)
   */
  const daysUntilWatering = Math.ceil(
    (new Date(plant.nextWatering) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    // Main card container with hover effects and animations
    
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-green-100 animate-fade-in">
      
      {/* Plant Image Section with Fallback UI */}
      <div className="h-80 bg-gray-200 relative">
        {plant.image ? (
          // Display plant image if available
          <img 
            src={plant.image} 
            alt={plant.name}
            className="w-full h-full "
            loading="lazy" // Optimize loading performance
          />
        ) : (
          // Fallback UI when no image is provided
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-linear-to-br from-green-50 to-blue-50">
            <div className="text-center">
              <div className="text-5xl mb-3">🌱</div>
              <p className="text-base">No image</p>
            </div>
          </div>
        )}
        
        {/* Health Status Badge - Positioned absolutely over image */}
        <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-lg font-medium ${getHealthColor(plant.health)}`}>
          {plant.health}
        </span>

        {/* Action Menu Button and Dropdown */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
            aria-label="Plant options"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Dropdown Menu - Conditionally rendered */}
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
              {/* Edit Button */}
              <button
                onClick={() => { 
                  setIsEditing(true); 
                  setShowMenu(false); // Close menu when editing starts
                }}
                className="flex items-center gap-3 px-4 py-3 text-lg text-gray-700 hover:bg-gray-50 w-full transition-colors"
              >
                <Edit className="w-6 h-6" />
                Edit
              </button>
              {/* Delete Button with destructive styling */}
              <button
                onClick={() => onDelete(plant.id)}
                className="flex items-center gap-3 px-4 py-3 text-lg text-red-600 hover:bg-red-50 w-full transition-colors"
              >
                <Trash2 className="w-6 h-6" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plant Information Section - Conditionally renders edit or view mode */}
      <div className="p-5">
        {isEditing ? (
          /* EDIT MODE - Form inputs for plant data */
          <div className="space-y-4">
            {/* Plant Name Input */}
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg font-semibold text-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Plant name"
            />
            {/* Plant Notes Textarea */}
            <textarea
              value={editData.notes}
              onChange={(e) => setEditData({...editData, notes: e.target.value})}
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Add care notes..."
            />
            {/* Health Status Dropdown */}
            <select
              value={editData.health}
              onChange={(e) => setEditData({...editData, health: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
            {/* Save/Cancel Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-lg"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* VIEW MODE - Display plant information */
          <>
            {/* Plant Header with Name and Type */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-semibold text-gray-800">{plant.name}</h3>
              <span className="bg-green-100 text-green-800 text-base px-3 py-1.5 rounded">
                {plant.type}
              </span>
            </div>

            {/* Care Details with Icons */}
            <div className="space-y-3 mb-5">
              {/* Watering Frequency */}
              <div className="flex items-center gap-3 text-base text-gray-600">
                <Droplets className="w-5 h-5 text-blue-500" />
                <span>Every {plant.wateringFrequency} days</span>
              </div>
              {/* Sunlight Requirements */}
              <div className="flex items-center gap-3 text-base text-gray-600">
                <Sun className="w-5 h-5 text-amber-500" />
                <span>{plant.sunlight}</span>
              </div>
              {/* Next Watering with Visual Indicator */}
              <div className="flex items-center gap-3 text-base text-gray-600">
                <Calendar className="w-5 h-5 text-green-500" />
                <span>Next: {plant.nextWatering}</span>
                {/* Dynamic badge based on days until watering */}
                <span className={`text-sm px-2 py-1 rounded font-medium ${
                  daysUntilWatering <= 2 
                    ? 'bg-red-100 text-red-700' // Urgent - water soon
                    : daysUntilWatering <= 5
                    ? 'bg-amber-100 text-amber-700' // Warning - water soon
                    : 'bg-green-100 text-green-700' // Good - plenty of time
                }`}>
                  {daysUntilWatering === 0 ? 'Today' : 
                   daysUntilWatering === 1 ? 'Tomorrow' : 
                   `${daysUntilWatering}d`}
                </span>
              </div>
            </div>

            {/* Plant Notes - Conditionally rendered */}
            {plant.notes && (
              <p className="text-base text-gray-600 bg-gray-50 p-4 rounded-lg mb-5">
                {plant.notes}
              </p>
            )}

            {/* Action Button */}
            <div className="flex gap-3">
              <button
                onClick={() => onWater(plant.id)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <Droplets className="w-5 h-5" />
                Water Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlantCard;