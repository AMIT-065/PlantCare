import React from 'react'
import Left from './Left.jsx';
import Right from './Right.jsx'

const Main = ({ setActiveTab }) => {
  return (
     <div className='w-full h-auto mb-5 flex flex-wrap'>
     <Left/>
     <Right setActiveTab={setActiveTab}/>
    </div>
  )
  
  
}

export default Main
