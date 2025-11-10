import React from 'react'
import { ArrowRight } from 'lucide-react';

const Card = (props) => {
  const handleButtonClick = () => {
    if (props.setActiveTab) {
      // Navigate to respective section based on button text
      if (props.buttonText === "View Dashboard") {
        props.setActiveTab('dashboard');
      } else if (props.buttonText === "Manage Plants") {
        props.setActiveTab('plants');
      } else if (props.buttonText === "Browse Gallery") {
        props.setActiveTab('gallery');
      }
    }
  };

  return (
    <div
      className="h-[400px] sm:h-[450px] lg:h-auto w-[280px] sm:w-[320px] lg:w-[30%] shrink-0 p-4 sm:p-6 lg:p-3 rounded-3xl lg:rounded-4xl overflow-hidden 
      bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <div className='w-full flex-1 flex flex-col justify-between'>
        <h3 className="text-black bg-white font-bold w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-lg sm:text-xl">
          {props.id}
        </h3>

        <p className='text-sm sm:text-base lg:text-normal text-gray-900 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg text-justify'>
          {props.desc}
        </p>
      </div>

      <div className='flex justify-between items-center mt-4 sm:mt-6'>
        <button 
          onClick={handleButtonClick}
          className='text-sm sm:text-base lg:text-lg text-black bg-white rounded-full px-4 sm:px-6 py-2 sm:py-3 lg:py-4 font-semibold hover:bg-green-50 transition-colors'
        >
          {props.buttonText}
        </button>

        <div 
          onClick={handleButtonClick}
          className='w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 rounded-full cursor-pointer hover:bg-white transition-colors'
        >
          <ArrowRight size={18} className='sm:w-5 sm:h-5'/>
        </div>
      </div>
    </div>
  )
}

export default Card