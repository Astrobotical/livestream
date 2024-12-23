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
      'https://jamaicans.com/wp-content/uploads/2016/08/Jamaica-Tourist-Board-Olympic-Watch-Party-Pembroke-Pines.jpg',
      'https://media.istockphoto.com/id/472046721/photo/street-party-in-ghetto.jpg?s=2048x2048&w=is&k=20&c=ZUjqjPlAW07YkkQYXLBO2eSLYznmA9DGOswGKaiEWKM=',
      'https://media.istockphoto.com/id/139375643/photo/rave-scape.jpg?s=2048x2048&w=is&k=20&c=SOM718iojrKE8apY--I7xsBdZBDGM1qkw9P-6cT-Tio=',
      'https://media.istockphoto.com/id/1203947225/photo/people-celebrating-and-dancing-brazilian-carnival.jpg?s=1024x1024&w=is&k=20&c=wXJkEV4-uyFoPd4NIfUxbZWhY7bz2wA-dUHE_U1_Y0M=',
      'https://media.istockphoto.com/id/1203650291/photo/people-celebrating-and-dancing-brazilian-carnival.jpg?s=1024x1024&w=is&k=20&c=Bs4hyIxTav2AWvFeh9heg47FLAPnlOXBU32DYdsobbY=',
      'https://media.istockphoto.com/id/1203945942/photo/people-celebrating-and-dancing-brazilian-carnival.jpg?s=2048x2048&w=is&k=20&c=YZUGbZ_7nUKJpSLm3YysfGsblxpvlkHzpc7lxUKvCCI=',
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