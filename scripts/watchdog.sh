#!/bin/bash
# Watchdog script that keeps the Next.js server running
cd /home/z/my-project

# Load env vars
export $(grep -v '^#' .env | xargs)

# Kill any existing processes
pkill -f "next" 2>/dev/null
sleep 2

# Start server in a loop so it restarts if killed
while true; do
  echo "[$(date)] Starting Next.js server..."
  npx next start -p 3000 > dev.log 2>&1
  EXIT_CODE=$?
  echo "[$(date)] Server exited with code $EXIT_CODE. Restarting in 3s..."
  sleep 3
done
