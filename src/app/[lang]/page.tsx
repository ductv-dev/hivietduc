import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { hasLocale } from "@/i18n/config";
import { getDictionary, toClient } from "@/i18n/dictionaries";
import { ContactPage } from "@/components/contact-page";
import { AreasAndFaq, ListingsSection } from "@/components/home-sections";
import { JsonLd } from "@/components/json-ld";
import { channelHref } from "@/lib/contact";
import { availableListings, listingPath, pick } from "@/lib/listings";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const items = availableListings();
  const pageUrl = `${site.url}/${lang}`;

  const graph = [
    {
      "@type": "RealEstateAgent",
      "@id": `${site.url}/#agent`,
      name: site.name,
      description: t.intro,
      url: pageUrl,
      image: site.avatar ? `${site.url}${site.avatar}` : undefined,
      logo: `${site.url}/icon/512`,
      telephone: `+${site.contact.phoneIntl}`,
      address: { "@type": "PostalAddress", addressLocality: "Đà Nẵng", addressCountry: "VN" },
      areaServed: Object.values(t.areas).map((name) => ({ "@type": "Place", name })),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${site.contact.phoneIntl}`,
        contactType: "sales",
        areaServed: "VN",
      },
      sameAs: [channelHref("zalo"), channelHref("whatsapp")],
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: lang,
      mainEntity: t.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    ...(items.length
      ? [
          {
            "@type": "ItemList",
            name: t.listing.title,
            itemListElement: items.map((l, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${listingPath(lang, l.slug)}`,
              name: pick(l.title, lang),
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <ContactPage lang={lang} t={toClient(t)}>
        <ListingsSection items={items} lang={lang} t={t} />
        <AreasAndFaq t={t} />
      </ContactPage>
    </>
  );
}
