#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/agents/game-agent"
PROJECT_DIR="$REPO_DIR/project/game"
BRANCH="main"
LOG_DIR="$HOME/agent-logs/game-agent-audit"
LOCKFILE="/tmp/game-agent-audit.lock"
GLOBAL_LOCKFILE="/tmp/game-agent-global.lock"
MAINTENANCE_FILE="$REPO_DIR/.factory-maintenance"
ENV_FILE="$HOME/.agent_env"

mkdir -p "$LOG_DIR"

TS="$(date -u +%Y%m%d-%H%M%S)"
OUTFILE="$LOG_DIR/audit-$TS.log"

log() {
  echo "$1" | tee -a "$OUTFILE"
}

if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

send_telegram() {
  if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
    return 0
  fi

  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    --data-urlencode text="$1" >/dev/null 2>&1 || true
}

on_error() {
  local exit_code=$?
  log "[ERROR] Audit failed with exit code $exit_code"
  send_telegram "🔴 Daily audit FAILED
Server: $(hostname)
Time: $(date)
Log: ${OUTFILE}"
  exit "$exit_code"
}

trap on_error ERR

check_maintenance() {
  if [ -f "$MAINTENANCE_FILE" ]; then
    log "[INFO] Maintenance marker detected, skipping audit run."
    exit 0
  fi
}

acquire_global_lock() {
  exec 8>"$GLOBAL_LOCKFILE"
  if ! flock -w 900 8; then
    log "[INFO] Global repo lock busy, skipping audit after timeout."
    exit 0
  fi
}

check_maintenance

exec 9>"$LOCKFILE"
flock -n 9 || {
  log "[INFO] Another audit is active, exiting."
  exit 0
}

cd "$REPO_DIR"

acquire_global_lock

log "[INFO] Starting audit at $TS"
send_telegram "🟡 Daily audit STARTED
Server: $(hostname)
Time: $(date)"

git fetch origin | tee -a "$OUTFILE"
git checkout "$BRANCH" | tee -a "$OUTFILE"
git pull --rebase origin "$BRANCH" | tee -a "$OUTFILE"

PROMPT='Kolay gelsin şef, audit mesaisi başladı.

Yeni rejim: Autonomous Expansion.
Senin görevin builder''i frenlemek değil; sahte ilerleme ile gerçek dönüşümü ayırmak.

Önce şu dosyaları oku:
1. `project/src/docs/factory/PARTNER.md`
2. `project/src/docs/factory/FACTORY_STATE.md`
3. `project/src/docs/strategy/STRATEGIC_STATE.md`
4. `project/src/docs/strategy/MASTER_PLAN.md`
5. `project/src/docs/audit/AUDITOR.md`
6. `project/src/docs/audit/AUDIT.md`
7. `project/src/docs/core/AGENT.md`
8. `project/src/docs/core/STATE.md`
9. `project/src/docs/core/ROADMAP.md`
10. `project/src/docs/core/NEXT_AGENT.md`
11. `project/src/docs/core/DECISIONS.md`
12. `project/src/docs/core/CHANGELOG.md`
13. `project/src/docs/core/METRICS.md`
14. kritik source / script dosyalari

Ardından son 24 saat veya son birkaç run için şu sorulara cevap ver:
- oyun gerçekten daha farklı ve daha güçlü mü?
- builder tek bir tema etrafında bagli yuzeyleri birlikte hareket ettirdi mi?
- run''lar tekrar mikro-fix lokal maksimumuna mı kaydı?
- docs/process churn yeniden ürün etkisini bastırıyor mu?
- expansion saglikli mi, yoksa feature creep mi basliyor?
- audit verdict ne olmali: `healthy`, `warning`, `expansion-live`, `ritual-loop`, `proxy-overfit`, `bureaucracy-risk`, `drift-risk`?

Kurallar:
- human sample eksigini blocker gibi kullanma
- builder gibi feature implement etmek zorunda degilsin
- ana görevin net yargı ve yön düzeltmesi
- `AUDIT.md` mutlaka güncellensin
- gerekiyorsa `NEXT_AGENT.md` ve `STATE.md` içine kısa governance notu bırak
- ana soru hep su olsun: gorunur ürün genişledi mi?

Tur sonunda mutlaka üret:
- kısa audit özeti
- genel yargı
- kırmızı bayraklar
- builder için net yön
- sonraki audit için sayaçlar
- güncellenmiş `project/src/docs/audit/AUDIT.md`'

log "[INFO] Running Codex audit"
codex exec \
  --model gpt-5.4 \
  --full-auto \
  "$PROMPT" | tee -a "$OUTFILE"

if [ -f "$PROJECT_DIR/package.json" ]; then
  cd "$PROJECT_DIR"
  if [ ! -d node_modules ]; then
    npm install | tee -a "$OUTFILE"
  fi
  npm run build | tee -a "$OUTFILE"
  cd "$REPO_DIR"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  log "[INFO] Audit produced changes, committing"
  git add .
  git commit -m "audit: daily governance review $TS" | tee -a "$OUTFILE" || true
  git push origin "$BRANCH" | tee -a "$OUTFILE"
else
  log "[INFO] No audit changes to commit"
fi

log "[INFO] Audit finished"
send_telegram "🟢 Daily audit SUCCESS
Server: $(hostname)
Time: $(date)
Branch: ${BRANCH}
Log: ${OUTFILE}"
