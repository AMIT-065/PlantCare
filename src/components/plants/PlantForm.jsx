/**
 * PlantForm.jsx - PlantCare Manager Plant Form Component
 * 
 * Modal form component for adding new plants to the collection.
 * Features comprehensive plant data input with validation and user-friendly interface.
 * Implements controlled form components with proper state management.
 * 
 * @author Amit Ingle
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onAddPlant - Callback to add new plant with form data
 * @param {Function} props.onClose - Callback to close the form modal
 */

import React, { useState } from 'react';
import { X } from 'lucide-react';

const PlantForm = ({ onAddPlant, onClose }) => {
  /**
   * Form state management with comprehensive plant data structure
   * Includes default values for better user experience
   */
  const [formData, setFormData] = useState({
    name: '',                    // Required: Plant common name
    type: 'Indoor Tropical',     // Default plant type
    image: '',                   // Optional: URL to plant image
    wateringFrequency: 7,        // Default: Water every 7 days
    sunlight: 'Bright indirect', // Default light requirement
    temperature: '18-30°C',      // Default temperature range
    humidity: 'Medium',          // Default humidity level
    health: 'Good',              // Default health status
    notes: ''                    // Optional: Care instructions
  });

  /**
   * Plant type options for dropdown selection
   * Categorized common houseplant types for consistent data
   */
  const plantTypes = [
    'Indoor Tropical',
    'Succulent',
    'Flowering',
    'Herb',
    'Vegetable',
    'Cactus',
    'Fern',
    'Orchid'
  ];

  /**
   * Sunlight requirement options for dropdown selection
   * Ranges from low to direct sunlight for accurate plant care
   */
  const sunlightOptions = [
    'Low light',
    'Low to medium',
    'Medium',
    'Bright indirect',
    'Direct sunlight'
  ];

  /**
   * Handles form submission with validation
   * Prevents default form behavior and validates required fields
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Basic validation: ensure plant name is provided
    if (formData.name.trim()) {
      onAddPlant(formData); // Pass form data to parent component
      onClose(); // Close modal after successful submission
    }
    // Note: In a production app, you might want more comprehensive validation
  };

  /**
   * Universal change handler for all form fields
   * Uses currying to create field-specific handlers
   * @param {string} field - Form field name to update
   * @param {*} value - New value for the field
   */
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev, // Spread previous state to maintain other fields
      [field]: value // Update specific field with new value
    }));
  };

  return (
    <div className="p-8">
      {/* Form Header with Close Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Add New Plant</h2>
        {/* Close Button - Allows users to exit without submission */}
        <button
          onClick={onClose}
          className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close form"
          type="button"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Main Form - Organized into logical sections */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Information Section - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plant Name Input - Required Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Plant Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="e.g., Monstera Deliciosa"
              aria-required="true"
            />
          </div>

          {/* Plant Type Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Plant Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            >
              {plantTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image URL Section - Optional Field */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            placeholder="https://example.com/plant-image.jpg"
            aria-describedby="imageHelp"
          />
          {/* Help text for URL format */}
          <p id="imageHelp" className="text-sm text-gray-500 mt-1">
            Provide a direct link to a plant image (optional)
          </p>
        </div>

        {/* Care Requirements Section - Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Watering Frequency Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Watering Frequency (days)
            </label>
            <input
              type="number"
              min="1"
              max="30"
              value={formData.wateringFrequency}
              onChange={(e) => handleChange('wateringFrequency', parseInt(e.target.value) || 1)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              aria-describedby="wateringHelp"
            />
            <p id="wateringHelp" className="text-sm text-gray-500 mt-1">
              Days between watering
            </p>
          </div>

          {/* Sunlight Requirements Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Sunlight
            </label>
            <select
              value={formData.sunlight}
              onChange={(e) => handleChange('sunlight', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            >
              {sunlightOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Health Status Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Health Status
            </label>
            <select
              value={formData.health}
              onChange={(e) => handleChange('health', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
        </div>

        {/* Environment Section - Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Temperature Range Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Temperature Range
            </label>
            <input
              type="text"
              value={formData.temperature}
              onChange={(e) => handleChange('temperature', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              placeholder="e.g., 18-30°C"
              aria-describedby="tempHelp"
            />
            <p id="tempHelp" className="text-sm text-gray-500 mt-1">
              Ideal temperature range for the plant
            </p>
          </div>

          {/* Humidity Level Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Humidity
            </label>
            <select
              value={formData.humidity}
              onChange={(e) => handleChange('humidity', e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Notes Section - Freeform Text Area */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            Notes (Optional)
          </label>
          <textarea
            rows="4"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            placeholder="Any special care instructions or observations..."
            aria-describedby="notesHelp"
          />
          <p id="notesHelp" className="text-sm text-gray-500 mt-1">
            Additional care instructions or observations
          </p>
        </div>

        {/* Form Actions - Submit and Cancel Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-200">
          {/* Submit Button - Primary Action */}
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-xl"
          >
            Add Plant
          </button>
          {/* Cancel Button - Secondary Action */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-lg hover:bg-gray-400 transition-colors font-medium text-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;