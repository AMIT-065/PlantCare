/**
 * PlantManager.jsx - PlantCare Manager Plant Management Component
 * 
 * Main interface for managing plant collection with search, filtering, and CRUD operations.
 * Features plant grid display, search functionality, and modal form for adding plants.
 * 
 * @author Amit Ingle
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.plants - Array of plant objects to manage
 * @param {Function} props.onAddPlant - Callback to add a new plant
 * @param {Function} props.onDeletePlant - Callback to delete a plant by ID
 * @param {Function} props.onUpdatePlant - Callback to update plant data
 * @param {Function} props.onWaterPlant - Callback to mark plant as watered
 */

import React, { useState } from 'react';
import PlantCard from './PlantCard';
import PlantForm from './PlantForm';
import { Plus, Search } from 'lucide-react';

const PlantManager = ({ plants, onAddPlant, onDeletePlant, onUpdatePlant, onWaterPlant }) => {
  // State for UI controls and modal management
  const [showForm, setShowForm] = useState(false); // Controls PlantForm modal visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search input value
  const [filterType, setFilterType] = useState('all'); // Plant type filter selection

  /**
   * Filters plants based on search term and type filter
   * Implements case-insensitive search across name and type fields
   * @returns {Array} Filtered array of plants matching criteria
   */
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plant.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || plant.type === filterType;
    return matchesSearch && matchesType;
  });

  /**
   * Generates unique plant types for filter dropdown
   * Includes 'all' option and removes duplicates using Set
   * @returns {Array} Unique plant types including 'all' option
   */
  const plantTypes = ['all', ...new Set(plants.map(plant => plant.type))];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Section with Page Title and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        {/* Page Title and Description */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">My Plants</h1>
          <p className="text-gray-600 mt-2 text-lg">Manage your plant collection</p>
        </div>
        
        {/* Add New Plant Button - Primary Action */}
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg"
          aria-label="Add new plant"
        >
          <Plus className="w-6 h-6" />
          Add New Plant
        </button>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm border border-green-100">
        
        {/* Search Input with Icon */}
        <div className="flex-1 relative">
          <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            aria-label="Search plants by name or type"
          />
        </div>
        
        {/* Plant Type Filter Dropdown */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
          aria-label="Filter plants by type"
        >
          {plantTypes.map(type => (
            <option key={type} value={type}>
              {type === 'all' ? 'All Types' : type}
            </option>
          ))}
        </select>
      </div>

      {/* Plants Grid Display - Conditionally Rendered */}
      {filteredPlants.length > 0 ? (
        /* Plants Grid - Responsive Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onDelete={onDeletePlant}
              onUpdate={onUpdatePlant}
              onWater={onWaterPlant}
            />
          ))}
        </div>
      ) : (
        /* Empty State - Shows when no plants match filters or collection is empty */
        <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
          {/* Empty State Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-10 h-10 text-gray-400" />
          </div>
          {/* Empty State Message */}
          <h3 className="text-2xl font-medium text-gray-900 mb-3">
            {plants.length === 0 ? 'No plants yet' : 'No plants found'}
          </h3>
          <p className="text-gray-500 mb-6 text-lg">
            {plants.length === 0 
              ? 'Add your first plant to get started!' 
              : 'Try adjusting your search or filter criteria'}
          </p>
          {/* Call to Action Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Add Plant
          </button>
        </div>
      )}

      {/* Plant Form Modal - Conditionally Rendered */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="plant-form-title"
        >
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <PlantForm
              onAddPlant={(newPlant) => {
                onAddPlant(newPlant);
                setShowForm(false); // Close modal after successful addition
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantManager;