"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getAllBrands } from "../../../lib/api/services";
import brandsData from "../../Data/brand1.json";

const BrandSwaper = () => {
  const t = useTranslations("Brand1");
  const locale = useLocale();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await getAllBrands();
        if (data && data.length > 0) {
          setBrands(data);
        } else {
          setBrands(brandsData);
        }
      } catch {
        setBrands(brandsData);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const settings = {
    dots: false,
    infinite: brands.length >= 3,
    speed: 1500,
    slidesToShow: Math.min(brands.length, 5),
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    rtl: locale === "ar",
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: Math.min(brands.length, 4),
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: Math.min(brands.length, 3),
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: Math.min(brands.length, 2),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  if (loading) {
    return (
      <div
        className="brand-slider-section section-padding fix "
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="brand-slider-container-wrapper style2">
          <div className="container">
            <div className="brand-slider-wrapper style2">
              <div className="row">
                <div className="slider-area brandSliderTwo">
                  <div className="brand-loading-grid">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="brand-loading-item" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!brands || brands.length === 0) return null;

  return (
    <div
      className="brand-slider-section fix"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="brand-slider-container-wrapper style2">
        <div className="container">
          <div className="brand-slider-wrapper style2">
            <div className="row">
              <div className="slider-area brandSliderTwo">
                <Slider {...settings}>
                  {brands.map((brand, index) => (
                    <div key={brand.id || index} className="brand-slide-item">
                      <div className="brand-logo">
                        <div className="brand-image-wrapper">
                          <Image
                            src={brand.img}
                            alt={`Brand ${brand.id || index + 1}`}
                            fill
                            sizes="(max-width: 480px) 140px, (max-width: 767px) 150px, 160px"
                            className="brand-image"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandSwaper;
