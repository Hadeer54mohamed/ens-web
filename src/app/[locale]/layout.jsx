import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "../i18n/routing";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  if (locale === "ar") {
    return {
      title: {
        default: "ENS - شركة تطوير البرمجيات وتصميم المواقع الإلكترونية",
        template: "%s | ENS - شركة تطوير البرمجيات وتصميم المواقع",
      },
      description: "ENS - شركة متخصصة في تطوير البرمجيات وتصميم المواقع الإلكترونية والتطبيقات باستخدام أحدث التقنيات مثل Next.js و Node.js. نقدم حلول استضافة المواقع، برمجة التطبيقات، والشبكات والحلول الأمنية.",
      keywords: "تطوير برمجيات, تصميم مواقع, Next.js, Node.js, استضافة مواقع, تطبيقات, حلول أمنية, ENS",
      openGraph: {
        title: "ENS - شركة تطوير البرمجيات وتصميم المواقع الإلكترونية",
        description: "ENS - شركة متخصصة في تطوير البرمجيات وتصميم المواقع الإلكترونية والتطبيقات",
        locale: "ar_EG",
      },
      alternates: {
        canonical: `/${locale}`,
        languages: {
          'ar': `/${locale}`,
          'en': `/en`,
        },
      },
    };
  } else {
    return {
      title: {
        default: "ENS - Software Development & Web Design Company",
        template: "%s | ENS - Software Development & Web Design",
      },
      description: "ENS - A specialized company in software development, web design, and applications using the latest technologies like Next.js and Node.js. We provide web hosting solutions, application development, and network security solutions.",
      keywords: "software development, web design, Next.js, Node.js, web hosting, applications, security solutions, ENS",
      openGraph: {
        title: "ENS - Software Development & Web Design Company",
        description: "ENS - A specialized company in software development, web design, and applications",
        locale: "en_US",
      },
      alternates: {
        canonical: `/${locale}`,
        languages: {
          'ar': `/ar`,
          'en': `/${locale}`,
        },
      },
    };
  }
}

export default async function LocaleLayout({ children, params }) {
  
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <div dir={dir} lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
