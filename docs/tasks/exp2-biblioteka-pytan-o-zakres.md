# EXP2: biblioteka pytań o zakres (IDEA3)

## Zakres i kryteria

Prototyp IDEA3: rekruter wybiera 1–3 gotowe pytania dla oferty (Build, Apply, Lead), kandydat odpowiada przed zaproszeniem. Plan testu EXP2 (formularz 8–10 osób) jest w `decyzja-exp1-exp2` w projekcie Supersprintu.

- Trasy: `/#/app/oferty/:id` (edytor oferty pracodawcy), `/#/aplikuj/:slug` (formularz kandydata), `/#/app/aplikacje/:id` i `/#/app/kandydaci/:id` (odpowiedzi w zakładce „Odpowiedź”).
- Konsumenci współdzieleni: `ApplicationRecord`, `Field`, `Textarea`, `Checkbox`, `FormSelect`, model oferty i aplikacji.
- Kryteria: brak pytań = zachowanie jak dotąd (jedno pole tekstowe, testy e2e bez zmian); pytania tylko z kategorii oferty, maks. 3 bez powtórzeń; wysłanie wymaga odpowiedzi (≥ 20 znaków) na każde pytanie; zapisany rekord zachowuje treść pytań; szkic zapamiętuje odpowiedzi.

## Decyzje

- Biblioteka to kod: `src/features/prototype/scope-questions.ts`, 3 pytania na kategorię. Pierwsze dwa pytania Build to pytania 2 i 3 z formularza EXP2; pozostałe są nowe i wymagają Twojej oceny.
- Oferta dostaje opcjonalne `screeningQuestionIds` (walidacja: znane id, ta sama kategoria, bez duplikatów, do 3). Aplikacja dostaje opcjonalne `scopeAnswers` z kopią treści pytania. Wersja zapisu bez zmian, stare zapisy nadal się importują.
- Domyślne oferty nie mają pytań, żeby nie zmieniać obecnych testów przeglądarkowych. Aby zobaczyć funkcję: Moje oferty → edytuj ofertę → zaznacz pytania → opublikuj, potem złóż aplikację jako kandydat.
- Odpowiedzi są obowiązkowe. EXP2 mierzy rezygnację przy formularzu, a ten prototyp jej nie mierzy.

## Stan do sesji EXP2

`docs/tasks/exp2-stan.json` (dane fikcyjne): bez aplikacji, oferta Build „Staff AI Engineer” (Northstar Health) z dwoma pytaniami z formularza EXP2 (`build-own-part`, `build-users`), pięć osób do wyboru jako kandydat. Przed każdym uczestnikiem: Ustawienia → import tego pliku (zastępuje cały stan, więc czyści poprzednią aplikację). Uczestnik wchodzi jako kandydat, otwiera ofertę i „Aplikuj”: pole „Dlaczego pasujesz do tej roli?” to pytanie 1 (wolno użyć dowolnego narzędzia), pola „Pytania rekrutera” to pytania 2 i 3. Odpowiedzi odczytasz jako Tomasz Zieliński w Kandydaci (zakładka „Odpowiedź”). CV każdej osoby opisuje Product Managera, nie inżyniera; dla testu pytań o zakres nie ma to znaczenia, ale uczestnicy mogą to zauważyć. Test `exp2-state.test.ts` pilnuje zgodności pliku i sprawdza przejście aplikacji z pytaniami.

## Znane ograniczenia

- Odpowiedzi nie zasilają karty z IDEA2 (karta bierze cytaty z `rawAnswer`).
- Brak sprawdzania, czy odpowiedź jest ogólnikowa albo napisana z AI.
- Brak pomiarów (czas wypełnienia, porzucenia) i pytań o zniechęcenie oraz użycie AI.
- Pytania o zniechęcenie i użycie AI z formularza EXP2 nie są częścią aplikacji.

## Walidacja

Wykonane w kopii roboczej pod Node 22 (projekt wymaga 24), 2026-11-11:

- `format:check`, `lint`, `typecheck`, `test` (36 testów, w tym 4 nowe dla pytań), `verify:packet`, `build`.
- Renderowanie po stronie serwera: formularz aplikacji z dwoma pytaniami (3 pola tekstowe) i bez pytań (1 pole), edytor oferty z pytaniami dla kategorii oferty, rekord z odpowiedziami dla obu ról.

Niewykonane: testy Playwright i `design-system:check` (Node 24, Chromium), porównanie wizualne z kitem i sprawdzenie klawiatury. Uruchom `./scripts/verify` na Node 24 i obejrzyj widoki przed akceptacją.
