#!/bin/bash

# EkaAI Supabase Schema Setup Script
# This script helps you set up the database schema for EkaAI

echo "🚀 EkaAI Supabase Schema Setup"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Choose your setup method:${NC}"
echo "1. Manual setup (copy SQL to Supabase dashboard)"
echo "2. CLI setup (requires Supabase CLI)"
echo ""

read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}📋 Manual Setup Instructions:${NC}"
        echo "1. Go to your Supabase project dashboard"
        echo "2. Navigate to SQL Editor"
        echo "3. Copy the contents of database-setup.sql"
        echo "4. Paste and run the SQL script"
        echo ""
        echo -e "${GREEN}✅ SQL file location: ./database-setup.sql${NC}"
        echo ""
        echo -e "${BLUE}💡 Pro tip: The script includes verification queries at the end${NC}"
        ;;
    2)
        echo ""
        echo -e "${YELLOW}🔧 CLI Setup (requires Supabase CLI):${NC}"
        echo ""
        
        # Check if Supabase CLI is installed
        if ! command -v supabase &> /dev/null; then
            echo -e "${RED}❌ Supabase CLI not found. Please install it first:${NC}"
            echo "npm install -g supabase"
            echo "or visit: https://supabase.com/docs/guides/cli"
            exit 1
        fi
        
        echo -e "${GREEN}✅ Supabase CLI found${NC}"
        echo ""
        
        # Check if user is logged in
        if ! supabase projects list &> /dev/null; then
            echo -e "${YELLOW}🔐 Please login to Supabase CLI first:${NC}"
            echo "supabase login"
            exit 1
        fi
        
        echo -e "${GREEN}✅ Already logged in to Supabase CLI${NC}"
        echo ""
        
        # Get project reference
        read -p "Enter your Supabase project reference (e.g., qovozoipltpcwznwceuc): " project_ref
        
        if [ -z "$project_ref" ]; then
            echo -e "${RED}❌ Project reference cannot be empty${NC}"
            exit 1
        fi
        
        echo ""
        echo -e "${BLUE}🚀 Running database setup...${NC}"
        
        # Run the SQL file
        if supabase db reset --project-ref "$project_ref" --linked; then
            echo ""
            echo -e "${GREEN}✅ Database setup completed successfully!${NC}"
        else
            echo ""
            echo -e "${RED}❌ Database setup failed. Please check your project reference and try manual setup.${NC}"
            exit 1
        fi
        ;;
    *)
        echo -e "${RED}❌ Invalid choice. Please run the script again and choose 1 or 2.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 Next Steps:${NC}"
echo "1. Update your .env.local file with Supabase credentials"
echo "2. Configure Google OAuth in Supabase dashboard"
echo "3. Test the authentication flow"
echo ""
echo -e "${BLUE}📚 For detailed setup instructions, see: USER_MANAGEMENT_SETUP.md${NC}"
