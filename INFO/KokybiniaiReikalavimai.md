#### Kokybiniai reikalavimai

  *Vienas naudotojas gali dirbi su sistema (tame tarpe redagavimo/administravimo režimu) keliuose naršyklės languose (tiek window, tiek tab prasme) tuo pačiu metu, naudodamas tą pačią paskyrą/sesiją (account / login session)
  
  *Sistema turi būti apsaugota nuo SQL injection atakų
  
  *ORM (pvz.: JPA, Entity Framework) ir Data Mapper (pvz. MyBatis, LINQ) technologijos turi būti naudojamos ten, kur prasminga (nekenkia našumui, gerina plečiamumą/lankstumą). Jokia duomenų bazės transakcija (taip pat ir lentelės įrašų rakinimas – locking) neturi apimti interakcijos su naudotoju (pvz.: pradedame transakciją, laukiame kol naudotojas užpildys Web formą, pabaigiame transakciją – labai blogai!). DB transakcija turi prasidėti ir pasibaigti vienos ir tos pačios HTTP užklausos (request) metu (nesvarbu, ar tai AJAX užklausa, ar ne)
  
  *Keliems naudotojams (arba vienam keliuose naršyklės languose) tyčia/netyčia redaguojant tą patį DB objektą ir, kylant redaguojamų duomenų versijų konfliktui
  
  *Parinkti techniniai projektiniai sprendimai turi būti orientuoti į taupų atminties (RAM) naudojimą
  
  *Serveryje ilgai trunkanti operacija neturi priversti naršyklės ilgai laukti atsakymo. Naršyklės puslapis privalo likti "gyvas“ (responsive)

  *Visi dalykinio funkcionalumo (business logic) veiksmai privalo būti žurnalizuojami (fiksuojami faile arba DB), įrašant naudotojo vardą, teises, laiką, vykdomą metodą (klasės pavadinimas + metodo pavadinimas). Tam, kad žurnalizavimo kodą įjungti/išjungti/pakeisti, neturi reikėti modifikuoti/perkompiliuoti stebimo sistemos kodo. (Hint: https://damienbod.com/2015/09/15/asp-net-5-action-filters/)
  
  *Po sistemos sukūrimo turi būti įmanoma arba pakeisti esamą dalykinį algoritmą nauju jo variantu (Strategy design pattern), arba jį "dekoruoti" (Decorator design pattern), taip, kad nereikėtų modifikuoti ir kompiliuoti seno kodo. T.y. būtų pridedamas tik naujas kodas, ir galimai redaguojamas konfigūracinis failas (Hint: https://medium.com/@willie.tetlow/net-core-dependency-injection-decorator-workaround-664cd3ec1246)