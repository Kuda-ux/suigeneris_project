/**
 * Supabase Database Restore Script
 * 
 * This script restores data from local JSON backup files to Supabase.
 * Use this if you need to recover data after a database issue.
 * 
 * Usage: node scripts/restore-database.js <backup-folder-name>
 * Example: node scripts/restore-database.js backup-2024-01-15T10-30-00-000Z
 * 
 * ⚠️  WARNING: This will INSERT data into your database.
 * Make sure you know what you're doing!
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get backup folder from command line argument
const backupFolderName = process.argv[2];

if (!backupFolderName) {
  console.error('❌ Please specify a backup folder name');
  console.error('Usage: node scripts/restore-database.js <backup-folder-name>');
  console.error('');
  
  // List available backups
  const backupsDir = path.join(__dirname, '..', 'backups');
  if (fs.existsSync(backupsDir)) {
    const backups = fs.readdirSync(backupsDir).filter(f => f.startsWith('backup-'));
    if (backups.length > 0) {
      console.log('Available backups:');
      backups.forEach(b => console.log(`  - ${b}`));
    }
  }
  process.exit(1);
}

const backupFolder = path.join(__dirname, '..', 'backups', backupFolderName);

if (!fs.existsSync(backupFolder)) {
  console.error(`❌ Backup folder not found: ${backupFolder}`);
  process.exit(1);
}

// Tables to restore (in order - respecting foreign key constraints)
const TABLES_TO_RESTORE = [
  'users',
  'products',
  'inventory',
  'orders',
  'order_items',
  'loan_applications',
  'cart'
];

async function confirmRestore() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    console.log('');
    console.log('⚠️  WARNING: This will restore data to your Supabase database!');
    console.log(`📁 Backup folder: ${backupFolder}`);
    console.log('');
    
    rl.question('Are you sure you want to continue? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

async function restoreTable(tableName) {
  const filePath = path.join(backupFolder, `${tableName}.json`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${tableName} (no backup file found)`);
    return { table: tableName, success: true, skipped: true };
  }

  try {
    console.log(`📥 Restoring ${tableName}...`);
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data || data.length === 0) {
      console.log(`⏭️  ${tableName}: No data to restore`);
      return { table: tableName, success: true, count: 0 };
    }

    // Use upsert to avoid duplicates (requires primary key)
    const { error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error restoring ${tableName}:`, error.message);
      return { table: tableName, success: false, error: error.message };
    }

    console.log(`✅ ${tableName}: ${data.length} records restored`);
    return { table: tableName, success: true, count: data.length };

  } catch (err) {
    console.error(`❌ Error restoring ${tableName}:`, err.message);
    return { table: tableName, success: false, error: err.message };
  }
}

async function runRestore() {
  const confirmed = await confirmRestore();
  
  if (!confirmed) {
    console.log('❌ Restore cancelled');
    process.exit(0);
  }

  console.log('');
  console.log('🚀 Starting Database Restore...');
  console.log('');

  const results = [];

  for (const table of TABLES_TO_RESTORE) {
    const result = await restoreTable(table);
    results.push(result);
  }

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('📊 RESTORE SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Successful: ${results.filter(r => r.success).length}`);
  console.log(`❌ Failed: ${results.filter(r => !r.success).length}`);
  console.log('═══════════════════════════════════════');
}

runRestore().catch(console.error);
