"use client";
import { useEffect, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const BlogDetails = ({ articleKey = "default" }) => {
  let translationKey = "Default";
  if (articleKey === "choose-hosting-plan") {
    translationKey = "ChooseHosting";
  } else if (articleKey === "network-systems") {
    translationKey = "NetworkSystems";
  } else if (articleKey === "cybersecurity-solutions") {
    translationKey = "Cybersecurity";
  }
  const t = useTranslations(`BlogArticle_${translationKey}`);
  const tUi = useTranslations("BlogDetailsUI");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [shareLinks, setShareLinks] = useState(null);

  useEffect(() => {
    loadBackgroudImages();
  }, []);

  useEffect(() => {
    const u = encodeURIComponent(window.location.href);
    setShareLinks({
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      twitter: `https://twitter.com/intent/tweet?url=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${u}`,
    });
  }, []);

  return (
    <section
      className="news-standard section-padding fix blog-details-page"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container">
        <div className="news-details-area">
          <div className="row g-4 g-lg-5 justify-content-center">
            <div className="col-12 col-xl-10 col-xxl-9">
              <article className="blog-post-details blog-details-inner">
                <div className="single-blog-post">
                  {t("topImage") && (
                    <div
                      className="post-featured-thumb blog-details-featured-thumb mb-4 wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      <Image
                        src={t("topImage")}
                        alt={t("topImageAlt", { default: "Hosting" })}
                        width={1200}
                        height={630}
                        sizes="(max-width: 768px) 100vw, min(920px, 92vw)"
                        priority
                        className="blog-details-hero-img"
                      />
                    </div>
                  )}
                  <div className="post-content">
                    <ul
                      className="post-list d-flex flex-wrap align-items-center wow fadeInUp"
                      data-wow-delay=".2s"
                      style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
                    >
                      <li>
                        <i className="bi bi-person"></i>
                        {t("author", { default: "بواسطة ENS" })}
                      </li>
                      <li>
                        <Image
                          src="/assets/images/icon/tagIcon.png"
                          alt="img"
                          width={20}
                          height={20}
                        />
                        {t("category", { default: "الأستضافة المشتركة" })}
                      </li>
                    </ul>
                    <h3
                      className="blog-details-title wow fadeInUp"
                      data-wow-delay=".4s"
                    >
                      {t("title", { default: "Article Title" })}
                    </h3>
                    {t.raw("paragraphs") &&
                      Array.isArray(t.raw("paragraphs")) &&
                      t.raw("paragraphs").map((para, index) => (
                        <p
                          key={index}
                          className="blog-details-body mb-4 wow fadeInUp"
                          data-wow-delay={`${0.6 + index * 0.2}s`}
                        >
                          {para}
                        </p>
                      ))}
                    {t("highlightText") && (
                      <div
                        className="hilight-text blog-details-highlight mt-4 mb-4 wow fadeInUp"
                        data-wow-delay=".8s"
                      >
                        <p className="mb-0">{t("highlightText")}</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                        >
                          <path
                            d="M7.71428 20.0711H0.5V5.64258H14.9286V20.4531L9.97665 30.3568H3.38041L8.16149 20.7947L8.5233 20.0711H7.71428Z"
                            stroke="#7444FD"
                          />
                          <path
                            d="M28.2846 20.0711H21.0703V5.64258H35.4989V20.4531L30.547 30.3568H23.9507L28.7318 20.7947L29.0936 20.0711H28.2846Z"
                            stroke="#7444FD"
                          />
                        </svg>
                      </div>
                    )}
                    {t.raw("images") &&
                      Array.isArray(t.raw("images")) &&
                      t.raw("images").length > 0 && (
                        <div
                          className="row g-4 wow fadeInUp blog-details-gallery"
                          data-wow-delay="1s"
                        >
                          {t.raw("images").map((img, index) => (
                            <div key={index} className="col-md-6">
                              <div className="details-image blog-details-inline-img">
                                <Image
                                  src={img.src}
                                  alt={img.alt || "img"}
                                  width={640}
                                  height={420}
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="w-100 h-auto"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    {t.raw("finalParagraphs") &&
                      Array.isArray(t.raw("finalParagraphs")) &&
                      t.raw("finalParagraphs").map((para, index) => (
                        <p
                          key={index}
                          className={`blog-details-body wow fadeInUp ${index === 0 ? "pt-4 mt-2" : "pt-3"}`}
                          data-wow-delay={`${1.2 + index * 0.2}s`}
                        >
                          {para}
                        </p>
                      ))}
                    {t("bottomImage") && (
                      <div
                        className="post-featured-thumb blog-details-featured-thumb mt-5 wow fadeInUp"
                        data-wow-delay="1.4s"
                      >
                        <Image
                          src={t("bottomImage")}
                          alt={t("bottomImageAlt", { default: "Hosting" })}
                          width={1200}
                          height={630}
                          sizes="(max-width: 768px) 100vw, min(920px, 92vw)"
                          className="blog-details-hero-img"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="row tag-share-wrap align-items-lg-center mt-4 mb-30 wow fadeInUp gy-3"
                  data-wow-delay=".8s"
                >
                  <div className="col-lg-8 col-12">
                    <div className="tagcloud d-flex flex-wrap align-items-center gap-2">
                      <h6 className="blog-details-tags-label mb-0">
                        {t("tagsLabel", { default: "Tags:" })}
                      </h6>
                      {t.raw("tags") &&
                        Array.isArray(t.raw("tags")) &&
                        t.raw("tags").map((tag, index) => (
                          <span key={index} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <div
                    className="col-lg-4 col-12 mt-1 mt-lg-0 text-lg-end wow fadeInUp"
                    data-wow-delay="1.2s"
                  >
                    <div className="social-share d-flex flex-wrap align-items-center justify-content-lg-end gap-2 gap-sm-3">
                      <span className="blog-details-share-label mb-0">
                        {tUi("shareLabel")}
                      </span>
                      <a
                        href={shareLinks?.facebook ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href={shareLinks?.twitter ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                      >
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a
                        href={shareLinks?.linkedin ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                      <a
                        href={shareLinks?.pinterest ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Pinterest"
                      >
                        <i className="bi bi-pinterest"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            {/* <div className="col-12 col-lg-4">

                    <div className="main-sidebar">
                        <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".9s">
                            <div className="wid-title">
                                <h3>Tags</h3>
                            </div>
                            <div className="news-widget-categories">
                                <div className="tagcloud">
                                    <a href="#">Security</a>
                                    <a href="#">Business</a>
                                    <a href="#">Digital</a>
                                    <a href="#">Technology</a>
                                    <a href="#">Change</a>
                                    <a href="#">Video</a>
                                    <a href="#">UI/UX Desing</a>
                                    <a href="#">Startup</a>
                                    <a href="#">Services</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
