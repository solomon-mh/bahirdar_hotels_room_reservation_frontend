import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
    images: string[];
    className?: string;
    slidesToShow?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, className = "", slidesToShow = 2 }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: true, 
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
