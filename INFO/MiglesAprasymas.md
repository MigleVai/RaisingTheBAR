Modeliai  
Cart   
1. Modeliu fordelyje sukuriama klase Cart su duomenimis kurie bus lenteleje (id, price, etc.)  
2. Nustatomi keys, foreignkey -> sujungimui su Useriu reikia ideti virtual (kai su Icollection) cart property i user modeli, i cart modeli reikia ideti user foreignkey ir user property
3. EFcontext ideti property DBSet<Cart> carts kad sukurti lentele  
4. EntityFramwork/Add-Migration [migracijosPavadinimas] <- command   to console
5. EntityFramwork/Update-Database <- command kad localioj db butu sukurta lentele/ duombaze  
Note:  
a) jei kazkokie atnaujinimai DB please pasipullinti isnaujo is gito kad nebutu nesusipratimu ir paupdatinti duombaze  
b) migracijos yra unikalios,  migracijoje yra kodas kuris yra sugeneruotas (panasus i SQL) tad ji galima perziureti pries updatinant kad patikrinti ar viskas okai  
c) migracijose neapsimoka daryti pakeitimu, nes kitiems jie neissisaugo  
d) SQL server manager studio (SSMS) reikia tureti, jame galima paziureti sukurta lentele ir kurti duomenis (userius, cart'us, etc).

API -> application programming interface  
Web API -> bussiness logic  
TIK SU GET/POST/DELETE:  
1. Prirasyti komentarus  
//[metodoVardas] {path kaip iki jo nueiti}  
PVZ //GET api/values/5  
2. Atributas turi buti [HttpGet], [HttpPost] or t.t.  
3. per get'us siusti pavienius parametrus (string'as, int'as, etc) a.k.a. JOKIU objektu  
4. Postman naudojamas testavimui http requestams ir taip patikrinam ar viskas ok su ju gavimu arba siuntimu (mockinam userio siunciamus requestus)  
5. Visi kalba Json'u o ne xml ar dar kuo  
6. Visi objektai yra serializuojami i json ir tada siunciami, ar gaunami jie yra deserializuojami  
7. PVZ serializacijos ir deserializacijos - https://www.newtonsoft.com/json (po desine JSON.NET pavadinimu)  
8. route yra nustatomas pagal [Route("api/[controller]")] -> i controlleri yra ikeliama metodo pavadinimas, jei virs jo yra atributas su pvz [HttpGet("[action]")] BUTENT SU ACTION
  
NOTE: Vytautas turi paasikinti arba rasti gera tutorial  

Vytautas dabar paaiskina kaip veikia callai i tinklalapi/ severi kas daroma su userio inputu and stuff, promises, response and also stuff
