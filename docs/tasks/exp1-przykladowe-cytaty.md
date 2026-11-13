# EXP1: przykładowe aplikacje i karty (dane fikcyjne)

Napisane przez Claude 2026-11-11 na prośbę Konrada. **To nie są dane z CSV Supersprintu**: osoby, teksty i wyniki są wymyślone. Identyfikatory i oferty nie odpowiadają `pub-000001` ani `pub-000002`. Zestaw 1 i 2 to dwie oferty, dopasuj je do prawdziwych publikacji przed sesjami.

- **Zestaw A (obecny widok):** pole „Po asystencie” + Match Score.
- **Zestaw B (karta):** trzy punkty z cytatami z tekstu surowego, braki powiedziane wprost, jedno pytanie.
- Każdy cytat jest dosłownym fragmentem tekstu surowego (sprawdzone skryptem).
- Pole „Kontynuacja” to ukryta wartość do oceny trafności wyboru; nie pokazuj jej uczestnikom. W każdym zestawie kontynuowane są 2 osoby z 6. Wyniki Match Score celowo nie przewidują kontynuacji (jak w danych z VI 2026).
- Pomysł z karty (IDEA2) pokazuje też granice wkładu, jeśli kandydat sam je opisał.

## Zestaw 1

### EXP1-1.1 · Match Score 91% · kontynuacja: nie (ukryte)

**Tekst surowy:** Mam duże doświadczenie w produktach AI. Pracowałem z zespołami nad wdrożeniami automatyzacji i zawsze dbam o wartość biznesową. Lubię łączyć perspektywę użytkownika i technologii.

**Po asystencie (zestaw A):** Jestem doświadczonym specjalistą od produktów AI, który skutecznie łączy perspektywę użytkownika, technologię i wartość biznesową w projektach automatyzacji.

**Karta (zestaw B):**

- **Własny wkład:** brak w tekście (Tekst nie mówi, co kandydat zrobił sam.)
- **Projekt:** „Pracowałem z zespołami nad wdrożeniami automatyzacji” (Ogólnik, bez nazwy projektu.)
- **Efekt:** brak w tekście (Brak efektu.)
- **Pytanie do kandydata:** Opisz jedno wdrożenie: co zrobiłeś sam, a co zespół?

### EXP1-1.2 · Match Score 74% · kontynuacja: tak (ukryte)

**Tekst surowy:** W 2025 sam napisałem pierwszą wersję reguł klasyfikacji zgłoszeń w arkuszu i skrypcie Pythona, zanim dołączył inżynier. Po dwóch miesiącach korzystało z niej 6 osób z działu obsługi. Nie projektowałem interfejsu, to zrobiła koleżanka z zespołu.

**Po asystencie (zestaw A):** Poprowadziłem rozwój systemu klasyfikacji zgłoszeń, od pierwszej wersji reguł po wdrożenie w dziale obsługi, we współpracy z inżynierami i designerami.

**Karta (zestaw B):**

- **Własny wkład:** „sam napisałem pierwszą wersję reguł klasyfikacji zgłoszeń w arkuszu i skrypcie Pythona” (Granica wkładu: „Nie projektowałem interfejsu”.)
- **Projekt:** „reguł klasyfikacji zgłoszeń”
- **Efekt:** „Po dwóch miesiącach korzystało z niej 6 osób z działu obsługi”
- **Pytanie do kandydata:** Kto dziś utrzymuje te reguły?

### EXP1-1.3 · Match Score 83% · kontynuacja: nie (ukryte)

**Tekst surowy:** Odpowiadałem za strategię i roadmapę narzędzia do analizy dokumentów. Koordynowałem prace kilku zespołów i adopcję rozwiązania w organizacji. Efektem było usprawnienie procesów i wyższa satysfakcja użytkowników.

**Po asystencie (zestaw A):** Odpowiadałem za strategię i roadmapę narzędzia do analizy dokumentów, koordynując zespoły i adopcję rozwiązania, co przełożyło się na usprawnienie procesów i satysfakcję użytkowników.

**Karta (zestaw B):**

- **Własny wkład:** „Odpowiadałem za strategię i roadmapę narzędzia do analizy dokumentów” (Rola, nie wiadomo, co kandydat zrobił sam.)
- **Projekt:** „narzędzia do analizy dokumentów”
- **Efekt:** „usprawnienie procesów i wyższa satysfakcja użytkowników” (Bez miary i źródła.)
- **Pytanie do kandydata:** Co z tej roadmapy napisałeś lub zdecydowałeś sam i skąd wiesz, że narzędzie jest używane?

### EXP1-1.4 · Match Score 88% · kontynuacja: nie (ukryte)

**Tekst surowy:** Wdrożyłem chatbota dla działu HR. Chatbot odpowiada na pytania pracowników o urlopy i benefity. Projekt był bardzo udany.

**Po asystencie (zestaw A):** Z powodzeniem wdrożyłem chatbota HR, który usprawnił komunikację z pracownikami w zakresie urlopów i benefitów.

**Karta (zestaw B):**

- **Własny wkład:** „Wdrożyłem chatbota dla działu HR” (Nie wiadomo, czy budował sam, czy zlecał.)
- **Projekt:** „chatbota dla działu HR”
- **Efekt:** „Projekt był bardzo udany” (Bez miary.)
- **Pytanie do kandydata:** Kto zbudował chatbota i ilu pracowników z niego korzysta?

### EXP1-1.5 · Match Score 69% · kontynuacja: tak (ukryte)

**Tekst surowy:** Demo przygotowałem sam w jeden weekend, ale do produkcji wdrażał je zespół platformy i mojego udziału tam już nie było. Użyli go tylko w jednym dziale i po miesiącu go wyłączyli. Najwięcej nauczyłem się z tego, jak nie mierzyć adopcji.

**Po asystencie (zestaw A):** Zainicjowałem i rozwijałem rozwiązanie AI, które zostało wdrożone przez zespół platformy; z projektu wyniosłem cenne wnioski o mierzeniu adopcji.

**Karta (zestaw B):**

- **Własny wkład:** „Demo przygotowałem sam w jeden weekend” (Granica wkładu: „mojego udziału tam już nie było”.)
- **Projekt:** brak w tekście (Tekst nie mówi, co robiło to demo.)
- **Efekt:** „Użyli go tylko w jednym dziale i po miesiącu go wyłączyli” (Efekt negatywny, podany wprost.)
- **Pytanie do kandydata:** Co robiło to demo?

### EXP1-1.6 · Match Score 77% · kontynuacja: nie (ukryte)

**Tekst surowy:** Prowadziłem 12 rozmów z użytkownikami i na ich podstawie opisałem 5 wymagań do asystenta. Wdrożenie robił zewnętrzny dostawca. Nie wiem, jak asystent działa po wdrożeniu.

**Po asystencie (zestaw A):** Na podstawie badań z użytkownikami zdefiniowałem wymagania do asystenta AI wdrożonego we współpracy z zewnętrznym dostawcą.

**Karta (zestaw B):**

- **Własny wkład:** „Prowadziłem 12 rozmów z użytkownikami i na ich podstawie opisałem 5 wymagań do asystenta”
- **Projekt:** „wymagań do asystenta”
- **Efekt:** brak w tekście (Autor sam pisze, że nie zna efektu.)
- **Pytanie do kandydata:** Czy wiesz, czy wymagania weszły do produktu?

## Zestaw 2

### EXP1-2.1 · Match Score 90% · kontynuacja: nie (ukryte)

**Tekst surowy:** Jestem entuzjastą AI i od lat pomagam firmom w transformacji cyfrowej. Wiem, jak przekuć nowe technologie w realne efekty. Szybko się uczę i dobrze pracuję w zespole.

**Po asystencie (zestaw A):** Jako doświadczony ekspert od transformacji cyfrowej skutecznie przekładam technologie AI na mierzalne efekty biznesowe, szybko się ucząc i budując dobre relacje w zespołach.

**Karta (zestaw B):**

- **Własny wkład:** brak w tekście (Tekst nie mówi, co kandydat zrobił sam.)
- **Projekt:** „pomagam firmom w transformacji cyfrowej” (Ogólnik, bez nazwy projektu.)
- **Efekt:** brak w tekście (Brak efektu.)
- **Pytanie do kandydata:** Opisz jeden projekt AI, w którym brałeś udział: co było Twoją częścią?

### EXP1-2.2 · Match Score 80% · kontynuacja: nie (ukryte)

**Tekst surowy:** Zarządzałem projektem wdrożenia narzędzia do generowania ofert. Pracowałem z działem sprzedaży i IT. Narzędzie zostało oddane w terminie.

**Po asystencie (zestaw A):** Poprowadziłem wdrożenie narzędzia AI do generowania ofert, współpracując ze sprzedażą i IT i dostarczając rozwiązanie w terminie.

**Karta (zestaw B):**

- **Własny wkład:** „Zarządzałem projektem wdrożenia narzędzia do generowania ofert” (Zarządzanie, nie wiadomo, co zrobił sam.)
- **Projekt:** „narzędzia do generowania ofert”
- **Efekt:** „Narzędzie zostało oddane w terminie” (Termin, nie użycie.)
- **Pytanie do kandydata:** Czy handlowcy używali narzędzia po oddaniu i ilu?

### EXP1-2.3 · Match Score 72% · kontynuacja: tak (ukryte)

**Tekst surowy:** Sam zbudowałem w Make scenariusz, który przepisuje maile od klientów do CRM. Używa go dziś cały dział, około 15 osób, oszczędność to ok. 4 godzin tygodniowo na osobę, mierzone przez ich własne zgłoszenia. Konfigurację wyjątków robił jednak kolega z IT.

**Po asystencie (zestaw A):** Wdrożyłem automatyzację przepisywania wiadomości od klientów do CRM, która oszczędza zespołowi czas i usprawnia pracę działu.

**Karta (zestaw B):**

- **Własny wkład:** „Sam zbudowałem w Make scenariusz, który przepisuje maile od klientów do CRM” (Granica wkładu: „Konfigurację wyjątków robił jednak kolega z IT”.)
- **Projekt:** „przepisuje maile od klientów do CRM”
- **Efekt:** „Używa go dziś cały dział, około 15 osób, oszczędność to ok. 4 godzin tygodniowo na osobę”
- **Pytanie do kandydata:** Jak mierzono oszczędność czasu?

### EXP1-2.4 · Match Score 86% · kontynuacja: nie (ukryte)

**Tekst surowy:** Odpowiadałem za wprowadzenie Copilota w firmie. Szkoliłem pracowników i budowałem kulturę pracy z AI. Zespoły są zadowolone.

**Po asystencie (zestaw A):** Poprowadziłem wdrożenie Copilota w organizacji, wspierając pracowników szkoleniami i budując kulturę pracy z AI, co spotkało się z wysokim zadowoleniem zespołów.

**Karta (zestaw B):**

- **Własny wkład:** „Szkoliłem pracowników”
- **Projekt:** „wprowadzenie Copilota w firmie”
- **Efekt:** „Zespoły są zadowolone” (Bez miary.)
- **Pytanie do kandydata:** Ilu pracowników przeszkoliłeś i czy korzystają z Copilota po szkoleniu?

### EXP1-2.5 · Match Score 65% · kontynuacja: nie (ukryte)

**Tekst surowy:** Prowadziłem zespół analityków przy projekcie scoringu leadów, ale model zbudowali analitycy. Ja ustalałem priorytety i pilnowałem harmonogramu. Nie wiem, czy handlowcy używali wyniku po moim odejściu.

**Po asystencie (zestaw A):** Kierowałem zespołem analityków w projekcie scoringu leadów, odpowiadając za priorytety i harmonogram.

**Karta (zestaw B):**

- **Własny wkład:** „Ja ustalałem priorytety i pilnowałem harmonogramu” (Granica wkładu: „model zbudowali analitycy”.)
- **Projekt:** „projekcie scoringu leadów”
- **Efekt:** brak w tekście (Autor sam pisze, że nie zna efektu.)
- **Pytanie do kandydata:** Czy wiesz, czy handlowcy zmienili sposób pracy dzięki scoringowi?

### EXP1-2.6 · Match Score 71% · kontynuacja: tak (ukryte)

**Tekst surowy:** Napisałem sam instrukcje i 40 przykładowych odpowiedzi dla asystenta wsparcia, potem przez miesiąc co tydzień poprawiałem je po uwagach konsultantów. Liczba eskalacji spadła z 31% do 22% według raportu z systemu zgłoszeń. Nie byłem właścicielem integracji z systemem.

**Po asystencie (zestaw A):** Wdrożyłem i optymalizowałem asystenta wsparcia, co przełożyło się na wyraźny spadek liczby eskalacji.

**Karta (zestaw B):**

- **Własny wkład:** „Napisałem sam instrukcje i 40 przykładowych odpowiedzi dla asystenta wsparcia” (Granica wkładu: „Nie byłem właścicielem integracji z systemem”.)
- **Projekt:** „asystenta wsparcia”
- **Efekt:** „Liczba eskalacji spadła z 31% do 22% według raportu z systemu zgłoszeń”
- **Pytanie do kandydata:** Kto dziś utrzymuje instrukcje asystenta?
