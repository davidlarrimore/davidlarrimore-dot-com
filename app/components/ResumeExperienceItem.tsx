import Avatar from "./ds/Avatar";

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  /** Ranked strongest first (lib/resume-content.json): the top ones show, the rest fold away. */
  achievements: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageLayout?: string;
  imageShape?: string;
}

const SHOWN = 3;

/** One role on the résumé (Read surface): heading, company, dates, then the strongest results. */
export default function ResumeExperienceItem({
  title,
  company,
  location,
  period,
  description,
  achievements,
  imageSrc,
  imageAlt,
  imageLayout,
}: ExperienceItemProps) {
  const shown = achievements.slice(0, SHOWN);
  const more = achievements.slice(SHOWN);
  const alt = imageAlt || `${company} logo`;

  return (
    <article className="resume-role">
      <div className="resume-role-logo" aria-hidden={imageSrc ? undefined : true}>
        {imageSrc && imageLayout === "wordmark" ? (
          <div className="resume-wordmark">
            {/* White lettering on a fixed dark backing; next/image adds nothing at 56px. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={alt} width={1204} height={320} loading="lazy" decoding="async" />
          </div>
        ) : imageSrc ? (
          <Avatar src={imageSrc} alt={alt} size={56} shape="square" className="ds-avatar-contain" />
        ) : null}
      </div>

      <div className="resume-role-body">
        <h3 className="resume-role-title">{title}</h3>
        <p className="resume-role-org">
          <span className="resume-role-company">{company}</span>
          <span aria-hidden="true"> · </span>
          <span>{location}</span>
        </p>
        <p className="resume-role-period">{period}</p>

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
