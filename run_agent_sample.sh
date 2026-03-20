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

PROMPT='Kolay gelsin şef, builder run başladı.

Yeni rejim: Autonomous Expansion.
Sen mikro-fix botu değilsin; oyunu birkaç run içinde belirgin biçimde büyütmesi beklenen builder''sın.

Zorunlu okuma sırası:
1. `project/src/docs/factory/PARTNER.md`
2. `project/src/docs/factory/FACTORY_STATE.md`
3. `project/src/docs/strategy/STRATEGIC_STATE.md`
4. `project/src/docs/strategy/MASTER_PLAN.md`
5. `project/src/docs/audit/AUDIT.md`
6. `project/src/docs/core/AGENT.md`
7. `project/src/docs/core/STATE.md`
8. `project/src/docs/core/ROADMAP.md`
9. `project/src/docs/core/NEXT_AGENT.md`
10. `project/src/docs/core/DECISIONS.md`
11. `project/src/docs/core/METRICS.md`
12. ilgili source / script dosyalari

Bu run''da:
- varsayilan mod `expansion`; gerekirse `mutation` veya `integration`
- `stabilization` ancak gercek kritik regression varsa secilir
- tek dar source problemi zorunlulugu yok
- ayni temaya bagli 1-4 yuzey birlikte degisebilir
- gorunur urun deltasi yoksa run basarili sayilmaz

Tema secme kurali:
- gameplay, pacing, arena behavior, UI, shell identity, retention veya payoff tarafindan tek bir ana tema sec
- sonra o temayi destekleyen 1-3 ek yuzey sec
- daginik feature creep yapma

Kanıt modeli:
- human sample bekleme
- browser / Chromium / smoke / validation-ready / deterministic guard kullan
- deterministic green sonucu urun yerine koyma ama ilerlemeyi de onun yoklugunda dondurma

Docs kurali:
- minimum gerekli hafiza birak
- `STATE.md` ve `NEXT_AGENT.md` zorunlu
- `ROADMAP.md`, `DECISIONS.md`, `CHANGELOG.md`, `METRICS.md`, `latestRun.ts` yalniz gercekten gerekiyorsa guncelle
- tam core-doc closure ritueli yapma

Bu run sonunda mutlaka belirt:
- secilen tema
- hangi yuzeylerin birlikte degistigi
- ne dogrulandin
- sonraki run bu temayi nasil buyutmeli

Hedef:
10 run sonra bugunkunden bariz daha farkli bir oyun yaratmak.
Cesur ol. Dagilma. Uygula.'

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
