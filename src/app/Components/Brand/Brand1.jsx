"use client";
import Image from "next/image";
import { useLocale } from "next-intl";

import brand1Data from "../../Data/brand1Data.json";

const CHECKMARK_SRC = "/assets/images/icon/checkmarkIcon.svg";
import Link from "next/link";

/** بيانات السيكشن والكروت من `src/app/Data/brand1Data.json` */
const {
  title: sectionTitle,
  sectionLead,
  noBrands: noBrandsText,
  cardTitleFallback,
  brands: brandsFromFile,
} = brand1Data;

function resolveLang(locale) {
  const base = String(locale || "")
    .split(/[-_]/)[0]
    .toLowerCase();
  return base === "ar" ? "ar" : "en";
}

function pickLocalized(obj, lang) {
  if (obj == null) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] ?? obj.en ?? obj.ar ?? "";
}

function brandDisplayName(brand, lang, index) {
  const n = brand?.name;
  if (typeof n === "string" && n.trim()) return n;
  if (n && typeof n === "object") {
    const v = n[lang] ?? n.en ?? n.ar;
    if (v && String(v).trim()) return v;
  }
  return `${pickLocalized(cardTitleFallback, lang)} ${index + 1}`;
}

/** فقرات الوصف: نص واحد، أو مصفوفة فقرات لكل لغة داخل `description` */
function brandDescriptionParagraphs(brand, lang) {
  const d = brand?.description;
  if (d == null) return [];

  if (typeof d === "string" && d.trim()) return [d.trim()];

  if (typeof d === "object" && !Array.isArray(d)) {
    const v = d[lang] ?? d.en ?? d.ar;
    if (v == null) return [];
    if (typeof v === "string" && v.trim()) return [v.trim()];
    if (Array.isArray(v)) {
      return v.map((s) => String(s).trim()).filter(Boolean);
    }
  }

  return [];
}

function brandPoints(brand, lang) {
  const p = brand?.points;
  if (!p) return [];
  if (Array.isArray(p)) return p.filter(Boolean);
  const list = p[lang] ?? p.ar ?? p.en;
  return Array.isArray(list) ? list.filter(Boolean) : [];
}

const Brand1 = () => {
  const locale = useLocale();
  const lang = resolveLang(locale);
  const brands = Array.isArray(brandsFromFile) ? brandsFromFile : [];

  if (brands.length === 0) {
    return (
      <div
        className="brand-slider-section brand1-cards-section section-padding"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="brand-slider-container-wrapper style1">
          <div className="container">
            <div className="brand-slider-wrapper style1">
              <div className="text-center mxw-685 mx-auto brand1-header-block">
                <h2
                  className="single-section-title wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  {pickLocalized(sectionTitle, lang)}
                </h2>
                <div className="brand1-lead">
                  {pickLocalized(sectionLead, lang)}
                </div>
              </div>
              <div className="row">
                <div className="text-center">
                  <p>{pickLocalized(noBrandsText, lang)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="brand-slider-section brand1-cards-section section-padding"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="brand-slider-container-wrapper style1">
        <div className="container">
          <div className="brand-slider-wrapper style1">
            <div className="text-center mxw-685 mx-auto brand1-header-block">
              <h2
                className="single-section-title wow fadeInUp"
                data-wow-delay=".2s"
              >
                {pickLocalized(sectionTitle, lang)}
              </h2>
              <div className="brand1-lead">
                {pickLocalized(sectionLead, lang)}
              </div>
            </div>
            <div className="row">
              <div className="brandSliderOne brand-clients-wrap">
                <div className="brand-clients-grid">
                  {brands.map((brand, index) => {
                    const descParagraphs = brandDescriptionParagraphs(
                      brand,
                      lang,
                    );
                    return (
                      <div
                        key={brand.id ?? index}
                        className="brand-client-card"
                      >
                        <div className="card">
                          <div className="card-img">
                            <div className="card-img-inner">
                              <Image
                                src={brand.img}
                                alt={`${pickLocalized(brand.name, lang) || `Brand ${index + 1}`}`}
                                width={400}
                                height={150}
                                className="brand-card-image card-imgs"
                              />
                            </div>
                          </div>
                          <div className="project-info">
                            <h3 className="project-title brand-card-company-title text-center">
                              {brandDisplayName(brand, lang, index)}
                            </h3>
                            {descParagraphs.length > 0 ? (
                              <div className="brand-card-description-block">
                                {descParagraphs.map((para, pi) => (
                                  <p
                                    key={pi}
                                    className="text-center brand-card-description"
                                  >
                                    {para}
                                  </p>
                                ))}
                              </div>
                            ) : null}
                            <div className="brand-card-points">
                              {brandPoints(brand, lang).map((text, i) => (
                                <div key={i} className="brand-card-point">
                                  <Image
                                    src={CHECKMARK_SRC}
                                    alt=""
                                    width={15}
                                    height={15}
                                    className="brand-card-check"
                                    aria-hidden
                                  />
                                  <p className="brand-card-paragraph">{text}</p>
                                </div>
                              ))}
                            </div>
                            {brand.url && (
                              <div className="brand-card-link text-center">
                                <Link href={brand.url} target="_blank" rel="noopener noreferrer">
                                  <i className="bi bi-arrow-up-right"></i> {locale === "ar" ? "زيارة الموقع" : "Visit Website"}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand1;
