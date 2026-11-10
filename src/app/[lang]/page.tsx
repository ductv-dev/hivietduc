import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactPage } from "@/components/contact-page";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: t.intro,
    url: `${site.url}/${lang}`,
    image: `${site.url}${site.background}`,
    telephone: `+${site.contact.phoneIntl}`,
    address: { "@type": "PostalAddress", addressLocality: "Da Nang", addressCountry: "VN" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ContactPage lang={lang} t={t} />
    </>
  );
}
