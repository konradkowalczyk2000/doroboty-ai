# EXP1: karta „co zrobił sam” (IDEA2)

## Zakres i kryteria

Prototyp zestawu B z EXP1 (`docs/tasks/../../` Supersprint, plan w `decyzja-exp1-exp2`): rekruter widzi kartę z własnym wkładem, projektem i efektem z cytatami z oryginalnego tekstu, braki powiedziane wprost, jedno pytanie. Zestaw A to obecny widok bez zmian.

- Trasa: `/#/app/kandydaci/:id` (widok pracodawcy). Widok kandydata bez zmian.
- Rodziny: RecordSheet (nowy opcjonalny prop `lead`), Badge `secondary`, MatchScore bez zmian.
- Konsumenci współdzieleni: `ApplicationRecord` (kandydat i pracodawca), `RecordSheet`.
- Kryteria: karta tylko dla pracodawcy i tylko gdy aplikacja ma `ownWorkCard`; cytat musi być dosłownym fragmentem `rawAnswer`; stare zapisy bez nowych pól nadal się importują; brak zmian w domyślnym stanie i w testach e2e.

## Decyzje

- Pola `rawAnswer` i `ownWorkCard` są opcjonalne w `applicationSchema` (wersja zapisu bez zmian). Walidacja sprawdza cytaty przy imporcie.
- Karta nie jest generowana w aplikacji: nowe aplikacje nie mają tekstu surowego. Karty pochodzą z importu stanów EXP1.
- Dane EXP1 (fikcyjne): `exp1-przykladowe-cytaty.json`. Stany do zaimportowania w Ustawieniach: `exp1-stan-1.json` (oferta 1 bez karty, oferta 2 z kartą) i `exp1-stan-2.json` (odwrotnie), żeby przeciwważyć kolejność. Test `exp1-state.test.ts` pilnuje, że pliki odpowiadają fixturom.
- Pracodawcy: Karolina (BrightLabs) widzi 6 aplikacji z zestawu 1, Tomasz (Northstar) 6 z zestawu 2. Kandydaci EXP1 trafili do `people` w stanach EXP1 i pojawią się w wyborze osoby.

## Znane ograniczenia

- Match Score i „Podsumowanie” widać również w zestawie z kartą, więc porównanie A/B nie izoluje samej karty.
- Lista „Kandydaci” pokazuje wersję skróconą (`OwnWorkCardCompact`: trzy wiersze, bez pytania i uwag), pod podsumowaniem.
- Brak zgody kandydata na pokazanie oryginału (dane fikcyjne).
- Brak testów przeglądarkowych i porównania wizualnego z kitem: nie uruchomiono ich w tej sesji (brak Chromium, Node 22 zamiast 24).

## Walidacja

Wykonane w kopii roboczej pod Node 22 (projekt wymaga 24), 2026-11-11:

- `format:check`, `lint`, `typecheck`, `test` (32 testy, w tym walidacja cytatów i zgodność stanów EXP1 z fixturami), `verify:packet`, `build`: przeszły.
- Renderowanie `ApplicationRecord` po stronie serwera: karta i zakładka „Oryginał” tylko dla pracodawcy z kartą; brak ich u pracodawcy bez karty i u kandydata.
- Kit `docs/design-system/agent-kit` bez zmian (`git diff` pusty).

Niewykonane: `design-system:check` (wymaga Node 24), testy Playwright, porównanie wizualne 1280/390/320 px, klawiatura. Przed uznaniem za zaakceptowane uruchom `./scripts/verify` na Node 24 i obejrzyj widok.
