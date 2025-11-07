/**
 * App.jsx - PlantCare Manager Main Application Component
 * 
 * Core application component that manages global state, routing, and data persistence.
 * Features tab-based navigation between Dashboard, Plant Manager, and Gallery.
 * 
 * @author Amit Ingle
 * @version 1.0
 * @description A comprehensive plant care tracking application built with React and Tailwind CSS
 */

import React, { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard.jsx';
import PlantManager from './components/plants/PlantManager.jsx';
import Gallery from './components/gallery/Gallery.jsx';
import { samplePlants } from './data/samplePlants.js';

import Main from './components/main/Main.jsx';


const App = () => {
  // State for active tab navigation and plant data management
  const [activeTab, setActiveTab] = useState('dashboard'); // Current active view
  const [plants, setPlants] = useState([]); // Array of all plant objects

  /**
   * Effect: Initialize plant data on component mount
   * Checks localStorage for existing data, falls back to sample data
   * Empty dependency array ensures this runs only once on mount
   */
  useEffect(() => {
    const savedPlants = localStorage.getItem('plantcare-plants');
    if (savedPlants) {
      // Parse and load previously saved plants from localStorage
      setPlants(JSON.parse(savedPlants));
    } else {
      // Use sample data if no saved data exists (first-time users)
      setPlants(samplePlants);
    }
  }, []); // Empty dependency array = run once on mount

  /**
   * Effect: Persist plant data to localStorage whenever plants change
   * Automatically saves the current plant state to browser storage
   */
  useEffect(() => {
    localStorage.setItem('plantcare-plants', JSON.stringify(plants));
  }, [plants]); // Re-run whenever plants state changes

  /**
   * Adds a new plant to the collection
   * @param {Object} newPlant - Plant data from the form
   */
  const addPlant = (newPlant) => {
    const plantWithId = {
      ...newPlant, // Spread existing plant data
      id: Date.now(), // Generate unique ID using timestamp
      lastWatered: new Date().toISOString().split('T')[0], // Set to today
      nextWatering: calculateNextWatering(newPlant.wateringFrequency), // Calculate future date
      createdAt: new Date().toISOString().split('T')[0] // Record creation date
    };
    // Update state with new plant (immutable update pattern)
    setPlants([...plants, plantWithId]);
  };

  /**
   * Deletes a plant by ID
   * @param {number} plantId - ID of the plant to delete
   */
  const deletePlant = (plantId) => {
    // Filter out the plant with matching ID
    setPlants(plants.filter(plant => plant.id !== plantId));
  };

  /**
   * Updates an existing plant's data
   * @param {number} plantId - ID of the plant to update
   * @param {Object} updatedData - New data to merge with existing plant
   */
  const updatePlant = (plantId, updatedData) => {
    // Map through plants, update matching plant, keep others unchanged
    setPlants(plants.map(plant => 
      plant.id === plantId ? { ...plant, ...updatedData } : plant
    ));
  };

  /**
   * Calculates the next watering date based on frequency
   * @param {number} frequency - Days between watering
   * @returns {string} ISO date string (YYYY-MM-DD format)
   */
  const calculateNextWatering = (frequency) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + frequency); // Add frequency days to current date
    return nextDate.toISOString().split('T')[0]; // Return date portion only
  };

  /**
   * Marks a plant as watered and updates its schedule
   * @param {number} plantId - ID of the plant to water
   */
  const waterPlant = (plantId) => {
    const plant = plants.find(p => p.id === plantId);
    if (plant) {
      // Update plant with new watering dates
      updatePlant(plantId, {
        lastWatered: new Date().toISOString().split('T')[0], // Set to today
        nextWatering: calculateNextWatering(plant.wateringFrequency) // Recalculate next watering
      });
    }
  };

  return (
    // Main container with gradient background and full viewport height
    <div className="min-h-screen bg-linear-to-br from-plant-50 to-green-50">
      
      {/* Header Section with Navigation */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 sm:py-5">
            
            {/* Logo and Branding */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-green-500 rounded-full flex items-center justify-center border">
                <span className="text-white text-2xl sm:text-3xl lg:text-4xl">🌱</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">PlantCare</h1>
            </div>
            
            {/* Navigation Tabs - Responsive Design */}

            <nav className="w-full sm:w-auto flex gap-2 sm:gap-4 lg:gap-6 bg-green-50 rounded-lg p-2 sm:p-3 lg:p-4 border-2 border-green-200">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'plants', label: 'My Plants', icon: '🌿' },
                { id: 'gallery', label: 'Gallery', icon: '🖼️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-green-700 shadow-sm'  // Active state
                      : 'text-green-600 hover:bg-green-200'  // Inactive state
                  }`}
                >
                  <span className="text-sm sm:text-base">{tab.icon}</span>
                  {/* Hide text on small screens, show on medium and above */}
                  <span className="font-medium text-xs sm:text-sm lg:text-base xl:text-lg hidden sm:block">
                    {tab.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area - Conditionally Renders Active Tab */}

       
      
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
       {activeTab === 'dashboard' && (
  <>
    
    <Main setActiveTab={setActiveTab} />
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Dashboard plants={plants} onWaterPlant={waterPlant} />
    </div>
  </>
)}
        {activeTab === 'plants' && (
          <PlantManager 
            plants={plants} 
            onAddPlant={addPlant}
            onDeletePlant={deletePlant}
            onUpdatePlant={updatePlant}
            onWaterPlant={waterPlant}
          />
        )}
        {activeTab === 'gallery' && (
          <Gallery plants={plants} />
        )}
      </main>

      {/* Footer with Attribution and Project Info */}
      <footer className="bg-green-100 py-6 border-t-2 border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Brand Section */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🌱</span>
              </div>
              <span className="text-gray-700 font-medium text-lg">PlantCare Manager</span>
            </div>
            
            {/* Creator Attribution */}
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Crafted with ❤️ by{" "}
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-lg">
                  Amit Ingle
                </span>
              </p>
            </div>
            
            {/* Technology Stack */}
            <div className="text-gray-500 text-lg">
              v1.0 • React + Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;