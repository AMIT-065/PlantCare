import React from 'react'
import { ArrowUpRight, Sprout, Heart } from 'lucide-react';

const Left = () => {
  return (
    <div className='w-full lg:w-1/3 h-full bg-linear-to-br  p-6 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-between bg-green-100 border-2 border-green-500 rounded-sm'>
     
      <div className='flex flex-col justify-between'>
        <div>
          {/* Main Heading */}
          <div className='flex items-center gap-4 mb-6'>
            <h2 className='text-5xl font-bold text-gray-800 leading-tight'>
              Smart Plant
              <span className='block text-green-600'>Care Management</span>
            </h2>
          </div>
          
          {/* Description */}
          <p className='text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed text-justify'>
            PlantCare Manager revolutionizes how you care for your plants by providing intelligent tracking, 
            personalized reminders, and comprehensive plant management tools. Our platform helps you monitor 
            watering schedules, track growth progress, and maintain optimal plant health through data-driven 
            insights. Whether you're a beginner gardener or an experienced plant enthusiast, transform your 
            plant care routine with smart technology that learns and adapts to your plants' unique needs.
          </p>

          {/* Features List */}
          <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {[
              { icon: '💧', text: 'Smart Watering Reminders' },
              { icon: '📊', text: 'Growth Progress Tracking' },
              { icon: '🌡️', text: 'Health Monitoring' },
              { icon: '📷', text: 'Photo Gallery & History' }
            ].map((feature, index) => (
              <div key={index} className='flex items-center gap-3 bg-white/50 rounded-lg p-3'>
                <span className='text-2xl'>{feature.icon}</span>
                <span className='text-lg font-medium text-gray-700'>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Left