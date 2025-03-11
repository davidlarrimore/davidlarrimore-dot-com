import Link from "next/link";
import { socialConfig, contactConfig, siteConfig } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="mx-auto w-full max-w-screen-xl p-6 md:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-primary dark:text-primary">
                Dave Larrimore
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-gray-600 dark:text-gray-400">
            Experienced technologist specializing in AI and modern application development with a focus on user experience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Navigation
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <Link href="/" className="hover:underline">Home</Link>
                </li>
                <li className="mb-2">
                  <span className="hover:underline cursor-not-allowed">Projects</span>
                </li>
                <li className="mb-2">
                  <Link href="/resume" className="hover:underline">Resume</Link>
                </li>
                <li>
                <span className="hover:underline cursor-not-allowed">Blog</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Follow Me
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href={socialConfig.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub
                  </a>
                </li>
                <li className="mb-2">
                  <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={socialConfig.twitter} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-900 dark:text-white">
                Contact
              </h2>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="mb-2">
                  <a href={`mailto:${contactConfig.email}`} className="hover:underline">
                    Email Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} <Link href="/" className="hover:underline">David Larrimore</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href={socialConfig.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
            <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
              </svg>
              <span className="sr-only">LinkedIn account</span>
            </a>
            <a href={socialConfig.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
              <span className="sr-only">X account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}