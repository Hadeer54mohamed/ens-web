"use client";
import Slider from "react-slick";
import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const Testimonial = () => {
  const t = useTranslations("TestimonialSection");
  const locale = useLocale();
  const testimonials = t.raw("items");
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4500,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="testimonial-section"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="testimonial-container-wrapper style1">
        <div className="container">
          <div className="testimonial-wrapper style1 testimonial-wrapper--modern section-padding fix">
            <div className="shape1">
              <Image
                src="/assets/images/shape/testimonialShape1_1.png"
                alt=""
                width={1149}
                height={758}
              />
            </div>
            <div className="shape2">
              <Image
                src="/assets/images/shape/testimonialShape1_2.png"
                alt=""
                width={983}
                height={758}
              />
            </div>
            <div className="container">
              <div className="section-title text-center mxw-685 mx-auto">
                <SectionTitle
                  SubTitle={t("subtitle")}
                  Title={t("title")}
                />
              </div>
              <div className="slider-area testimonialSliderOne">
                <div className="swiper gt-slider" id="testimonialSliderOne">
                  <div className="swiper-wrapper cs_slider_gap_301">
                    <Slider {...settings}>
                      {testimonials.map((item, index) => (
                        <div key={index} className="swiper-slide">
                          <article className="testimonial-card-modern">
                            <div
                              className="testimonial-card-modern__accent"
                              aria-hidden="true"
                            />
                            <div className="testimonial-card-modern__quote">
                              <Image
                                src="/assets/images/icon/quoteIcon.svg"
                                alt=""
                                width={32}
                                height={32}
                              />
                            </div>
                            <ul
                              className="testimonial-card-modern__stars"
                              aria-hidden="true"
                            >
                              {Array(5)
                                .fill()
                                .map((_, i) => (
                                  <li key={i}>
                                    <Image
                                      src="/assets/images/icon/starIcon1_1.svg"
                                      alt=""
                                      width={16}
                                      height={15}
                                    />
                                  </li>
                                ))}
                            </ul>
                            <p className="testimonial-card-modern__text">
                              {item.desc}
                            </p>
                            <div className="testimonial-card-modern__author">
                              <div className="testimonial-card-modern__avatar">
                                <Image
                                  src={item.img}
                                  alt=""
                                  width={52}
                                  height={52}
                                />
                              </div>
                              <div className="testimonial-card-modern__meta">
                                <h5 className="testimonial-card-modern__name">
                                  {item.title}
                                </h5>
                                <p className="testimonial-card-modern__role">
                                  {item.subTitle}
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="slider-pagination" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
