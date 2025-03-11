import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeExperienceItem from "../components/ResumeExperienceItem";
import Link from "next/link";
import { Metadata } from "next";
import { socialConfig } from "@/lib/config";
import "./resume.css";

export const metadata: Metadata = {
  title: "David Larrimore | Resume",
  description:
    "Professional resume of David Larrimore - Senior Executive Technologist with expertise in IT modernization, AI strategy, cloud computing, and enterprise technology transformation",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="px-4 mx-auto max-w-screen-xl">
          {/* Resume Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Resume
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Senior Executive Technologist with 15+ years of expertise in IT
              modernization, AI strategy, cloud computing, and enterprise
              technology transformation.
            </p>
            <span className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center">
              <a
                href="/api/download-resume"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 no-print"
                download="2025_DavidLarrimore_Resume.pdf"
              >
                Download Resume PDF
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
              </a>
            </span>
            <span className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center">
              <Link
                href="/resumeChat"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-black rounded-lg bg-gray-300 hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 no-print"
              >
                Chat with my Resume (NEW!)
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </Link>
            </span>
          </div>

          <div className="grid gap-12 md:gap-16">
            {/* Contact Info */}
            <section className="resume-section bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    DAVID LARRIMORE
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Technologist / Senior Executive / Leader
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-gray-700 dark:text-gray-300">
                    davidlarrimore@gmail.com
                  </p>
                  <a
                    href={socialConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {socialConfig.linkedin}
                  </a>
                </div>
              </div>
            </section>

            {/* Profile */}
            <section className="resume-section bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                PROFILE
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Senior Executive Technologist with 15+ years of expertise in IT
                modernization, AI strategy, cloud computing, and enterprise
                technology transformation. Proven ability to develop and
                implement cutting-edge technology solutions, optimize IT
                investments, and drive innovation at scale. Passionate about AI,
                Product Development, and Human Centered Design.
              </p>
            </section>

            {/* Technical Expertise */}
            <section className="resume-section bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                TECHNICAL EXPERTISE
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    AI & Machine Learning
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    AI governance, generative AI, large language models (LLMs),
                    Responsible Use, Facial Recognition Technology (FRT), AI
                    automation
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Cloud Computing
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    AWS, Microsoft Azure, multi-cloud architecture, cloud
                    security, cloud cost optimization
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Software Development & Engineering
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Open Source, Python, Java, Node.js, Apex (SFDC), SQL, API
                    development, database architecture, full-stack development
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Agile & DevSecOps
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Scaled Agile Framework (SAFe), CI/CD pipelines, test
                    automation, Kubernetes, Docker, Infrastructure as Code (IaC)
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    Data Architecture & Analytics
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Big Data (Hadoop, Hortonworks), Business Intelligence
                    (Tableau, MicroStrategy), Data Warehousing, SQL, MongoDB
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    IT Governance & Enterprise Architecture
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Technical reference models, IT portfolio management,
                    Automated Governance, IT acquisition strategy
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Experience */}
            <section className="resume-section bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                PROFESSIONAL EXPERIENCE
              </h2>

              <ResumeExperienceItem
                title="Chief Technology and AI Officer"
                company="DHS"
                location="Washington, DC"
                period="2021 - Present"
                description="Provided technical oversight and organizational leadership, including the management of artificial intelligence initiatives, for a $10B IT portfolio spanning 22 components and offices within the Department of Homeland Security. Managed a $15M budget and over 100 federal employees."
                achievements={[
                  "Created DHS Office of the Chief AI Officer organization, including a nationwide hiring initiative that hired 50 AI experts from private sector, government, and academia.",
                  "Led development and implementation of LLM powered Generative AI Chatbot used by 20,000 DHS personnel.",
                  "Developed and implemented department-wide policies and training programs to ensure the safe and responsible adoption of AI technologies, including facial recognition and generative AI.",
                  "Led negotiation and awarded Enterprise User Agreement with Login.gov that has provided over $2.5M in cost avoidance and provided enterprise mechanism to onboard all DHS external onto a unified authentication services providing a streamlined user experience.",
                  "Led the creation of and managed multiple enterprise products, including Cloud SecDevOps toolchain, Generative AI chatbots, and Information sharing platforms.",
                  "Worked directly with major programs across the department to resolve risks and issues by applying problem-solving techniques, risk management strategies, collaboration, and technical oversight.",
                ]}
                imageSrc="/images/logos/logo-0.webp"
                imageAlt="Department of Homeland Security Logo"
                imageShape="square"
              />

              <ResumeExperienceItem
                title="Lead Solution Engineer"
                company="Salesforce"
                location="Reston, VA"
                period="2019 - 2021"
                description="As a Lead Solution Engineer in one of the fastest growing business units (Global Public Sector) in Salesforce, I provided strategic and tactical account support ranging from small civilian agencies to entire departments blending my federal experience with adaptable technical skills."
                achievements={[
                  "Provided technical leadership on 52 different opportunities since 2019, totaling over $10 million in revenue.",
                  "Followed human centered design practices and SecDevOps create tailored demonstrations and shareable assets for enterprise use.",
                  "Developed Proofs of Concept for enterprise grade implementations supporting client requirements.",
                  "Led internal Q&A sessions to help federal sales organization understand federal laws, policies, standards, and best practices.",
                  "Worked with government Solution Integrators (SI's) and other partners to ensure solutions led to customer success.",
                ]}
                imageSrc="/images/logos/logo-1.webp"
                imageAlt="Salesforce Logo"
                imageShape="square"
              />

              <ResumeExperienceItem
                title="Chief Technology Officer (CTO)"
                company="DHS/ICE"
                location="Washington, DC"
                period="2016 - 2019"
                description="As the ICE CTO, I managed all enterprise technology functions (Enterprise Architecture, Data Architecture, Vendor Management), as well as defined and led the technology culture change of a 400-person organization and half a billion dollars in IT Spend."
                achievements={[
                  "Implemented enterprise-wide multi-cloud General Support System (GSS) leveraging Amazon Web Services and Microsoft Azure.",
                  "Managed the migration of 87 production systems and 133 total environments to cloud in six months providing up-to 75% cost savings on compute costs.",
                  "Developed strategy and led IPT to implement enterprise Application Platform as a Service capability (APaaS) to enable no-code/low-code Rapid Application Development (RAD).",
                  "Implemented enterprise Agile coaching and DevSecOps tools strategy that reduced lead and delivery time on provisioning of new resources by 99%, doubled deployment frequency, and doubled Agile team maturity.",
                  "Designed and implemented enterprise DevSecOps toolchain to enable every OCIO development team with distributed CI/CD, Test Automation, and Cloud Orchestration capabilities.",
                  'Worked with individual systems teams to plan cloud migration, migrate to Open Source technologies, and adopt a DevOps "toolchain".',
                ]}
                imageSrc="/images/logos/logo-2.webp"
                imageAlt="ICE Logo"
                imageShape="square"
              />

              <ResumeExperienceItem
                title="Cloud Strategist"
                company="USDA"
                location="Washington, DC"
                period="2016"
                description="As the Cloud Strategist in the OCIO Cloud Strategy and Policy division, I was responsible for planning and executing the department-wide strategy for adopting secure commercial cloud solutions."
                achievements={[
                  "Built coalitions with department level engineering, networking, and security leadership to develop a common-sense approach to incrementally adopting commercial cloud solutions.",
                  "Engaged USDA enterprise shared service providers to evaluate and certify commercial cloud ready shared services that can be leveraged by all USDA customer Agencies.",
                  "Led working groups and integrated project teams to develop enterprise cloud policy and guidance that identified areas of trust and flexibility for USDA customer Agencies to drastically reduce the acquisition and securing of commercial cloud solutions while still ensuring security and compliance.",
                  "Worked directly with USDA Customer Agencies to identify common commercial cloud service needs and provide necessary expertise.",
                ]}
                imageSrc="/images/logos/logo-3.webp"
                imageAlt="USDA Logo"
                imageShape="square"
              />

              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Previous Positions
                </h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                  <li>
                    2011 - 2016: Analytics Branch Chief at General Services
                    Administration
                  </li>
                  <li>
                    2009 - 2011: IT Program Analyst at Department of Homeland
                    Security
                  </li>
                  <li>2008 - 2009: Software Engineer at Aspex, Inc.</li>
                </ul>
              </div>
            </section>

            {/* Awards */}
            <section className="resume-section bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                RECENT AWARDS
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Presidential Rank Award, 2025 (Nominated)</li>
                <li>GovExec The Federal 100 Award, 2025</li>
                <li>Under Secretary's Award for Special Achievement, 2024</li>
                <li>
                  Washington Exec, Pinnacle Cloud Executive of the Year, 2024
                </li>
                <li>Washington Exec, Top Exec to Watch, 2024</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
