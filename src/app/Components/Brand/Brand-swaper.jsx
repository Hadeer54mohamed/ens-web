"use client";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getAllBrands } from "../../../lib/api/services";
import brandsData from "../../Data/brand1.json";

const BrandSwaper = () => {
  const t = useTranslations("BrandSwaper");
  const locale = useLocale();
  const [brands, setBrands] = useState(brandsData);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getAllBrands();
        if (data && data.length > 0) {
          setBrands(data);
        }
      } catch {
        // keep local data
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

  if (!brands || brands.length === 0) return null;

  return (
    <div
      className="brand-slider-section fix"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="brand-slider-container-wrapper style2">
        <div className="section-title text-center mxw-685 mx-auto">
          <div className="subtitle wow fadeInUp" data-wow-delay=".2s">
            <i className="bi bi-people-fill"></i>
            {t.rich("title", {
              span: (chunks) => <span>{chunks}</span>,
            })}
          </div>
        </div>
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
