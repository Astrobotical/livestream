/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';

const GalleryPage = () => {
  useEffect(() => {
    document.title = "Gallery | Yardie";
  }
  , []);
    // State to track selected image and modal visibility
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    // Images array
    const images = [
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
      'https://post.healthline.com/wp-content/uploads/2019/10/rambutan-exotic-fruit-1296x728-header-1296x728.jpg',
    ];
  
    // Open the modal with the clicked image
    const openModal = (image: string) => {
      setSelectedImage(image);
    };
  
    // Close the modal
    const closeModal = () => {
      setSelectedImage(null);
    };
  
    return (
      <div className="w-full mx-auto  bg-gray-600  h-screen">
        {/* Gallery Header */}
        <header className="bg-gray-500  w-full shadow-md py-6">
        <h1 className="text-4xl font-bold text-center  text-white">Gallery</h1>
        </header>
  
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 py-3 bg-gray-600">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(image)}
            >
              <img
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transform transition-transform duration-300"
              />
            </div>
          ))}
        </div>
  
        {/* Modal for full-screen image view */}
        {selectedImage && (
          <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-75">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
  
            {/* Full-screen image */}
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    );
  };
  

export default GalleryPage;