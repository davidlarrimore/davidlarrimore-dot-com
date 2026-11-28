interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  /** Ranked strongest first (lib/resume-content.json): the top ones show, the rest fold away. */
  achievements: string[];
}

const SHOWN = 3;

/**
 * One role on the résumé (Read surface). Dates sit at the right of the title row (under it on
 * phones), so tenure still scans down the page without spending a column. No company logos
 * (Dave's call, 2026-11-28): names carry the recognition, and official seals are not used as
 * decoration. The JSON's image fields stay for other consumers.
 */
export default function ResumeExperienceItem({ title, company, location, period, description, achievements }: ExperienceItemProps) {
  const shown = achievements.slice(0, SHOWN);
  const more = achievements.slice(SHOWN);

  return (
    <article className="resume-role">
      <div className="resume-role-head">
        <div>
          <h3 className="resume-role-title">{title}</h3>
          <p className="resume-role-org">
            <span className="resume-role-company">{company}</span>
            <span aria-hidden="true"> · </span>
            <span>{location}</span>
          </p>
        </div>
        <p className="resume-role-period">{period}</p>
      </div>

      <div className="resume-role-body">
        <p className="resume-role-desc">{description}</p>

        {shown.length > 0 && (
          <ul className="resume-role-list">
            {shown.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        )}

        {more.length > 0 && (
          <details className="resume-role-more">
            <summary>
              More from this role <span className="resume-role-more-count">({more.length})</span>
            </summary>
            <ul className="resume-role-list">
              {more.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </article>
  );
}
