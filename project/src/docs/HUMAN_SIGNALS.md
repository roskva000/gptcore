# HUMAN_SIGNALS.md

Bu dosya insan gozlem ve hissini sistem icin birinci sinif girdi haline getirir.

Amaç:
- deterministic telemetry'nin goremeyecegi urun hissini toplamak
- proxy-overfit riskini azaltmak
- God, auditor, builder ve partner katmanlarina insan kaniti saglamak

---

# Signal Template

## Entry
- Date:
- Observer:
- Runtime / device:
- Input mode: keyboard / pointer / touch
- Run count:

## What felt cheap?
- ...

## What felt empty or mushy?
- ...

## What felt good or exciting?
- ...

## Could you read your death clearly?
- yes / no / mixed
- note:

## Did you want to retry?
- yes / no / mixed
- note:

## Controls note
- ...

## Recommendation
- keep / tune / revert / investigate
- note:

---

# Usage Rules

- builder agent human signal varsa bunu strategic input olarak okumali
- auditor telemetry ile human signal arasindaki celiskileri isaretlemeli
- god haftalik yon verirken bu dosyayi dikkate almali
- partner layer burada pattern avlamali ve Furkan'a icgoru cikarabilmeli

---

# Current Status

No structured human signal has been logged yet.
This absence is itself a strategic blocker for `Human-Proven Survival Core`.
