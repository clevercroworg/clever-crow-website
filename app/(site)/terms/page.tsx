import WebPageSchema from "@/components/seo/WebPageSchema";

export const metadata = {
  title: "Terms of Service | Clever Crow",
  description: "Terms of Service and usage guidelines for Clever Crow Strategies.",
};

export default function TermsOfServicePage() {
  return (
    <main className="bg-white py-24 sm:py-32 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 p-8 sm:p-16">
          <h1 className="text-3xl font-black text-gray-900 sm:text-4xl mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">
              Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            
            <div className="mt-6 mb-10 text-sm font-medium text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-100">
               📝 Please note: This is a placeholder structure for your official Terms of Service document. Replace these sections with the fully drafted legal text from your legal counsel.
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Acceptance of Terms</h3>
            <p className="mb-6 leading-relaxed">
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. Provision of Services</h3>
            <p className="mb-6 leading-relaxed">
              Clever Crow Strategies LLP is constantly innovating in order to provide the best possible experience for its users. You acknowledge and agree that the form and nature of the services which we provide may change from time to time without prior notice to you.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Use of Services</h3>
            <p className="mb-6 leading-relaxed">
              You agree to use the services only for purposes that are permitted by (a) the Terms and (b) any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Intellectual Property</h3>
            <p className="mb-6 leading-relaxed">
              All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, and data compilations is the property of Clever Crow Strategies LLP or its content suppliers and protected by international copyright laws.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Limitation of Liability</h3>
            <p className="mb-6 leading-relaxed">
              You expressly understand and agree that Clever Crow Strategies LLP shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use of or inability to use the service.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">6. Contact Information</h3>
            <p className="mb-6 leading-relaxed">
              If you have any questions or concerns regarding our Terms of Service, please contact us immediately at <a href="mailto:hello@clevercrow.in" className="text-yellow-600 hover:text-yellow-700 font-bold transition-colors">hello@clevercrow.in</a>.
            </p>
          </div>
        </div>
      </div>
      <WebPageSchema
        title="Terms of Service | Clever Crow"
        description="Terms of Service and usage guidelines for Clever Crow Strategies."
        url="https://clevercrow.in/terms"
      />
    </main>
  );
}
