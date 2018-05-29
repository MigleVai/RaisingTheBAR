#### Kokybiniai reikalavimai

  ~~*Vienas naudotojas gali dirbi su sistema (tame tarpe redagavimo/administravimo režimu) keliuose naršyklės languose (tiek window, tiek tab prasme) tuo pačiu metu, naudodamas tą pačią paskyrą/sesiją (account / login session)~~ Naudojamas JWT token, kuris saugomas naršyklėje  https://github.com/vzilinas/RaisingTheBAR/blob/master/RaisingTheBAR/RaisingTheBAR.BLL/Controllers/UserController.cs
  Eilutė: 222 - 240 
  
  ~~*Sistema turi būti apsaugota nuo SQL injection atakų~~ Naudojame LINQ to Entities kuris naudoja object model API, o ne injecting literals
  
  ~~*ORM (pvz.: JPA, Entity Framework) ir Data Mapper (pvz. MyBatis, LINQ) technologijos turi būti naudojamos ten, kur prasminga (nekenkia našumui, gerina plečiamumą/lankstumą). Jokia duomenų bazės transakcija (taip pat ir lentelės įrašų rakinimas – locking) neturi apimti interakcijos su naudotoju (pvz.: pradedame transakciją, laukiame kol naudotojas užpildys Web formą, pabaigiame transakciją – labai blogai!). DB transakcija turi prasidėti ir pasibaigti vienos ir tos pačios HTTP užklausos (request) metu (nesvarbu, ar tai AJAX užklausa, ar ne)~~ Entity framework does that for us: https://stackoverflow.com/a/39361759
  
  ~~*Keliems naudotojams (arba vienam keliuose naršyklės languose) tyčia/netyčia redaguojant tą patį DB objektą ir, kylant redaguojamų duomenų versijų konfliktui~~ Naudojamas concurrency token ant Porduct  https://github.com/vzilinas/RaisingTheBAR/blob/a22150b658f72755290e777cf97dc1dcbbf6da2c/RaisingTheBAR/RaisingTheBAR.DAL/EFContext.cs
  Eilutė: 68 - 74
    
  ~~*Parinkti techniniai projektiniai sprendimai turi būti orientuoti į taupų atminties (RAM) naudojimą //~~ React virtual DOM
  
  ~~*Serveryje ilgai trunkanti operacija neturi priversti naršyklės ilgai laukti atsakymo. Naršyklės puslapis privalo likti "gyvas“ (responsive)~~ Promise based requests

  ~~*Visi dalykinio funkcionalumo (business logic) veiksmai privalo būti žurnalizuojami (fiksuojami faile arba DB), įrašant naudotojo vardą, teises, laiką, vykdomą metodą (klasės pavadinimas + metodo pavadinimas). Tam, kad žurnalizavimo kodą įjungti/išjungti/pakeisti, neturi reikėti modifikuoti/perkompiliuoti stebimo sistemos kodo. (Hint: https://damienbod.com/2015/09/15/asp-net-5-action-filters/)~~ LoggingActionFilter https://github.com/vzilinas/RaisingTheBAR/blob/master/RaisingTheBAR/RaisingTheBAR.BLL/Filters/LoggingActionFilter.cs
  
  ~~*Po sistemos sukūrimo turi būti įmanoma arba pakeisti esamą dalykinį algoritmą nauju jo variantu (Strategy design pattern), arba jį "dekoruoti" (Decorator design pattern), taip, kad nereikėtų modifikuoti ir kompiliuoti seno kodo. T.y. būtų pridedamas tik naujas kodas, ir galimai redaguojamas konfigūracinis failas~~ Strategy for PaymentService  https://github.com/vzilinas/RaisingTheBAR/blob/master/RaisingTheBAR/RaisingTheBAR.BLL/Startup.cs
  Eilutė: 51 - 58
