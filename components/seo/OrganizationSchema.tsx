export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Clever Crow Strategies LLP",
    "url": "https://clevercrow.in",
    "logo": "https://clevercrow.in/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress":
        "D.No. 8-1-83B-14, Business Bay Center, Udupi - Manipal Highway, Kunjibettu",
      "addressLocality": "Udupi",
      "addressRegion": "Karnataka",
      "postalCode": "576102",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/clevercrow.strategies",
      "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/",
      "https://www.linkedin.com/company/clever-crow-strategies/"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
