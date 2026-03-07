#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$HOME/agents/game-agent"
BRANCH="agent-loop"
MAIN_BRANCH="main"
LOG_DIR="$REPO_DIR/.agent-logs"
mkdir -p "$LOG_DIR"

cd "$REPO_DIR"

LOCKFILE="/tmp/game-agent.lock"
exec 9>"$LOCKFILE"
flock -n 9 || {
  echo "Another run is active, exiting."
  exit 0
}

TS="$(date -u +%Y%m%d-%H%M%S)"
OUTFILE="$LOG_DIR/run-$TS.log"

echo "[INFO] Starting run at $TS" | tee -a "$OUTFILE"

git fetch origin

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git checkout "$BRANCH"
else
  git checkout -b "$BRANCH"
fi

git pull --rebase origin "$BRANCH" || true

PROMPT='Kolay gelsin şef, mesai başladı.

AGENT.md anayasan.
PROJECT.md, ARCHITECTURE.md ve GAME_DESIGN.md baglamin.
NEXT_AGENT.md aktif gorev tanimin.

Once repo durumunu ve state dosyalarini oku.
Bu tur icin tek bir ana hedef sec.
Uygula.
Dogrula.
Tur sonunda mutlaka STATE.md, ROADMAP.md, DECISIONS.md, CHANGELOG.md, METRICS.md ve NEXT_AGENT.md dosyalarini guncelle.
Gereksiz scope buyutme.
Core gameplay ve olculebilir ilerleme oncelikli.'

codex exec --full-auto "$PROMPT" | tee -a "$OUTFILE"

if [ -f package.json ]; then
  echo "[INFO] Installing deps" | tee -a "$OUTFILE"
  npm install | tee -a "$OUTFILE"

  echo "[INFO] Running build" | tee -a "$OUTFILE"
  npm run build | tee -a "$OUTFILE"

  if npm run | grep -q " test"; then
    echo "[INFO] Running tests" | tee -a "$OUTFILE"
    npm test | tee -a "$OUTFILE"
  else
    echo "[INFO] No test script found, skipping tests" | tee -a "$OUTFILE"
  fi
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  git add .
  git commit -m "agent: automated iteration $TS" | tee -a "$OUTFILE" || true
  git push origin "$BRANCH" | tee -a "$OUTFILE"
else
  echo "[INFO] No changes to commit" | tee -a "$OUTFILE"
fi

echo "[INFO] Trying fast-forward merge into $MAIN_BRANCH" | tee -a "$OUTFILE"
git fetch origin
git checkout "$MAIN_BRANCH"
git pull --rebase origin "$MAIN_BRANCH" | tee -a "$OUTFILE"

if git merge --ff-only "$BRANCH" | tee -a "$OUTFILE"; then
  git push origin "$MAIN_BRANCH" | tee -a "$OUTFILE"
  echo "[INFO] Main updated successfully" | tee -a "$OUTFILE"
else
  echo "[WARN] Fast-forward merge failed, leaving changes on $BRANCH" | tee -a "$OUTFILE"
fi

git checkout "$BRANCH"

echo "[INFO] Run finished" | tee -a "$OUTFILE"
