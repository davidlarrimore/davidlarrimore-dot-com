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
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I specialize in building modern web applications with React, Next.js, and TypeScript. 
                I'm passionate about creating clean, maintainable code with a focus on performance and user experience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md dark:bg-gray-700 transform transition-all hover:scale-105">
              <div className="mb-4 text-primary dark:text-primary">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I enjoy creating intuitive, accessible user interfaces that provide a delightful user experience. 
                I work with modern design tools and frameworks to build responsive designs that look great on any device.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-md dark:bg-gray-700 transform transition-all hover:scale-105">
              <div className="mb-4 text-primary dark:text-primary">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                I thrive in collaborative environments where I can work with cross-functional teams to solve complex problems. 
                I value clear communication, feedback, and an iterative approach to building software.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              I've been passionate about technology since I was young, starting with building my first computer at age 12. 
              This early fascination evolved into a career in software development where I've had the opportunity to work on 
              a diverse range of projects from e-commerce platforms to data visualization tools.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              With over 5 years of professional experience, I've developed expertise in modern JavaScript frameworks, 
              particularly React and Next.js. I'm constantly learning and staying up-to-date with the latest technologies 
              and best practices in web development.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              When I'm not coding, you can find me hiking in the mountains, reading science fiction, or experimenting 
              with new cooking recipes. I believe that diverse interests contribute to creative problem-solving in my work.
            </p>
          </div>
        </div>
      </section>
    );
  }