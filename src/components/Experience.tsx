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

const INSTITUTION_LOGOS: Record<string, string> = {
  'Algoverse': '/logos/algoverse.ico',
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

interface OrgGroup {
  institution: string;
  location: string;
  roles: Role[];
}

function groupByOrganization(items: Role[]): OrgGroup[] {
  const groups = new Map<string, OrgGroup>();
  for (const role of items) {
    const key = role.institution;
    if (!groups.has(key)) {
      groups.set(key, {
        institution: role.institution,
        location: role.location,
        roles: [],
      });
    }
    groups.get(key)!.roles.push(role);
  }
  return Array.from(groups.values());
}

function roleEndTime(role: Role): number {
  return role.endDate ? new Date(role.endDate).getTime() : Infinity;
}

function sortRolesByRecency(items: Role[]): Role[] {
  return [...items].sort((a, b) => {
    const aEnd = roleEndTime(a);
    const bEnd = roleEndTime(b);
    if (aEnd !== bEnd) return bEnd - aEnd;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
}

function sortGroupsByRecency(groups: OrgGroup[]): OrgGroup[] {
  return [...groups]
    .map((g) => ({ ...g, roles: sortRolesByRecency(g.roles) }))
    .sort((a, b) => {
      const aLatest = Math.max(...a.roles.map(roleEndTime));
      const bLatest = Math.max(...b.roles.map(roleEndTime));
      if (aLatest !== bLatest) return bLatest - aLatest;
      const aStart = Math.max(...a.roles.map((r) => new Date(r.startDate).getTime()));
      const bStart = Math.max(...b.roles.map((r) => new Date(r.startDate).getTime()));
      return bStart - aStart;
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
  const groups = sortGroupsByRecency(groupByOrganization(roles));

  return (
    <section id="experience" className="py-12 sm:py-16 lg:py-20 bg-surface border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Experience
          </h2>
        </motion.div>

        <div className="space-y-10">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.05 }}
              className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5 lg:gap-10"
            >
              <div className="flex items-start gap-3">
                {INSTITUTION_LOGOS[group.institution] && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={INSTITUTION_LOGOS[group.institution]}
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8 flex-shrink-0 rounded object-contain mt-0.5"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                    {group.institution}
                  </h3>
                  <div className="text-sm text-gray-500 mt-1">{group.location}</div>
                </div>
              </div>

              <div className="space-y-4 border-l-2 border-gray-100 pl-5">
                {group.roles.map((role, roleIndex) => (
                  <div key={`${role.position}-${role.startDate}-${roleIndex}`} className="relative">
                    <div className="absolute -left-[calc(1.25rem+1px)] top-1.5 w-2 h-2 rounded-full bg-teal-600" />
                    <div className="font-medium text-gray-900">{role.position}</div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {formatRange(role)}
                      {role.advisor && (
                        <>
                          {' · '}
                          <span>Advised by {role.advisor}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
