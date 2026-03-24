type WebPageSchemaProps = {
  title: string;
  description: string;
  url: string;
};

export default function WebPageSchema({
  title,
  description,
  url,
}: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "Clever Crow Strategies LLP",
      "url": "https://clevercrow.in",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
