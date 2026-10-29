/**
 * Jellycut Studios — 1-Click 50 Leads Dispatcher
 * 
 * Usage:
 *   node scripts/dispatch-50.mjs --dry-run
 *   node scripts/dispatch-50.mjs --live
 *   node scripts/dispatch-50.mjs --live --delay 30
 */

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sendOutreachEmail } from './send-outreach.mjs';
import { generatePersonalizedPitch } from '../api/outreachEngine.js';
import { isSuppressed, saveLead, markLeadSent, markLeadFailed } from '../api/outreachStore.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Parse flags
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || !args.includes('--live');
const delayIdx = args.indexOf('--delay');
const delaySeconds = delayIdx !== -1 && args[delayIdx + 1] ? Number(args[delayIdx + 1]) : 30;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('====================================================');
  console.log(`🚀 Jellycut Studios — Lead Outreach Dispatcher`);
  console.log(`   Mode: ${isDryRun ? '🧪 SIMULATION (Dry Run)' : '⚡ LIVE SMTP DISPATCH'}`);
  console.log(`   Drip Throttle: ${delaySeconds}s delay between sends`);
  console.log('====================================================\n');

  const prospectsPath = join(rootDir, 'data', 'prospects-database.json');
  if (!existsSync(prospectsPath)) {
    console.error(`❌ Could not find database file at ${prospectsPath}`);
    process.exit(1);
  }

  const allProspects = JSON.parse(readFileSync(prospectsPath, 'utf-8'));
  const validProspects = allProspects.filter(p => p.email && p.email.trim());

  console.log(`📊 Found ${allProspects.length} total prospects in database.`);
  console.log(`📧 ${validProspects.length} contacts have direct email addresses.\n`);

  let sentCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < validProspects.length; i++) {
    const prospect = validProspects[i];
    const email = prospect.email.trim();
    const company = prospect.company || 'there';

    console.log(`[${i + 1}/${validProspects.length}] Processing: ${company} <${email}> (${prospect.country || 'Global'})...`);

    // Suppression Check
    const check = isSuppressed(email);
    if (check.suppressed && !isDryRun) {
      console.log(`   ⚠️ Skipped: Already suppressed / contacted (${check.reason})\n`);
      skippedCount++;
      continue;
    }

    try {
      // 1. Generate customized proposal
      const copy = await generatePersonalizedPitch({
        email,
        companyName: company,
        websiteUrl: prospect.website || '',
        country: prospect.country || 'United States',
        leadType: prospect.segment?.toLowerCase().includes('agency') ? 'Agency' : 'Direct Brand'
      });

      console.log(`   🎯 Pitch: "${copy.subject}"`);
      console.log(`   🏷️  Service: ${copy.recommendedService} [Case Study: ${copy.portfolioAnchor}]`);

      if (isDryRun) {
        console.log(`   ✅ [Dry Run] Pitch validated. No actual email sent.`);
        sentCount++;
      } else {
        // Live SMTP Send
        const res = await sendOutreachEmail({
          to: email,
          name: company,
          subject: copy.subject,
          body: copy.body
        });

        saveLead({
          email,
          companyName: company,
          country: prospect.country,
          subject: copy.subject,
          body: copy.body,
          status: 'sent',
          messageId: res.messageId,
          sentAt: new Date().toISOString()
        });

        console.log(`   🚀 LIVE SENT! Message ID: ${res.messageId}`);
        sentCount++;

        // Delay between sends (except for last item)
        if (i < validProspects.length - 1 && delaySeconds > 0) {
          console.log(`   ⏳ Throttling: waiting ${delaySeconds}s before next send to protect domain...`);
          await sleep(delaySeconds * 1000);
        }
      }
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
      errorCount++;
    }

    console.log('');
  }

  console.log('====================================================');
  console.log(`🏁 Batch Completed!`);
  console.log(`   Successfully processed: ${sentCount}`);
  console.log(`   Skipped (suppressed):   ${skippedCount}`);
  console.log(`   Errors encountered:     ${errorCount}`);
  console.log('====================================================\n');
}

main().catch(err => {
  console.error('Fatal batch dispatcher error:', err);
  process.exit(1);
});
