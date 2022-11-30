import React from 'react';
import Timer from './components/Timer';
import Description from './components/Description'
import Footer from './components/Footer'

export default function App() {
  
  // Default time
  const time = {
    workMinutes: 0,
    workSeconds: 15,
    breakMinutes: 0,
    breakSeconds: 5
  };
  
  return (
    <div className="bg-neutral-800 text-red-500 min-h-screen">
      <Timer time={time} />
      <Description />
      <Footer />
    </div>
  )
}
