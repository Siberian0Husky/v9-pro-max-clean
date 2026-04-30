#!/bin/bash
set -e

# ╔══════════════════════════════════════════════════════════════╗
# ║          GlobNexis 全自动设置 & 上线脚本                      ║
# ║  运行前只需填入下方3个信息，其余全部自动完成                    ║
# ╚══════════════════════════════════════════════════════════════╝

# ── 填入你的3个信息 ────────────────────────────────────────────
GITHUB_TOKEN="填入你的GitHub_Token"         # github.com → Settings → Developer settings → Personal access tokens
WEB3FORMS_KEY="1ce2dd83-43d3-4f70-a235-7382a2d9b41d"       # web3forms.com → 输入邮箱 → 免费获取
NOTIFY_EMAIL="access@globnexis.com"        # 例如: sales@yourdomain.com
# ──────────────────────────────────────────────────────────────

GITHUB_USER="Siberian0Husky"
GITHUB_REPO="v9-pro-max-clean"
REMOTE_URL="https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"

# 颜色
GREEN='\033[0;32m'; BLUE='\033[0;34m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
ok()   { echo -e "${GREEN}  ✅ $1${NC}"; }
info() { echo -e "${BLUE}  ▶  $1${NC}"; }
warn() { echo -e "${YELLOW}  ⚠️  $1${NC}"; }
fail() { echo -e "${RED}  ❌ $1${NC}"; exit 1; }
header() { echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; echo -e "${BLUE}  $1${NC}"; echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"; }

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   GlobNexis 全自动部署脚本 v2.0          ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"

# ── 检查填写情况 ───────────────────────────────────────────────
header "Step 0 / 6 — 检查配置"
[ "$GITHUB_TOKEN"  = "YOUR_TOKEN_HERE"      ] && fail "请先填入 GITHUB_TOKEN"
[ "$WEB3FORMS_KEY" = "填入你的Web3Forms_Key"     ] && fail "请先填入 WEB3FORMS_KEY"
[ "$NOTIFY_EMAIL"  = "填入你的接收邮件的邮箱"     ] && fail "请先填入 NOTIFY_EMAIL"
[ -z "$GITHUB_TOKEN" ] || [ -z "$WEB3FORMS_KEY" ] || [ -z "$NOTIFY_EMAIL" ] && fail "信息不能为空"
ok "配置检查通过"

# ── 检查依赖 ───────────────────────────────────────────────────
header "Step 1 / 6 — 检查环境"
command -v git  >/dev/null 2>&1 || fail "未找到 Git，请先安装"
command -v node >/dev/null 2>&1 || fail "未找到 Node.js，请先安装"
command -v npm  >/dev/null 2>&1 || fail "未找到 npm，请先安装"
ok "Git:  $(git --version)"
ok "Node: $(node --version)"
ok "npm:  $(npm --version)"

# ── 写入环境变量 ───────────────────────────────────────────────
header "Step 2 / 6 — 写入配置文件"

# .env.local (本地开发用)
cat > .env.local << ENVEOF
NEXT_PUBLIC_WEB3FORMS_KEY=${WEB3FORMS_KEY}
ENVEOF
ok ".env.local 已写入"

# next.config.js 确认 basePath
cat > next.config.js << 'CFGEOF'
module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/v9-pro-max-clean",
};
CFGEOF
ok "next.config.js 已确认"

# GitHub Actions workflow
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'WFEOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_WEB3FORMS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_KEY }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
WFEOF
ok "GitHub Actions workflow 已写入"

# ── 注入 GitHub Secret ─────────────────────────────────────────
header "Step 3 / 6 — 注入 GitHub Secrets"

# 获取仓库公钥（用于加密 secret）
info "获取仓库加密公钥..."
KEY_RESPONSE=$(curl -sf \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/actions/secrets/public-key")

KEY_ID=$(echo "$KEY_RESPONSE" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)
PUB_KEY=$(echo "$KEY_RESPONSE" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)

if [ -z "$KEY_ID" ]; then
  warn "无法自动注入 Secret（需要 repo 权限的 Token）"
  warn "请手动在 GitHub 仓库 Settings → Secrets → Actions 添加："
  warn "  名称: NEXT_PUBLIC_WEB3FORMS_KEY"
  warn "  值:   ${WEB3FORMS_KEY}"
else
  # 用 Python 加密 secret（利用系统自带 Python）
  ENCRYPTED=$(python3 -c "
import base64, sys
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PublicKey
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
import nacl.encoding, nacl.public

pub_key = nacl.public.PublicKey(base64.b64decode('${PUB_KEY}'))
sealed = nacl.public.SealedBox(pub_key)
encrypted = sealed.encrypt(b'${WEB3FORMS_KEY}')
print(base64.b64encode(encrypted).decode())
" 2>/dev/null || echo "FAILED")

  if [ "$ENCRYPTED" != "FAILED" ] && [ -n "$ENCRYPTED" ]; then
    curl -sf -X PUT \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Accept: application/vnd.github.v3+json" \
      "https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/actions/secrets/NEXT_PUBLIC_WEB3FORMS_KEY" \
      -d "{\"encrypted_value\":\"${ENCRYPTED}\",\"key_id\":\"${KEY_ID}\"}" > /dev/null
    ok "Secret NEXT_PUBLIC_WEB3FORMS_KEY 已注入"
  else
    warn "加密库不可用，请手动在 GitHub 添加 Secret："
    warn "  Settings → Secrets → Actions → New secret"
    warn "  名称: NEXT_PUBLIC_WEB3FORMS_KEY  值: ${WEB3FORMS_KEY}"
  fi
fi

# ── 开启 GitHub Pages ──────────────────────────────────────────
header "Step 4 / 6 — 开启 GitHub Pages"
curl -sf -X POST \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/pages" \
  -d '{"source":{"branch":"gh-pages","path":"/"}}' > /dev/null 2>&1 || true
ok "GitHub Pages 已开启（或已存在）"

# ── Git 提交 & Push ────────────────────────────────────────────
header "Step 5 / 6 — 提交代码"
git config user.email "deploy@globnexis.com"
git config user.name "GlobNexis Deploy"

# 确保 .env.local 在 .gitignore 里
grep -q ".env.local" .gitignore 2>/dev/null || echo ".env.local" >> .gitignore

git add .
git diff --cached --quiet && echo "  (nothing new to commit)" || git commit -m "feat: complete website v2 — RFQ form, SEO pages, sitemap, optimized functions"

info "推送到 GitHub..."
git remote set-url origin "$REMOTE_URL"
git push origin main
ok "代码已推送！"

# ── 等待 Actions 完成 ──────────────────────────────────────────
header "Step 6 / 6 — 等待自动构建"
info "GitHub Actions 正在构建，等待 90 秒..."
sleep 90

# 检查最新 run 状态
RUN_STATUS=$(curl -sf \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/actions/runs?per_page=1" \
  | grep -o '"conclusion":"[^"]*"' | head -1 | cut -d'"' -f4)

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   部署完成！                         ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  🌐 网站地址:                                        ║${NC}"
echo -e "${GREEN}║  https://${GITHUB_USER}.github.io/${GITHUB_REPO}/   ║${NC}"
echo -e "${GREEN}║                                                      ║${NC}"
echo -e "${GREEN}║  📊 Actions 状态: ${RUN_STATUS:-running}                           ║${NC}"
echo -e "${GREEN}║  📋 查看构建日志:                                    ║${NC}"
echo -e "${GREEN}║  https://github.com/${GITHUB_USER}/${GITHUB_REPO}/actions ║${NC}"
echo -e "${GREEN}║                                                      ║${NC}"
echo -e "${GREEN}║  📧 RFQ表单邮件将发送至: ${NOTIFY_EMAIL}             ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════════╝${NC}"
echo ""
