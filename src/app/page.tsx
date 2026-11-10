import { site } from "@/config/site";
import { ContactPage } from "@/components/contact-page";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  description: `${site.title}. ${site.bio}`,
  url: site.url,
  telephone: site.contact.phone.replace(/\s/g, ""),
  address: { "@type": "PostalAddress", addressLocality: "Đà Nẵng", addressCountry: "VN" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ContactPage />
    </>
  );
}
