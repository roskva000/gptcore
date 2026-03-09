#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/agents/game-agent"
BRANCH="main"
LOG_DIR="$HOME/agent-logs/game-agent-god"
LOCKFILE="/tmp/game-agent-god.lock"
ENV_FILE="$HOME/.agent_env"
PROMPT_DIR="$HOME/agent-runner/prompts"
FIRST_PROMPT_FILE="$PROMPT_DIR/god_first_run_prompt.txt"
WEEKLY_PROMPT_FILE="$PROMPT_DIR/god_weekly_prompt.txt"
MARKER_FILE="$REPO_DIR/.god_initialized"

mkdir -p "$LOG_DIR"
mkdir -p "$PROMPT_DIR"

TS="$(date +%Y%m%d-%H%M%S)"
OUTFILE="$LOG_DIR/god-$TS.log"

log() {
  echo "$1" | tee -a "$OUTFILE"
}

send_telegram() {
  if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
    return 0
  fi

  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    --data-urlencode text="$1" >/dev/null 2>&1 || true
}

if [ -f "$ENV_FILE" ]; then
  # shellcheck disable=SC1090
  source "$ENV_FILE"
fi

exec 9>"$LOCKFILE"
flock -n 9 || {
  log "[INFO] Another god run is already active, skipping."
  exit 0
}

log "[INFO] Starting god run at $TS"

send_telegram "🟣 God run STARTED
Server: $(hostname)
Time: $(date)
Branch: $BRANCH"

cd "$REPO_DIR"

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
    exit 1
    ;;
esac

# Dirty tree yüzünden haftalık run kilitlenmesin
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

if [ ! -f "$FIRST_PROMPT_FILE" ]; then
  log "[ERROR] Missing first-run prompt: $FIRST_PROMPT_FILE"
  exit 1
fi

if [ ! -f "$WEEKLY_PROMPT_FILE" ]; then
  log "[ERROR] Missing weekly prompt: $WEEKLY_PROMPT_FILE"
  exit 1
fi

if [ ! -f "$MARKER_FILE" ]; then
  PROMPT_FILE="$FIRST_PROMPT_FILE"
  log "[INFO] God first-run mode"
else
  PROMPT_FILE="$WEEKLY_PROMPT_FILE"
  log "[INFO] God weekly mode"
fi

PROMPT="$(cat "$PROMPT_FILE")"

log "[INFO] Running Codex God agent"
codex exec --model gpt-5.4 --full-auto "$PROMPT" | tee -a "$OUTFILE"

# İlk ilahi entegrasyon tamamlandıysa marker koy
if [ ! -f "$MARKER_FILE" ]; then
  touch "$MARKER_FILE"
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  log "[INFO] God changes detected, committing to $BRANCH"
  git add .
  git commit -m "god: strategic guidance $TS" | tee -a "$OUTFILE" || true
  git push origin "$BRANCH" | tee -a "$OUTFILE"
else
  log "[INFO] No god changes detected"
fi

LAST_COMMIT="$(git log -1 --pretty=%h 2>/dev/null || echo n/a)"

log "[INFO] God run finished"

send_telegram "🟣 God run SUCCESS
Server: $(hostname)
Time: $(date)
Branch: $BRANCH
Commit: $LAST_COMMIT
Log: $OUTFILE"
