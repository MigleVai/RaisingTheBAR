# RaisingTheBAR

## Bendravimas su užsakovu

### Pirkėjo klausimai:

1. Kokia kalbą turėtų būti sukurta svetainė?

2. Ar reikia naudoti kažkokią spalvų paletę?

3. Privalomi laukai registruojantis pirkėjui? Ar prisijungiama e-mailu ar reikia susikurti vartotojo vardą?

4. Saugumo reikalavimai slaptažodžiui?

5. Prekių sąrašas pirkėjui - rodomos tik tos kurios yra sandelyje
                             ar visos su galimybe užsisakyti arba pasiteirauti ar bus atvežama daugiau?

6. Kiek laiko prekės turi būti saugomos krepšelyje?

7. Ar prekės krepšelyje gali pakeisti kainą, ar turi visada išlaikyti tokią, kuri buvo įdėjimo metu?

8. Kokius patvirtinimus turi gauti vartotojas apie sėkmingą užsakymą(email, ar tik puslapyje pranešimas)?

9. Ar turi būti galimybė atšaukti užsakymą?

10. Naudojami prisijungimo patogumai: "Remember me", "Forgot password"?


## ToDo sąrašas


### Techninę ataskaitą

  *Nusakyti sukurtos sistemos struktūrą ir parinktas technologijas (kiek architektūrinių sluoksnių naudojama, kaip jie išdėstyti, kokia/kokios technologijos naudojamos kiekviename sluoksnyje) - ne daugiau 0.5 puslapio

#### Kokybiniai reikalavimai

  *Vienas naudotojas gali dirbi su sistema (tame tarpe redagavimo/administravimo režimu) keliuose naršyklės languose (tiek window, tiek tab prasme) tuo pačiu metu, naudodamas tą pačią paskyrą/sesiją (account / login session)
  
  *Sistema turi būti apsaugota nuo SQL injection atakų
  
  *ORM (pvz.: JPA, Entity Framework) ir Data Mapper (pvz. MyBatis, LINQ) technologijos turi būti naudojamos ten, kur prasminga (nekenkia našumui, gerina plečiamumą/lankstumą). Jokia duomenų bazės transakcija (taip pat ir lentelės įrašų rakinimas – locking) neturi apimti interakcijos su naudotoju (pvz.: pradedame transakciją, laukiame kol naudotojas užpildys Web formą, pabaigiame transakciją – labai blogai!). DB transakcija turi prasidėti ir pasibaigti vienos ir tos pačios HTTP užklausos (request) metu (nesvarbu, ar tai AJAX užklausa, ar ne)
  
  *Keliems naudotojams (arba vienam keliuose naršyklės languose) tyčia/netyčia redaguojant tą patį DB objektą ir, kylant redaguojamų duomenų versijų konfliktui
  
  *Parinkti techniniai projektiniai sprendimai turi būti orientuoti į taupų atminties (RAM) naudojimą
  
  *Serveryje ilgai trunkanti operacija neturi priversti naršyklės ilgai laukti atsakymo. Naršyklės puslapis privalo likti "gyvas“ (responsive)

  *Visi dalykinio funkcionalumo (business logic) veiksmai privalo būti žurnalizuojami (fiksuojami faile arba DB), įrašant naudotojo vardą, teises, laiką, vykdomą metodą (klasės pavadinimas + metodo pavadinimas). Tam, kad žurnalizavimo kodą įjungti/išjungti/pakeisti, neturi reikėti modifikuoti/perkompiliuoti stebimo sistemos kodo
  
  *Po sistemos sukūrimo turi būti įmanoma arba pakeisti esamą dalykinį algoritmą nauju jo variantu (Strategy design pattern), arba jį "dekoruoti" (Decorator design pattern), taip, kad nereikėtų modifikuoti ir kompiliuoti seno kodo. T.y. būtų pridedamas tik naujas kodas, ir galimai redaguojamas konfigūracinis failas

## Architektūriniai sprendimai ir jų paaiškinimas


## Svarbios Datos

~~1. Asmeninė studentų registracija: iki balandžio 3 d. 12 val.~~  
~~2. Komandų formavimasis: iki balandžio 6 d. 18 val.~~  
~~3. Komandų priverstinis formavimas: balandžio 8 d.~~  
4. Projektų rezultatų pridavimas: 2017 m. gegužės 31 d. nuo 14 iki 17 val. Naugarduko 204 k.  
5. Projektų gynimai: planuojami birželio 1 ir 4 d.  

## Užrašams

	*Naudingos nuorodos: 
		https://www.dropbox.com/s/wubg7147lpvhmu8/nuoroda_geresne.7z?dl=0
		https://www.dropbox.com/s/5t8epcomb4j8yoe/nuoroda.zip?dl=0

	*Raktažodžiai (su numeriais prioritezuojami):
		1. React
		2. Entity framework
		3. Bootstrap
		redux
		kafka (messaging (publish subscribe pvz))
		BLL (business logic layer)
		DAL (data access layer)
