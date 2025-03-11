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
            I am the Chief Technology Officer (CTO) and Chief AI Officer (CAIO)
            for the Department of Homeland Security (DHS), where I lead a team
            of ~150 employees and contractors. Together, we develop
            department-wide products, govern critical technology investments,
            resolve high-impact software challenges, and guide the CIO on
            strategic technology decisions and policy. My professional
            background spans AI/ML, Cloud Computing, DevOps/Automation,
            Application Development, Product Management, Business Intelligence,
            and Analytics.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Over the past three years, I have focused heavily on AI/ML at DHS.
            Initially, this was to ensure compliance with new federal
            regulations, but it turned into spearheading department-wide AI
            pilots, recruiting a specialized team of 50 AI experts (Data
            Scientists, ML Engineers, Product Managers, Researchers, etc..),
            figuring out Facial Recognition Technology and GenAI when it was
            new, and delivering AI-powered products that advance the DHS
            mission. Most recently, we completed development of a
            department-wide Generative AI chatbot and an AI sandbox
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Outside of work, I am a passionate and lifelong gamer that still
            remembers playing Counterstrike on my Toshiba Infinia 7200 in the
            90's. Whether it's replaying Final Fantasy VII for the hundredth
            time or trying a new RPG, RTS, FPS, or MMO, I love epic narratives
            that blend creativity, fantasy, strategy, and problem-solving. I'm
            also a hands-on techie that does 3D printing and building IOT
            devices for home projects like creating escape rooms.
          </p>
        </div>
      </div>
    </section>
  );
}
