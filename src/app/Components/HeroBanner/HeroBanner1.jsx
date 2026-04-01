"use client";
import { useState, useEffect } from "react";
import safeParse from "@/lib/utils/safeHtmlParser";
import Image from "next/image";
import Link from "next/link";

const HeroBanner1 = ({
  subtitle,
  title,
  content,
  btnname,
  btnurl,
  btntwo,
  btn2url,
  cusimg,
  cusnumber,
  cuscontent,
  rating,
  ratingcon,
  img,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!content) {
      setDisplayedText("");
      return;
    }

    const fullText = content;
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 35); // سرعة الكتابة (كل 35ms حرف)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content]);

  // Reset when content changes
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [content]);

  return (
    <section className="intro-section" dir="rtl">
      <div className="intro-container-wrapper style1">
        <div className="container">
          <div className="intro-wrapper style1 fix">
            <div className="shape1">
              <Image
                src="/assets/images/shape/introShape1_1.png"
                alt="img"
                width={1149}
                height={854}
              />
            </div>
            <div className="shape2">
              <Image
                src="/assets/images/shape/introShape1_2.png"
                alt="img"
                width={983}
                height={954}
              />
            </div>
            <div className="shape3 d-none d-xxl-block cir36">
              <Image
                src="/assets/images/shape/introShape1_3.png"
                alt="img"
                width={58}
                height={58}
              />
            </div>
            <div className="shape4 d-none d-xxl-block cir36">
              <Image
                src="/assets/images/shape/introShape1_4.png"
                alt="img"
                width={58}
                height={58}
              />
            </div>
            <div className="shape5 d-none d-xxl-block cir36">
              <Image
                src="/assets/images/shape/introShape1_5.png"
                alt="img"
                width={57}
                height={58}
              />
            </div>
            <div className="container">
              <div className="row">
                <div className="col-xl-7 order-2 order-xl-1 ">
                  <div className="intro-content">
                    <div className="intro-section-title">
                      <div className="intro-subtitle">
                        {typeof subtitle === "string"
                          ? safeParse(subtitle)
                          : subtitle}{" "}
                        <Image
                          src="/assets/images/icon/fireIcon.svg"
                          alt="img"
                          width={16}
                          height={17}
                        />
                      </div>
                      <h1
                        className="intro-title wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        {title}
                      </h1>
                      <p
                        className="intro-desc animated-text wow fadeInUp"
                        data-wow-delay=".4s"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {displayedText}
                        {currentIndex < content.length && (
                          <span className="typing-cursor">|</span>
                        )}
                      </p>
                    </div>
                    <div
                      className="btn-wrapper style1 wow fadeInUp"
                      data-wow-delay=".6s"
                    >
                      <Link className="theme-btn" href={btnurl}>
                        {btnname}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_11_22)">
                            <path
                              d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_11_22">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <Link
                        className="theme-btn style2 wow fadeInUp"
                        data-wow-delay=".2s"
                        href={btn2url}
                      >
                        {btntwo}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_11_27)">
                            <path
                              d="M11.6118 3.61182L10.8991 4.32454L14.0706 7.49603H0V8.50398H14.0706L10.8991 11.6754L11.6118 12.3882L16 7.99997L11.6118 3.61182Z"
                              fill="#282C32"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_11_27">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 order-1 order-xl-2  px-0">
                  <div className="intro-thumb">
                    <video
                      className=" mobile-video wow fadeInUp  "
                      src="/HeroVideo.mp4"
                      autoPlay
                      muted
                      playsInline
                      loop
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner1;
