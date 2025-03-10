export default function SkillsSection() {
    const skills = [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "HTML5/CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Git", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "SQL", level: 75 },
    ];
  
    return (
      <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-4xl dark:text-white">
              My Skills
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto my-4"></div>
          </div>
  
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-gray-700 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Other Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Docker", "AWS", "GraphQL", "MongoDB", "Redux", "Jest", "GitHub Actions", "Figma", "Sass", "Webpack"].map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }