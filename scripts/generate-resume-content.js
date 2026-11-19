const fs = require('node:fs');
const path = require('node:path');
const Papa = require('papaparse');
const root = path.resolve(__dirname, '..');
const content = require('../lib/resume-content.json');
const chunks = [];
function add(id, text, section, metadata = {}) {
  chunks.push({ _id: id, text, section, category: section, sequence: chunks.length + 1, ...metadata });
}
add('profile', `${content.tagline}\n${content.profile}\n${content.about}`, 'Profile');
add('contact', content.contact, 'Contact');
content.experience.forEach((role, i) => {
  const metadata = { organization: role.company, role: role.title, years: role.period };
  const prefix = `${role.title} at ${role.company} (${role.period})`;
  add(`experience_${i}`, `${prefix}\n${role.description}`, 'Professional Experience', metadata);
  role.achievements.forEach((text, j) => add(`experience_${i}_outcome_${j}`, `${prefix}\n${text}`, 'Professional Experience', { ...metadata, category: 'Outcome' }));
  // The knowledge base's further evidence for this role: for the chatbot and resume.md, not the page.
  (role.evidence || []).forEach((text, j) => add(`experience_${i}_evidence_${j}`, `${prefix}\n${text}`, 'Professional Experience', { ...metadata, category: 'Evidence' }));
});
content.earlier.forEach((role, i) => add(`earlier_${i}`, `${role.title} at ${role.company} (${role.period}). ${role.description}`, 'Earlier Career', { organization: role.company, role: role.title, years: role.period }));
content.expertise.forEach((item, i) => add(`expertise_${i}`, `${item.title}: ${item.body}`, 'Technical Expertise'));
(content.projects || []).forEach((item, i) => add(`project_${i}`, `${item.name}: ${item.body}`, 'Selected Projects'));
add('awards', content.awards.join('\n'), 'Awards');
(content.education || []).forEach((e, i) => add(`education_${i}`, `${e.degree}, ${e.school} — ${e.year}`, 'Education'));
add('nominations', content.nominations.join('\n'), 'Award Nominations');
content.focus.forEach((item, i) => add(`focus_${i}`, `${item.title}: ${item.body}`, 'Focus'));
content.approach.forEach((item, i) => add(`approach_${i}`, `${item.title}: ${item.body}`, 'Leadership Approach'));
add('beyond_work', content.beyond, 'Beyond Work');
add('short_bio', content.shortBio, 'Short Biography');
const md = '# David Larrimore\n\n' + chunks.map(c => `## ${c.section}${c.role ? ` — ${c.role}` : ''}\n\n${c.text}`).join('\n\n') + '\n';
fs.writeFileSync(path.join(root, 'public/files/resume.md'), md);
fs.writeFileSync(path.join(root, 'scripts/resume.txt'), md);
fs.writeFileSync(path.join(root, 'scripts/resume_chunks.json'), JSON.stringify(chunks, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'scripts/resume_chunks.csv'), Papa.unparse(chunks, { newline: '\n', columns: ['_id', 'text', 'section', 'category', 'sequence', 'organization', 'role', 'years'] }) + '\n');
console.log(`Generated ${chunks.length} resume chunks and full-context files.`);
