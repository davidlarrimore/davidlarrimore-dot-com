export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-800">
      <div className="px-4 mx-auto max-w-screen-xl">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-4xl dark:text-white">
            About Me
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto my-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md dark:bg-gray-700 transform transition-all hover:scale-105">
            <div className="mb-4 text-primary dark:text-primary">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Modern Software Development
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I specialize in leading organizations and building modern digital
              experiences. I have no problem getting my hands dirty (as seen by
              this website) and I'm passionate about creating clean,
              maintainable code with a focus on performance and user experience.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md dark:bg-gray-700 transform transition-all hover:scale-105">
            <div className="mb-4 text-primary dark:text-primary">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Input layer nodes */}
                <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                <circle cx="4" cy="18" r="1.5" fill="currentColor" />

                {/* Hidden layer nodes */}
                <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                <circle cx="12" cy="9" r="1.5" fill="currentColor" />
                <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />

                {/* Output layer nodes */}
                <circle cx="20" cy="8" r="1.5" fill="currentColor" />
                <circle cx="20" cy="16" r="1.5" fill="currentColor" />

                {/* Connections between input and hidden layers */}
                <line x1="5" y1="6" x2="11" y2="4" strokeWidth="0.6" />
                <line x1="5" y1="6" x2="11" y2="9" strokeWidth="0.6" />
                <line x1="5" y1="6" x2="11" y2="14" strokeWidth="0.6" />
                <line x1="5" y1="6" x2="11" y2="19" strokeWidth="0.6" />

                <line x1="5" y1="12" x2="11" y2="4" strokeWidth="0.6" />
                <line x1="5" y1="12" x2="11" y2="9" strokeWidth="0.6" />
                <line x1="5" y1="12" x2="11" y2="14" strokeWidth="0.6" />
                <line x1="5" y1="12" x2="11" y2="19" strokeWidth="0.6" />

                <line x1="5" y1="18" x2="11" y2="4" strokeWidth="0.6" />
                <line x1="5" y1="18" x2="11" y2="9" strokeWidth="0.6" />
                <line x1="5" y1="18" x2="11" y2="14" strokeWidth="0.6" />
                <line x1="5" y1="18" x2="11" y2="19" strokeWidth="0.6" />

                {/* Connections between hidden and output layers */}
                <line x1="13" y1="4" x2="19" y2="8" strokeWidth="0.6" />
                <line x1="13" y1="9" x2="19" y2="8" strokeWidth="0.6" />
                <line x1="13" y1="14" x2="19" y2="8" strokeWidth="0.6" />
                <line x1="13" y1="19" x2="19" y2="8" strokeWidth="0.6" />

                <line x1="13" y1="4" x2="19" y2="16" strokeWidth="0.6" />
                <line x1="13" y1="9" x2="19" y2="16" strokeWidth="0.6" />
                <line x1="13" y1="14" x2="19" y2="16" strokeWidth="0.6" />
                <line x1="13" y1="19" x2="19" y2="16" strokeWidth="0.6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Artificial Intelligence
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              An experienced leader in Responsible AI. I have a deep
              understanding of the latest AI technologies and their
              applications. I have led and developed AI systems in highly
              regulated environments. I'm passionate about the potential of AI
              to transform industries and improve people's lives.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md dark:bg-gray-700 transform transition-all hover:scale-105">
            <div className="mb-4 text-primary dark:text-primary">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Collaboration
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              I thrive in collaborative environments where I can work with
              cross-functional teams to solve complex problems. I value clear
              communication, feedback, and an iterative approach to building
              software.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            My Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            I've been passionate about technology since I was young, starting
            with building my first computer at age 12. This early fascination
            evolved into a career in software development where I've had the
            opportunity to work on a diverse range of projects from e-commerce
            platforms to data visualization tools.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            With over 5 years of professional experience, I've developed
            expertise in modern JavaScript frameworks, particularly React and
            Next.js. I'm constantly learning and staying up-to-date with the
            latest technologies and best practices in web development.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            When I'm not coding, you can find me hiking in the mountains,
            reading science fiction, or experimenting with new cooking recipes.
            I believe that diverse interests contribute to creative
            problem-solving in my work.
          </p>
        </div>
      </div>
    </section>
  );
}
