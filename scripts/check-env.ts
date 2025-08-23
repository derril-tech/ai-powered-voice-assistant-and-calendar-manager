#!/usr/bin/env tsx

import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables
config();

// Environment variable schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  POSTGRES_DB: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  
  // Redis
  REDIS_URL: z.string().url().optional(),
  
  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_ALGORITHM: z.string().default('HS256'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // API Keys
  OPENAI_API_KEY: z.string().min(1),
  GOOGLE_CALENDAR_API_KEY: z.string().optional(),
  
  // Security
  SECRET_KEY: z.string().min(32),
  CORS_ORIGINS: z.string().optional(),
  
  // Email (optional)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  
  // Logging
  LOG_LEVEL: z.enum(['DEBUG', 'INFO', 'WARNING', 'ERROR']).default('INFO'),
  LOG_FORMAT: z.enum(['json', 'text']).default('json'),
  
  // Performance
  MAX_CONNECTIONS: z.string().transform(Number).default('100'),
  WORKER_PROCESSES: z.string().transform(Number).default('4'),
  
  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

function checkEnvironment() {
  try {
    const env = envSchema.parse(process.env);
    
    console.log('✅ Environment variables are valid');
    console.log(`📊 Environment: ${env.NODE_ENV}`);
    console.log(`🗄️ Database: ${env.DATABASE_URL.split('@')[1] || 'configured'}`);
    console.log(`🔐 JWT: ${env.JWT_SECRET ? 'configured' : 'missing'}`);
    console.log(`🤖 OpenAI: ${env.OPENAI_API_KEY ? 'configured' : 'missing'}`);
    
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error('❌ Unexpected error:', error);
    }
    
    console.log('\n📝 Please check your .env file and ensure all required variables are set.');
    console.log('💡 You can copy env.example to .env and fill in the values.');
    
    return false;
  }
}

// Run the check if this file is executed directly
if (require.main === module) {
  const isValid = checkEnvironment();
  process.exit(isValid ? 0 : 1);
}

export { checkEnvironment, envSchema };
