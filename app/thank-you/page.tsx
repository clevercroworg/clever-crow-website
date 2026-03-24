export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          Thank You!
        </h1>

        <p className="mt-4 text-gray-600">
          We’ve received your request.  
          Our team will contact you shortly.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-yellow-400 px-6 py-3
                     font-semibold text-gray-900 transition hover:opacity-90"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
