type OutcomeStripProps = {
  outcomes: string[];
};

export default function OutcomeStrip({ outcomes }: OutcomeStripProps) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-600">
          {outcomes.map((outcome, index) => (
            <span key={index} className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <strong className="font-medium text-gray-900">
                {outcome}
              </strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
    