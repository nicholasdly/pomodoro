import React from 'react';
import Timer from './components/Timer';
import Description from './components/Description'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-neutral-800 text-red-500 min-h-screen">
      <Timer />
      <Description />
      <Footer />
    </div>
  )
}
