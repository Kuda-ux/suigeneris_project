/**
 * Supabase Database Backup Script
 * 
 * This script exports all important data from Supabase to local JSON files.
 * Run this regularly to maintain local backups.
 * 
 * Usage: node scripts/backup-database.js
 * 
 * Make sure to set environment variables or create a .env file with:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local if available
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Tables to backup
const TABLES_TO_BACKUP = [
  'products',
  'users',
  'orders',
  'order_items',
  'loan_applications',
  'inventory',
  'cart'
];

// Create backup directory
const backupDir = path.join(__dirname, '..', 'backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFolder = path.join(backupDir, `backup-${timestamp}`);

async function backupTable(tableName) {
  try {
    console.log(`📦 Backing up ${tableName}...`);
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*');

    if (error) {
      console.error(`❌ Error backing up ${tableName}:`, error.message);
      return { table: tableName, success: false, error: error.message };
    }

    const filePath = path.join(backupFolder, `${tableName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`✅ ${tableName}: ${data.length} records saved`);
    return { table: tableName, success: true, count: data.length };

  } catch (err) {
    console.error(`❌ Error backing up ${tableName}:`, err.message);
    return { table: tableName, success: false, error: err.message };
  }
}

async function runBackup() {
  console.log('🚀 Starting Supabase Database Backup...');
  console.log(`📁 Backup folder: ${backupFolder}`);
  console.log('');

  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  fs.mkdirSync(backupFolder, { recursive: true });

  const results = [];

  for (const table of TABLES_TO_BACKUP) {
    const result = await backupTable(table);
    results.push(result);
  }

  // Save backup summary
  const summary = {
    timestamp: new Date().toISOString(),
    supabaseUrl: supabaseUrl,
    tables: results,
    totalSuccess: results.filter(r => r.success).length,
    totalFailed: results.filter(r => !r.success).length
  };

  fs.writeFileSync(
    path.join(backupFolder, '_backup-summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('');
  console.log('═══════════════════════════════════════');
  console.log('📊 BACKUP SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Successful: ${summary.totalSuccess}/${TABLES_TO_BACKUP.length}`);
  console.log(`❌ Failed: ${summary.totalFailed}/${TABLES_TO_BACKUP.length}`);
  console.log(`📁 Location: ${backupFolder}`);
  console.log('═══════════════════════════════════════');

  if (summary.totalFailed > 0) {
    console.log('');
    console.log('⚠️  Some tables failed to backup:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.table}: ${r.error}`);
    });
  }
}

runBackup().catch(console.error);
