import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isWelcomeReferrer } from '../lib/visitor-welcome.ts';

test('matches the article and origin-only browser referrals', () => {
  for (const referrer of [
    'https://fedscoop.com/',
    'https://www.fedscoop.com/',
    'https://fedscoop.com/the-revolving-door-for-tech-officials-at-trumps-dhs/',
    'https://fedscoop.com/the-revolving-door-for-tech-officials-at-trumps-dhs?source=news',
  ]) assert.equal(isWelcomeReferrer(referrer), true, referrer);
});

test('does not show for missing, unrelated, malformed or lookalike referrals', () => {
  for (const referrer of [
    '', 'invalid', 'https://example.com/', 'https://davidlarrimore.com/',
    'https://fedscoop.com/another-story/', 'https://fedscoop.com.evil.example/',
    'https://fedscoop.com@evil.example/', 'http://fedscoop.com/',
  ]) assert.equal(isWelcomeReferrer(referrer), false, referrer);
});
