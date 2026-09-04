'use client';

import { motion } from 'framer-motion';

interface Role {
  position: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  advisor?: string;
}

interface Organization {
  institution: string;
  location: string;
  roles: Role[];
}

const INSTITUTION_LOGOS: Record<string, string> = {
  Algoverse: '/logos/algoverse.ico',
  'UNC Pembroke': '/logos/uncp.ico',
  'Pembroke Undergraduate Research and Creativity (PURC) Center': '/logos/uncp.ico',
  'Emerging Technology Institute': '/logos/eti.png',
};

const roles: Role[] = [
  {
    position: 'AI Safety Research Fellow',
    institution: 'Algoverse',
    location: 'Remote',
    startDate: '2026-02-01',
    endDate: '2026-04-30',
  },
  {
    position: 'Undergraduate Research Assistant',
    institution: 'UNC Pembroke',
    location: 'Pembroke, NC',
    startDate: '2024-05-01',
    endDate: '2026-05-01',
    advisor: 'Dr. Prashanth BusiReddyGari',
  },
  {
    position: 'SOC Analyst',
    institution: 'UNC Pembroke',
    location: 'Pembroke, NC',
    startDate: '2023-07-01',
    endDate: '2026-05-01',
  },
  {
    position: 'Undergraduate Research Assistant',
    institution: 'UNC Pembroke',
    location: 'Pembroke, NC',
    startDate: '2023-09-01',
    endDate: '2025-12-01',
    advisor: 'Dr. Shaohu Zhang',
  },
  {
    position: 'Research Assistant',
    institution: 'Pembroke Undergraduate Research and Creativity (PURC) Center',
    location: 'Pembroke, NC',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    advisor: 'Dr. Prashanth BusiReddyGari and Dr. Shaohu Zhang',
  },
  {
    position: 'Research Assistant',
    institution: 'Pembroke Undergraduate Research and Creativity (PURC) Center',
    location: 'Pembroke, NC',
    startDate: '2024-01-01',
    endDate: '2024-04-01',
    advisor: 'Dr. Shaohu Zhang',
  },
  {
    position: 'Programming Intern',
    institution: 'Emerging Technology Institute',
    location: 'Pembroke, NC',
    startDate: '2024-01-01',
    endDate: '2024-04-01',
  },
];

function roleEndTime(role: Role): number {
  return role.endDate ? new Date(role.endDate).getTime() : Infinity;
}

function sortRolesByRecency(items: Role[]): Role[] {
  return [...items].sort((a, b) => {
    const endDifference = roleEndTime(b) - roleEndTime(a);
    if (endDifference !== 0) return endDifference;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

function groupByOrganization(items: Role[]): Organization[] {
  const organizations = new Map<string, Organization>();

  for (const role of items) {
    if (!organizations.has(role.institution)) {
      organizations.set(role.institution, {
        institution: role.institution,
        location: role.location,
        roles: [],
      });
    }
    organizations.get(role.institution)!.roles.push(role);
  }

  return Array.from(organizations.values())
    .map((organization) => ({
      ...organization,
      roles: sortRolesByRecency(organization.roles),
    }))
    .sort((a, b) => {
      const latestA = Math.max(...a.roles.map(roleEndTime));
      const latestB = Math.max(...b.roles.map(roleEndTime));
      return latestB - latestA;
    });
}

function formatDate(dateString: string): string {
  const [year, month] = dateString.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function formatRange(role: Role): string {
  const start = formatDate(role.startDate);
  const end = role.endDate ? formatDate(role.endDate) : 'Present';
  return `${start} – ${end}`;
}

export default function Experience() {
  const organizations = groupByOrganization(roles);

  return (
    <section id="experience" className="watercolor-section watercolor-paper py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="section-heading text-2xl font-bold text-gray-900 sm:text-3xl">Experience</h2>
        </motion.div>

        <div className="border-y border-gray-200">
          {organizations.map((organization, organizationIndex) => (
            <motion.article
              key={organization.institution}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(organizationIndex * 0.05, 0.15) }}
              className="border-b border-gray-200 py-6 last:border-b-0 sm:py-7"
            >
              <header className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-background p-2 sm:h-12 sm:w-12">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={INSTITUTION_LOGOS[organization.institution]}
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-base font-bold leading-snug text-gray-900 sm:text-[17px]">
                    {organization.institution}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{organization.location}</p>
                </div>
              </header>

              <div className="ml-[21px] mt-5 border-l border-gray-200 pl-[38px] sm:ml-6 sm:pl-10">
                {organization.roles.map((role, roleIndex) => (
                  <div
                    key={`${role.position}-${role.startDate}`}
                    className="relative border-b border-gray-100 pb-5 last:border-b-0 last:pb-0 [&:not(:first-child)]:pt-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[43px] h-2 w-2 rounded-full border-2 border-surface bg-teal-600 ring-1 ring-teal-600 sm:-left-[45px] ${roleIndex === 0 ? 'top-[0.45rem]' : 'top-[1.7rem]'}`}
                    />
                    <div className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-8">
                      <h4 className="font-semibold leading-snug text-gray-900">{role.position}</h4>
                      <p className="text-sm text-gray-500 sm:whitespace-nowrap">
                        {formatRange(role)}
                      </p>
                    </div>
                    {role.advisor && (
                      <p className="mt-2 text-sm leading-relaxed text-gray-500">
                        Advised by {role.advisor}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
