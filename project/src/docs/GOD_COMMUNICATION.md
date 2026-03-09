# GOD_COMMUNICATION.md
Last Updated: 2026-03-09
Status: Open

---

# Purpose

Bu dosya human-in-the-loop ile God agent arasindaki iletisim kanalidir.

Buraya su tip ihtiyaclar yazilir:

- ortamda eksik tool / yetki / runtime
- urun yonu hakkinda insan tercihi gereken kararlar
- dis dunyadan veri, deploy veya test gereksinimi
- God katmaninin tek basina cozemeyecegi operasyonel bloklar

---

# Current Requests

## Request 1
Need:
Interactive headed browser veya gercek insan oynanisi notu.

Why:
Deterministic telemetry iyi bir guard, ama replay/start/pause hissi, pointer analog steering, offscreen collision fairness ve early spawn filtrelerinin gercek oyuncu hissini tek basina kanitlamiyor.

What would unblock:
- 5-10 manuel run notu
- mumkunse kisa serbest gozlem: "nerede ucuz oldu / nerede bos hissettirdi / replay ne kadar akici"

Status:
Open

---

# Usage Note

God agent her haftalik run'da bu dosyayi kontrol etmeli.
Ihtiyac kapanirsa ilgili istegin durumunu `Closed` yapip sonucu not dusmeli.
