#!/bin/bash
# Visuanza SEO Analyzer — Z17 Setup Script
# Run this once on Z17 as your normal user (not root)
# Usage: bash setup-z17.sh

set -e

echo "=== Visuanza SEO Analyzer — Z17 Setup ==="

# ── 1. Node.js (via nvm for clean install) ────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo "[1/6] Installing Node.js via nvm..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  export NVM_DIR="$HOME/.nvm"
  source "$NVM_DIR/nvm.sh"
  nvm install --lts
  nvm use --lts
else
  echo "[1/6] Node.js already installed: $(node --version)"
fi

# ── 2. Chromium ───────────────────────────────────────────────────────────────
if ! command -v chromium-browser &>/dev/null && ! command -v chromium &>/dev/null; then
  echo "[2/6] Installing Chromium..."
  sudo apt update && sudo apt install -y chromium-browser
else
  echo "[2/6] Chromium already installed"
fi

# ── 3. Lighthouse CLI ─────────────────────────────────────────────────────────
if ! command -v lighthouse &>/dev/null; then
  echo "[3/6] Installing Lighthouse CLI..."
  npm install -g lighthouse
else
  echo "[3/6] Lighthouse already installed: $(lighthouse --version)"
fi

# ── 4. Project dependencies ───────────────────────────────────────────────────
echo "[4/6] Installing project dependencies..."
cd "$(dirname "$0")"
npm install

# ── 5. Environment file ───────────────────────────────────────────────────────
if [ ! -f .env ]; then
  echo "[5/6] Creating .env from template..."
  cp .env.example .env
  echo ""
  echo "  ⚠️  Edit .env now and add your Brevo SMTP credentials:"
  echo "     nano .env"
  echo ""
else
  echo "[5/6] .env already exists — skipping"
fi

# ── 6. Systemd service ────────────────────────────────────────────────────────
echo "[6/6] Installing systemd service..."

SERVICE_FILE="/etc/systemd/system/visuanza-seo.service"
NODE_BIN=$(which node)
PROJECT_DIR="$(pwd)"
USER_NAME="$(whoami)"

sudo tee "$SERVICE_FILE" > /dev/null <<EOF
[Unit]
Description=Visuanza SEO Analyzer
After=network.target

[Service]
Type=simple
User=${USER_NAME}
WorkingDirectory=${PROJECT_DIR}
EnvironmentFile=${PROJECT_DIR}/.env
ExecStart=${NODE_BIN} server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable visuanza-seo
sudo systemctl start visuanza-seo

echo ""
echo "=== Setup complete! ==="
echo ""
echo "Service status:"
sudo systemctl status visuanza-seo --no-pager
echo ""
echo "Next steps:"
echo "  1. Edit .env with your Brevo credentials: nano .env"
echo "  2. Restart service after editing: sudo systemctl restart visuanza-seo"
echo "  3. Set up Cloudflare Tunnel (see README.md)"
echo "  4. Add the tunnel URL to the Visuanza hero form"
