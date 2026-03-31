import WebPageSchema from "@/components/seo/WebPageSchema";

export const metadata = {
  title: "Privacy Policy | Clever Crow",
  description: "Privacy Policy & Data Protection guidelines for Clever Crow Strategies.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white py-24 sm:py-32 min-h-[80vh]">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="bg-white shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 p-8 sm:p-16">
          <h1 className="text-3xl font-black text-gray-900 sm:text-4xl mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">
              Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            
            <div className="mt-6 mb-10 text-sm font-medium text-yellow-800 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
               📝 Please note: This is a placeholder structure for your official Privacy Policy document. Replace these sections with the fully drafted legal text from your legal counsel.
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">1. Information We Collect</h3>
            <p className="mb-6 leading-relaxed">
              We collect information you provide directly to us when you fill out a form, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, phone number, and any other details you choose to provide.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">2. How We Use Information</h3>
            <p className="mb-6 leading-relaxed">
              We use the information we collect to operate, evaluate, and improve our services, as well as to communicate with you regarding your inquiries, marketing services, and project updates.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">3. Information Sharing</h3>
            <p className="mb-6 leading-relaxed">
              We do not sell or share your personal information with third parties except as necessary to provide our core services, comply with legal obligations, or protect our rights and the safety of our users.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">4. Data Security</h3>
            <p className="mb-6 leading-relaxed">
              We take rigorous, industry-standard measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mt-10 mb-4">5. Contact Us</h3>
            <p className="mb-6 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us immediately at <a href="mailto:hello@clevercrow.in" className="text-yellow-600 hover:text-yellow-700 font-bold transition-colors">hello@clevercrow.in</a>.
            </p>
          </div>
        </div>
      </div>
      <WebPageSchema
        title="Privacy Policy | Clever Crow"
        description="Privacy Policy & Data Protection guidelines for Clever Crow Strategies."
        url="https://clevercrow.in/privacy"
      />
    </main>
  );
}
