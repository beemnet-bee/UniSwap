#!/bin/bash
# Start the Next.js dev server with proper env loading
cd /home/z/my-project

# Load env vars
export $(grep -v '^#' .env | xargs)

# Kill any existing processes
pkill -f "next" 2>/dev/null
sleep 2

# Start dev server with webpack (more stable than Turbopack in sandbox)
exec npx next dev -p 3000 --webpack
