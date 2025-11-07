/**
 * Dashboard.jsx - PlantCare Manager Dashboard Component
 * 
 * Overview dashboard displaying plant statistics, watering schedule, and urgent actions.
 * Features real-time data visualization and interactive plant management.
 * 
 * @author Amit Ingle
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.plants - Array of plant objects
 * @param {Function} props.onWaterPlant - Callback function to water a plant
 */

import React from 'react';
import { Droplets, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = ({ plants, onWaterPlant }) => {
  // Get today's date in YYYY-MM-DD format for comparison
  const today = new Date().toISOString().split('T')[0];
  
  /**
   * Statistics data calculated from plants array
   * Demonstrates array methods and data processing
   */
  const stats = {
    total: plants.length, // Total number of plants
    needWatering: plants.filter(plant => plant.nextWatering <= today).length, // Plants due for watering
    healthy: plants.filter(plant => plant.health === 'Excellent').length, // Plants in excellent health
    warning: plants.filter(plant => plant.health === 'Poor').length // Plants needing attention
  };

  // Filter plants that need watering today or are overdue
  const plantsNeedingWater = plants.filter(plant => plant.nextWatering <= today);

  return (
    <div className="space-y-8 animate-fade-in">

     
      {/* Statistics Grid - Responsive 4-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Plants Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between px-7 py-5">
            <div>
              <p className="text-xl font-medium text-gray-600">Total Plants</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            {/* Icon with color-coded background */}
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Need Watering Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between px-7 py-5">
            <div>
              <p className="text-xl font-medium text-gray-600">Need Watering</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.needWatering}</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Healthy Plants Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
          <div className="flex items-center justify-between px-7 py-5">
            <div>
              <p className="text-xl font-medium text-gray-600">Healthy Plants</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.healthy}</p>
            </div>
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Need Attention Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-100">
          <div className="flex items-center justify-between px-7 py-5">
            <div>
              <p className="text-xl font-medium text-gray-600">Need Attention</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.warning}</p>
            </div>
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
          </div>
        </div>
        
      </div>

      {/* Watering Schedule Section - Two Column Layout */}
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        
        
        {/* Plants Needing Water Today Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Droplets className="w-8 h-8 text-blue-600" />
            Plants Needing Water Today
          </h2>
          <div className="space-y-3">
            {plantsNeedingWater.length > 0 ? (
              // Map through plants needing water and render interactive cards
              plantsNeedingWater.map(plant => (
                <div key={plant.id} className="flex items-center justify-between p-6 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-xl">{plant.name}</h3>
                      <p className="text-lg text-gray-600">Last watered: {plant.lastWatered}</p>
                    </div>
                  </div>
                  {/* Water Now button with click handler */}
                  <button
                    onClick={() => onWaterPlant(plant.id)}
                    className="bg-blue-600 text-white px-7 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Water Now
                  </button>
                </div>
              ))
            ) : (
              // Empty state when all plants are watered
              <p className="text-gray-500 text-center py-12 text-xl">All plants are watered! 🎉</p>
            )}
          </div>
        </div>

        {/* Upcoming Watering Schedule Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-green-600" />
            Upcoming Watering Schedule
          </h2>
          <div className="space-y-3">
            {plants
              // Filter plants with future watering dates
              .filter(plant => plant.nextWatering > today)
              // Sort by next watering date (ascending)
              .sort((a, b) => new Date(a.nextWatering) - new Date(b.nextWatering))
              // Limit to 5 upcoming plants for better UX
              .slice(0, 5)
              // Render upcoming plant cards
              .map(plant => (
                <div key={plant.id} className="flex items-center justify-between p-6 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img 
                      src={plant.image} 
                      alt={plant.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800 text-xl">{plant.name}</h3>
                      <p className="text-lg text-gray-600">Next: {plant.nextWatering}</p>
                    </div>
                  </div>
                  {/* Calculate and display days until next watering */}
                  <span className="text-lg text-green-600 font-medium">
                    In {Math.ceil((new Date(plant.nextWatering) - new Date()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;