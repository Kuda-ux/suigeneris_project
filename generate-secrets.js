#!/usr/bin/env node

/**
 * Generate secure JWT secrets for Vercel deployment
 * Run: node generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Secure JWT Secrets for Vercel\n');
console.log('='.repeat(60));

const jwtSecret = crypto.randomBytes(32).toString('hex');
const jwtRefreshSecret = crypto.randomBytes(32).toString('hex');

console.log('\n📝 Copy these values to your Vercel Environment Variables:\n');

console.log('JWT_SECRET:');
console.log(jwtSecret);

console.log('\nJWT_REFRESH_SECRET:');
console.log(jwtRefreshSecret);

console.log('\n' + '='.repeat(60));
console.log('\n✅ Secrets generated successfully!');
console.log('\n📋 Next steps:');
console.log('1. Go to your Vercel project settings');
console.log('2. Navigate to Environment Variables');
console.log('3. Add JWT_SECRET with the first value');
console.log('4. Add JWT_REFRESH_SECRET with the second value');
console.log('5. Redeploy your backend\n');
