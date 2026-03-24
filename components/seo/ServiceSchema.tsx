type ServiceSchemaProps = {
  serviceName: string;
  serviceDescription: string;
  pageUrl: string;
};

export default function ServiceSchema({
  serviceName,
  serviceDescription,
  pageUrl,
}: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "Organization",
      "name": "Clever Crow Strategies LLP",
      "url": "https://clevercrow.in",
    },
    "areaServed": {
      "@type": "Country",
      "name": "India",
    },
    "url": pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
