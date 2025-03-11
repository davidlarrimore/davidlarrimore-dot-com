"use client";

import { ReactNode } from "react";

interface ExperienceItemProps {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imageShape?: "circle" | "square"; // Control image container shape
}

export default function ResumeExperienceItem({
  title,
  company,
  location,
  period,
  description,
  achievements,
  icon,
  imageSrc,
  imageAlt,
  imageShape = "circle" // Default to circle for backward compatibility
}: ExperienceItemProps) {
  return (
    <div className="mb-10 experience-item">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div className="flex items-center">
          <div className={`w-16 h-16 mr-4 flex items-center justify-center overflow-hidden ${
            imageShape === "circle" ? "rounded-full" : "rounded-md"
          }`}>
            {imageSrc ? (
              <img 
                src={imageSrc} 
                alt={imageAlt || `${company} logo`} 
                className={`${imageShape === "circle" ? "object-cover" : "object-contain"} w-full h-full p-1`}
              />
            ) : icon ? (
              icon
            ) : (
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"></path>
              </svg>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title} at {company}</h3>
            <p className="text-gray-600 dark:text-gray-400">{period}</p>
          </div>
        </div>
        <p className="md:text-right text-gray-600 dark:text-gray-400 mt-2 md:mt-0">{location}</p>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>
      <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    </div>
  );
}