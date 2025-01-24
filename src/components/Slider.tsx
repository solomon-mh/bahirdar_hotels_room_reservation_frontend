import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
    images: string[]; // Array of image URLs
    className?: string; // Optional custom class for styling
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, className = "" }) => {
    const settings = {
        dots: true, // Enable navigation dots
        infinite: true, // Infinite scrolling
        speed: 300, // Transition speed in ms
        slidesToShow: 2, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll
        autoplay: true, // Autoplay the slides
        autoplaySpeed: 1000, // Autoplay interval in ms
        arrows: true, // Enable next/previous arrows
    };

    if (!images || images.length === 0)
    {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <p>No images available</p>
            </div>
        );
    }

    return (
        <div className={className}>
            <Slider className="gap-4 flex items-center" {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="h-64 px-2 flex items-center justify-center">
                        <img
                            src={image}
                            alt={`Room Image ${index + 1}`}
                            className="h-full w-full object-cover rounded-md"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
