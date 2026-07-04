import fs from 'fs';

let content = fs.readFileSync('src/data/stages.js', 'utf-8');

// The stages are exported as an array of objects. We can just use a regex to replace
let newContent = content
  .replace(/rewardCoins:\s*1000,/g, 'rewardCoins: 400,')
  .replace(/rewardCoins:\s*1200,/g, 'rewardCoins: 500,')
  .replace(/rewardCoins:\s*1500,/g, 'rewardCoins: 600,');

fs.writeFileSync('src/data/stages_adjusted.js', newContent);

// Import the adjusted to calculate
import { stages } from './src/data/stages_adjusted.js';

let cumulative = 0;
for (const stage of stages) {
  const stageCoins = stage.missions.reduce((sum, m) => sum + m.rewardCoins, 0);
  console.log(`Stage ${stage.id}: ${stageCoins} coins. Cumulative before this stage: ${cumulative}`);
  cumulative += stageCoins;
}

