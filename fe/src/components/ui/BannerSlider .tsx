import { useState, useEffect } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: "/src/assets/image/banner1.jpeg",
    },
    {
      id: 2,
      image: "/src/assets/image/banner2.jpg",
    },
    {
      id: 3,
      image: "/src/assets/image/banner5.webp",
    },
    {
      id: 4,
      image: "/src/assets/image/banner4.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-4/5 md:h-[500px] overflow-hidden mt-20">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative min-w-full h-full">
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-[500px]"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full focus:outline-none"
      >
        <AiFillCaretLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full focus:outline-none"
      >
        <AiFillCaretRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
