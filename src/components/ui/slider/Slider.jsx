import React, { useState, useEffect, useCallback } from "react";
import Slide from "./slide"
import slidesData from "../../data/slider";
import "./slider.css";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = slidesData.length;

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [isAnimating, totalSlides]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [isAnimating, totalSlides]);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <button
          className="slider-btn prev"
          onClick={prevSlide}
          disabled={isAnimating}
          aria-label="Предыдущий слайд"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
              stroke="#000"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* Окно слайдов */}
        <div className="slider-viewport">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slidesData.map((slide) => (
              <Slide key={slide.id} name={slide.name} cards={slide.cards} />
            ))}
          </div>
        </div>

        <button
          className="slider-btn next"
          onClick={nextSlide}
          disabled={isAnimating}
          aria-label="Следующий слайд"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
              stroke="#000"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="slider-counter">
        {currentSlide + 1} / {totalSlides}
      </div>
    </div>
  );
}
