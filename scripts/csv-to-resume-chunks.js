/**
 * Converts a CSV file containing resume information into the resume_chunks.json format
 * 
 * Expected CSV format:
 * _id,text,section,category,subcategory,organization,role,years,achievement_type,sequence
 * 
 * Example:
 * skills_ai_001,"AI & Machine Learning expertise includes AI governance, generative AI...",skills,technical,ai_ml,,,,,3
 * exp_dhs_role_001,"2021 - Present, Chief Technology and AI Officer at DHS, Washington, DC...",experience,,,,Chief Technology and AI Officer,2021-Present,,9
 * 
 * Usage: 
 * node csv-to-resume-chunks.js input.csv output.json
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');


function convertCsvToResumeChunks(csvFilePath = 'scripts/resume_chunks.csv', outputFilePath = 'scripts/resume_chunks.json') {
  // Read the CSV file
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  
  // Parse the CSV
  const parsedCsv = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true, // Convert numbers to numbers, not strings
    trimHeaders: true, // Remove whitespace from headers
  });
  
  if (parsedCsv.errors && parsedCsv.errors.length > 0) {
    console.error('Errors parsing CSV:', parsedCsv.errors);
    return;
  }
  
  // Transform the data to match the resume_chunks.json format
  const resumeChunks = parsedCsv.data.map(row => {
    // Create a base object with required fields
    const chunk = {
      _id: row._id || `chunk_${Math.random().toString(36).substring(2, 11)}`,
      text: row.text || '',
      section: row.section || '',
      sequence: row.sequence || 0
    };
    
    // Add optional fields if they exist and aren't empty
    if (row.category && row.category.trim()) chunk.category = row.category;
    if (row.subcategory && row.subcategory.trim()) chunk.subcategory = row.subcategory;
    if (row.organization && row.organization.trim()) chunk.organization = row.organization;
    if (row.role && row.role.trim()) chunk.role = row.role;
    if (row.years && row.years.trim()) chunk.years = row.years;
    if (row.achievement_type && row.achievement_type.trim()) chunk.achievement_type = row.achievement_type;
    
    return chunk;
  });
  
  // Sort by sequence if available
  resumeChunks.sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
  
  // Write to the output file
  fs.writeFileSync(outputFilePath, JSON.stringify(resumeChunks, null, 2));
  
  console.log(`Successfully converted CSV to JSON. Wrote ${resumeChunks.length} chunks to ${outputFilePath}`);
  
  return resumeChunks;
}

/**
 * Creates a template CSV file that can be filled with resume data
 * @param {string} outputPath - Path where the template CSV will be saved
 */
function createTemplateCsv(outputPath = 'resume_template.csv') {
  const headers = ['_id', 'text', 'section', 'category', 'subcategory', 'organization', 'role', 'years', 'achievement_type', 'sequence'];
  
  // Create some example rows
  const exampleRows = [
    {
      _id: 'skills_ai_001',
      text: 'AI & Machine Learning expertise includes AI governance, generative AI, large language models (LLMs), Responsible Use, Facial Recognition Technology (FRT), and AI automation.',
      section: 'skills',
      category: 'technical',
      subcategory: 'ai_ml',
      organization: '',
      role: '',
      years: '',
      achievement_type: '',
      sequence: 1
    },
    {
      _id: 'exp_dhs_role_001',
      text: '2021 - Present, Chief Technology and AI Officer at DHS, Washington, DC. Provided technical oversight and organizational leadership, including the management of artificial intelligence initiatives.',
      section: 'experience',
      category: '',
      subcategory: '',
      organization: 'DHS',
      role: 'Chief Technology and AI Officer',
      years: '2021-Present',
      achievement_type: '',
      sequence: 2
    }
  ];
  
  // Generate CSV content
  let csvContent = headers.join(',') + '\n';
  
  exampleRows.forEach(row => {
    const values = headers.map(header => {
      // Wrap text fields in quotes and escape any quotes within
      if (typeof row[header] === 'string') {
        return `"${row[header].replace(/"/g, '""')}"`;
      }
      return row[header] || '';
    });
    csvContent += values.join(',') + '\n';
  });
  
  fs.writeFileSync(outputPath, csvContent);
  console.log(`Template CSV created at ${outputPath}`);
}

/**
 * Script entry point when run directly
 */
function main() {
  const args = process.argv.slice(2);
  
  const inputCsvPath = args[0] || 'scripts/resume_chunks.csv';
  const outputJsonPath = args[1] || 'scripts/resume_chunks.json';
  
  if (!fs.existsSync(inputCsvPath)) {
    console.error(`Error: Input file ${inputCsvPath} does not exist`);
    return;
  }
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputJsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  convertCsvToResumeChunks(inputCsvPath, outputJsonPath);
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = {
  convertCsvToResumeChunks,
  createTemplateCsv
};