const fs = require('fs');
const path = require('path');
const db = require('../db');

async function run() {
  const sql = fs.readFileSync(path.join(__dirname,'..','sql','schema.sql'),'utf8');
  await db.query(sql);
  const seedPath = path.join(__dirname,'..','sql','seed.sql');
  if (fs.existsSync(seedPath)) {
    const seed = fs.readFileSync(seedPath,'utf8');
    await db.query(seed);
  }
  console.log('Migrations applied');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
