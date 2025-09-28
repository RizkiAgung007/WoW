import React from 'react'
import { GalleryImage } from '../assets/assets'

const GalleryPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3A6B4C] tracking-tight">
            Galeri Momen Indah
          </h1>
          <p className="mt-4 text-lg text-[#3A6B4C]/80 max-w-2xl mx-auto">
            Inspirasi dari acara-acara yang telah kami tangani dengan penuh cinta dan dedikasi.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {GalleryImage.map((image, index) => {
            // Randomize layout 
            const random = Math.random();
            let itemClass = "col-span-1 row-span-1"; 
            
            if (random > 0.85 && (index % 4 !== 3)) {
              itemClass = "col-span-2 row-span-2"; 
            } else if (random > 0.6) {
              itemClass = "col-span-1 row-span-2"; 
            } else if (random > 0.4 && (index % 4 !== 3)) {
              itemClass = "col-span-2 row-span-1"; 
            }

            return (
              <div
                key={image.id}
                className={`${itemClass} relative group overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <img
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  src={image.src}
                  alt={image.alt}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3A6B4C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <p className="text-white text-sm sm:text-base font-medium p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    {image.alt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;