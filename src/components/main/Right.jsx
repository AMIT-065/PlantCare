import React from 'react'
import Card from './Card'

const Right = ({ setActiveTab }) => {
  const sections = [
    {
      id: 1,
      title: "Plant Dashboard",
      desc: "Get a complete overview of your plant collection. Monitor watering schedules, track growth progress, and view plant health status all in one place.",
      buttonText: "View Dashboard",
      img: "https://plus.unsplash.com/premium_photo-1661700152890-931fb04588e6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
    },
    {
      id: 2,
      title: "Manage Plants",
      desc: "Add, edit, and organize your plant collection. Set custom watering frequencies, care instructions, and track each plant's growth journey.",
      buttonText: "Manage Plants",
      img: "https://plus.unsplash.com/premium_photo-1680125276268-3a72a87412a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbmFnZSUyMHBsYW50c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
    },
    {
      id: 3,
      title: "Plant Gallery",
      desc: "Create a beautiful visual gallery of your plants. Track growth progress with photos and share your plant care journey with others.",
      buttonText: "Browse Gallery",
      img: "https://images.unsplash.com/photo-1719403472550-2789cefb3da3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyb3dzZSUyMGdhbGxlcnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600"
    }
  ];

  return (
    <div className='w-full  lg:w-2/3  bg-green-100 flex gap-4 lg:gap-6 overflow-x-auto p-4 sm:p-6 lg:p-8 justify-center lg:justify-start flex-wrap '>
      {sections.map((x) => (
        <Card 
          key={x.id} 
          id={x.id} 
          title={x.title}
          desc={x.desc} 
          buttonText={x.buttonText} 
          img={x.img}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  )
}

export default Right