interface ServiceItem {
  role: string;
  organization: string;
  date: string;
  description?: string;
}

interface ServiceGroup {
  category: string;
  items: ServiceItem[];
}

const serviceGroups: ServiceGroup[] = [
  {
    category: 'Peer Review',
    items: [
      {
        role: 'Reviewer, Generative and Agentic AI for Biology (GenBio) Workshop',
        organization: 'ICML 2026',
        date: '2026',
      },
      {
        role: 'Reviewer, Muslims in ML (MusIML) Workshop',
        organization: 'ICML 2026',
        date: '2026',
      },
    ],
  },
  {
    category: 'Leadership',
    items: [
      {
        role: 'President, AI@UNCP',
        organization: 'University of North Carolina at Pembroke',
        date: 'Nov 2023 – May 2026',
        description:
          'Led organization meetings, coordinated student participation in hackathons, and oversaw HackUNCP 2025, HackUNCP 2026, and university-wide programming contests.',
      },
      {
        role: 'Founder, AI@UNCP',
        organization: 'University of North Carolina at Pembroke',
        date: 'Sep 2023 – May 2026',
        description:
          'Founded AI@UNCP to provide UNC Pembroke students with opportunities to explore artificial intelligence.',
      },
      {
        role: 'Lead Organizer, HackUNCP 2026',
        organization: 'University of North Carolina at Pembroke',
        date: 'Feb 2026',
        description:
          'Organized and led HackUNCP 2026, a 24-hour hackathon at UNC Pembroke.',
      },
      {
        role: 'Lead Organizer, HackUNCP 2025',
        organization: 'University of North Carolina at Pembroke',
        date: 'Mar 2025',
        description:
          'Organized and led HackUNCP 2025, the first official hackathon at UNC Pembroke.',
      },
    ],
  },
];

export default function Service() {
  return (
    <section id="service" className="watercolor-section watercolor-mist py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900">Professional Activities</h2>
        </div>

        <div className="space-y-10">
          {serviceGroups.map((group) => (
            <div
              key={group.category}
            >
              <h3 className="text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase mb-5">
                {group.category}
              </h3>
              <div className="divide-y divide-gray-200/80">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={`${item.role}-${itemIndex}`}
                    className="grid gap-x-8 py-5 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 leading-snug">
                        {item.role}
                      </h4>
                      <div className="text-sm text-gray-600 mt-0.5">
                        {item.organization}
                      </div>
                      <div className="mt-1 text-sm text-gray-500 sm:hidden">
                        {item.date}
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-500 leading-relaxed mt-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="hidden text-sm text-gray-500 mt-0.5 whitespace-nowrap sm:block">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
