import React, { useState } from 'react';

const images = [
  "https://upload.tanca.io/api/upload/news/6343ec644389eb527e064b59?name=6343ec64668f0NftG1780608-recruitment-process-1.jpeg",
  "https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg",
  "https://upload.tanca.io/api/upload/news/6343ec644389eb527e064b59?name=6343ec64668f0NftG1780608-recruitment-process-1.jpeg",
  "https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg",
  "https://upload.tanca.io/api/upload/news/6343ec644389eb527e064b59?name=6343ec64668f0NftG1780608-recruitment-process-1.jpeg",
  "https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg",
  "https://upload.tanca.io/api/upload/news/6343ec644389eb527e064b59?name=6343ec64668f0NftG1780608-recruitment-process-1.jpeg",
  "https://www.shutterstock.com/image-vector/recruitment-concept-search-choice-worker-600nw-1954350781.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 4;
  const totalSlides = Math.ceil(images.length / imagesPerSlide);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className="w-full md:w-1/4 lg:w-1/4 xl:w-1/4 flex-shrink-0"
              style={{ minWidth: '25%', maxWidth: '25%' }}
            />
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2"
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2"
        onClick={nextSlide}
      >
        Next
      </button>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
