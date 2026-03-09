#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/agents/game-agent"
PROJECT_DIR="$REPO_DIR/project/game"
BRANCH="main"
LOG_DIR="$REPO_DIR/.agent-logs"
LOCKFILE="/tmp/game-agent-builder.lock"
GLOBAL_LOCKFILE="/tmp/game-agent-global.lock"
MAINTENANCE_FILE="$REPO_DIR/.factory-maintenance"
ENV_FILE="$HOME/.agent_env"

mkdir -p "$LOG_DIR"

TS="$(date -u +%Y%m%d-%H%M%S)"
OUTFILE="$LOG_DIR/run-$TS.log"

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
  local last_commit
  last_commit="$(git -C "$REPO_DIR" rev-parse --short HEAD 2>/dev/null || echo "unknown")"

  log "[ERROR] Run failed with exit code $exit_code"
  send_telegram "🔴 Agent run FAILED
Server: $(hostname)
Time: $(date)
Branch: ${BRANCH}
Commit: ${last_commit}
Log: ${OUTFILE}"
  exit "$exit_code"
}

trap on_error ERR

check_maintenance() {
  if [ -f "$MAINTENANCE_FILE" ]; then
    log "[INFO] Maintenance marker detected, skipping builder run."
    send_telegram "🟡 Agent run skipped
Server: $(hostname)
Time: $(date)
Reason: maintenance mode active"
    exit 0
  fi
}

acquire_global_lock() {
  exec 8>"$GLOBAL_LOCKFILE"
  if ! flock -w 15 8; then
    log "[INFO] Global repo lock busy, skipping builder run."
    send_telegram "🟡 Agent run skipped
Server: $(hostname)
Time: $(date)
Reason: global repo lock busy"
    exit 0
  fi
}

check_maintenance

exec 9>"$LOCKFILE"
flock -n 9 || {
  log "[INFO] Another run is active, exiting."
  send_telegram "🟡 Agent run skipped
Server: $(hostname)
Time: $(date)
Reason: another run is already active"
  exit 0
}

acquire_global_lock

log "[INFO] Starting run at $TS"
send_telegram "🟡 Agent run STARTED
Server: $(hostname)
Time: $(date)
Branch: ${BRANCH}"

if [ ! -d "$REPO_DIR/.git" ]; then
  log "[ERROR] Git repo not found at $REPO_DIR"
  exit 1
fi

REMOTE_URL="$(git remote get-url origin || true)"
case "$REMOTE_URL" in
  git@github.com:*)
    log "[INFO] SSH remote OK: $REMOTE_URL"
    ;;
  *)
    log "[ERROR] origin is not SSH: $REMOTE_URL"
    log "[ERROR] Fix with: git remote set-url origin git@github.com:KULLANICI/REPO.git"
    exit 1
    ;;
esac

if ! git diff --quiet || ! git diff --cached --quiet; then
  log "[WARN] Working tree dirty, resetting to HEAD"
  git reset --hard HEAD | tee -a "$OUTFILE"
fi

if [ -n "$(git ls-files --others --exclude-standard)" ]; then
  log "[WARN] Untracked files found, cleaning"
  git clean -fd | tee -a "$OUTFILE"
fi

git fetch origin | tee -a "$OUTFILE"
git checkout "$BRANCH" | tee -a "$OUTFILE"
git pull --rebase origin "$BRANCH" | tee -a "$OUTFILE"

PROMPT='Kolay gelsin şef, mesai başladı.

`project/src/docs/core/AGENT.md` anayasan.
`project/src/docs/audit/AUDIT.md` son denetim hafızan.
`project/src/docs/core/PROJECT.md`, `project/src/docs/core/ARCHITECTURE.md` ve `project/src/docs/core/GAME_DESIGN.md` bağlamın.
`project/src/docs/core/NEXT_AGENT.md` aktif görev tanımın.

Önce repo durumunu ve state dosyalarını oku.

Okuma sırası:
1. `project/src/docs/strategy/STRATEGIC_STATE.md`
2. `project/src/docs/strategy/MASTER_PLAN.md`
3. `project/src/docs/factory/FACTORY_STATE.md`
4. `project/src/docs/factory/PARTNER_LOG.md`
5. `project/src/docs/core/AGENT.md`
6. `project/src/docs/audit/AUDIT.md`
7. `project/src/docs/core/NEXT_AGENT.md`
8. `project/src/docs/core/STATE.md`
9. `project/src/docs/core/ROADMAP.md`
10. `project/src/docs/core/DECISIONS.md`
11. `project/src/docs/core/CHANGELOG.md`
12. `project/src/docs/core/METRICS.md`
13. varsa `project/src/docs/experiments/HUMAN_SIGNALS.md` ve `project/src/docs/experiments/EXPERIMENTS.md`

`project/src/docs/audit/AUDIT.md` içinde governance yönlendirmeleri veya risk uyarıları varsa bunu dikkate al.

Bu tur için tek bir ana hedef seç ve run modunu açıkça belirt: `stabilization` / `mutation` / `integration`.

Hedef seçiminde şu öncelikleri kullan:
1. ürün ilerlemesi (gameplay / UX / bug fix)
2. deterministic validation
3. test stabilitesi
4. teknik borç azaltma

Validation veya tooling genişletmesi sadece gerçekten gerekli ise yapılmalıdır. Factory docs ve partner notları builder için bağlamdır; bunları copy-churn bahanesiyle büyütme.

Aynı problem etrafında yeni orchestration / readiness / preflight katmanı eklemekten kaçın.

Uygula.
Doğrula.

Tur sonunda mutlaka şu dosyaları güncelle:
- `project/src/docs/core/STATE.md`
- `project/src/docs/core/ROADMAP.md`
- `project/src/docs/core/DECISIONS.md`
- `project/src/docs/core/CHANGELOG.md`
- `project/src/docs/core/METRICS.md`
- `project/src/docs/core/NEXT_AGENT.md`

`project/src/docs/core/NEXT_AGENT.md` bir sonraki agent için net ve uygulanabilir bir görev içermelidir.

Gereksiz scope büyütme.
Core gameplay ve ölçülebilir ilerleme öncelikli.'

log "[INFO] Running Codex"
codex exec \
  --model gpt-5.4 \
  --full-auto \
  "$PROMPT" | tee -a "$OUTFILE"

if [ -f "$PROJECT_DIR/package.json" ]; then
  log "[INFO] Entering app directory: $PROJECT_DIR"
  cd "$PROJECT_DIR"

  if [ ! -d node_modules ]; then
    log "[INFO] node_modules not found, installing dependencies"
    npm install | tee -a "$OUTFILE"
  else
    log "[INFO] node_modules already exists, skipping install"
  fi

  log "[INFO] Running build"
  npm run build | tee -a "$OUTFILE"

  if npm run | grep -q " test"; then
    log "[INFO] Running tests"
    npm test | tee -a "$OUTFILE"
  else
    log "[INFO] No test script found, skipping tests"
  fi

  cd "$REPO_DIR"
else
  log "[WARN] package.json not found at $PROJECT_DIR, skipping build/test"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  log "[INFO] Changes detected, committing to main"
  git add .
  git commit -m "agent: live iteration $TS" | tee -a "$OUTFILE" || true
  git push origin "$BRANCH" | tee -a "$OUTFILE"

  LAST_COMMIT_MSG="$(git log -1 --pretty=%s 2>/dev/null || echo "no-commit")"
  send_telegram "🚀 MAIN UPDATED
Server: $(hostname)
Time: $(date)
Branch: ${BRANCH}
Last commit: ${LAST_COMMIT_MSG}
Vercel should deploy automatically."
else
  log "[INFO] No changes to commit"
fi

log "[INFO] Run finished"
LAST_COMMIT_MSG="$(git log -1 --pretty=%s 2>/dev/null || echo "no-commit")"
send_telegram "🟢 Agent run SUCCESS
Server: $(hostname)
Time: $(date)
Branch: ${BRANCH}
Last commit: ${LAST_COMMIT_MSG}
Log: ${OUTFILE}"
