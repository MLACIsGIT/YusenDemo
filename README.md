# CUSTOMER PORTAL
## 1. Bevezetés

A fejlesztés célja egy olyan weboldal létrehozása, amelyen keresztül szállítmányozással foglalkozó megbízónk saját ügyfeleinek tájékoztatást tud nyújtani a szállításokról, raktárkészletekről és számlákról.

## 2. Telepítés

### 2.1. Környezeti változók beállítása - backend
- Hozza létre a __backend/.env__ fájlt a __backend/.env.example__ fájl alapján. 
- __MONGO_CONNECT__ : Az Ön MongoDb adatbázisának elérhetősége
- __JWT_KEY__ : A jsonwebtoken összetevő titkosító kulcsa. Ez legyen egy 10-32 hosszú, véletlenszerűen meghatározott, angol kis- és nagybetűkből valamint számokból álló karaktersorozat.
- __PORT__ : a backend kommunikációs port-ja. Kérem, hogy ez legyen a docker-compose.yml fájlal összhangban 4000.
- __REG_EMAIL__ kezdetű változók: a program email-eket küld, ezért egy létező smtp szerver adatait kell itt megadni. Javasolom, hogy regisztráljon a __https://mailtrap.io__ szolgáltatására. Kérem, hogy ezeket a beállításokat az Ön regisztrációjának megfelelően állítsa be a __docker-compose.yml__ fájlban is.
- Fentiekhez hasonlóan kérem hozza létre a __backend/.env.test__ fájlt is a __backend/.env.test.example__ fájl alapján. __FIGYELEM!__  A MONGO_CONNECT környezeti változóban ne ugyanazt az adatbázist adja meg, mint amit a backend/.env fájlban megadott!

### 2.2. Környezeti változók beállítása - frontend
- Hozza létre a __frontend/.env__ fájlt a __frontend/.env.example__ fájl alapján.
- A __REACT_APP_API_BASE_URL__ környezeti változóban a backend elérését adja meg.

### 2.3. Környezeti változók beállítása - Docs (Swagger dokumentáció szervere)
- Hozza létre a __docs/.env__ fájlt a __docs/.env.example__ fájl alapján.
- Az __API_DOC_PORT__ környezeti változóban a Docs szerver elérését adja meg. Javasolom, hogy API_DOC_PORT=5000 értéket adjon meg.

### 2.4. Rendszer futtatása Docker környezetből
Mielőtt futtatja a docker-compose up parancsot, nagyon fontos, hogy a docker-compose.yml fájlban a __REG_EMAIL__ kezdetű környezeti változókat az Ön smtp szerverének megfelelően állítsa be!

Kérem futtassa a __docker-compose up__ parancsot.

Ennek hatására a következő alrendszerek (konténerek) indulnak el:
- Backend: http://localhost:4000
- Frontend: http://localhost:3000
- Swagger dokumentáció: http://localhost:5000



## 3. Quickstart - rövid felhasználói ismertető

### 3.1 Alkalmazás célja
A gyártócégek egyik megoldandó részfeladata az elkészült termékek ügyfelekhez / bolthálózatba való eljuttatása. Például egy ablak gyártó cég a naponta elkészített ablakokat el szeretné juttatni az építkezésekre, ahol azokat beépítik. Mivel naponta több tucat címre szállítja ki az elkészült ablakokat, ezért szerződést köt egy fuvaros céggel. Az elkészült ablakokat a fuvaros cég raktárába beszállítja, majd naponta kötegelve megrendeli a szállításokat. A szállításokról, a raktári készletekről és az elszámolásokról (fuvarszámlákról) a fuvaros cég folyamatos tájékoztatási kötelezettséggel tartozik.
A létrehozott weboldal ezt a kommunikációt valósítja meg: a fuvaros cég a weboldalon keresztül tájékoztatást tud adni a gyártónak.

Fuvaros cég lokális fuvarszervező programmal rendelkezik. Ezt __TMS__-rendszernek hívjuk a továbbiakban (Transport Management System). Ebben a rendszerben rögzítik a szállítási feladatokat, raktár készleteket és számláznak. Ezeket az adatokat elektronikus úton továbbítják a __CUSTOMER PORTAL__ felé.
A CUSTOMER PORTAL a fuvaros cég tulajdona, ő üzemelteti és bejelentkezést biztosít __meghívásos alapon__ a gyártó cégeknek, akiknek szállít.
A weboldal funkciója tehát kettős:
1. szállítási feladatok, készlet adatok és számla adatok fogadása a TMS-ből
2. információ szolgáltatás a gyártó cégek felé a szállítások állapotáról, a raktári készletekről és a fuvarszámlákról.
 
A következő pontban megismerkedünk a weboldal használatával felhasználói oldalról.

### 3.2 Weboldal funkcióinak rövid leírása a __Gyártó cég__ szemszögéből
- Lépjen a böngészőben a __http://localhost:3000__ címre.
- Válassza ki a kommunikáció nyelvét a jobb felső részben található nyelv választóból. Magyar, német és angol nyelvekből választhat. (A szállítási folyamat gyakran nemzetközi, ezért a weboldal többnyelvűsége alapkövetelmény.)
- Lépjen először mint vendég. Ebben az esetben csak a __"Hírek, üzenetek"__ és a __"Kapcsolat"__ menüpontok elérhetők az Ön számára. A "Hírek, üzenetek" menüpontban a fuvarozó cég tájékoztathatja Önt fontos eseményekről. A "Kapcsolat" menüpont alatt a fuvarozó cég telephelyeinek elérhetőségeit találja.
- Méretezze át a böngésző ablakot! A weboldal __reszponzív__ módon minden méretben áttekinthető formában fog megjelenni.
- Lépjen ki a jobb felső sarokban található __"Kilépés"__ gombra kattintva és most jelentkezzen be a következő adatokkal: felhasználó: __gyarto.ceg@felhasznalo.hu__ jelszó: __12345678__
- Kattintson a __"Beállítások"__ menüpontra. Itt személyes adatait nézheti meg és javíthatja.
- Kattintson a __"Fuvarjaim"__ menüpontra. Kattintson az __"Adatok előszűrése"__ sávra. Az itt található mezőkben szűkítheti a találatokat. Kérem, hogy elsőre itt ne adjon meg semmit. Kattintson a __"Fuvarjaim"__ sávra. A telepítés során példa adatok lettek feltöltve, így számos találatot fog kapni.
- __A listát rendezheti__ az oszlopok fejlécére kattintva. Ha az egér mutatót egy-egy fejléc oszlop megnevezésére vezeti, akkor egy kis ikon jelenik meg 3 vonallal. Ha erre rákattint, akkor __szűrheti a találatokat__ az oszlop adatai alapján.
- A __zöld Excel__ gombra kattintva az adatokat Excel formátumban letöltheti.
- Kattintson a __Számláim__ vagy a __Raktárkészletem__ menüpontokra. Ezeket a pontokat a "Fuvarjaim" menüpontban megismert funkcionalitáshoz hasonló módon kezelheti.
- A belépéskor kapott token 15 percig érvényes. A lejárat előtt 2 perccel egy jelzés fog megjelenni egy vízszintes sávban a weboldal menüpontjai felett, amelyben a __"Meghosszabbítás"__ gombra kattintva új token-t kérhet. Ha a meghosszabbítást elmulasztja, akkor a weboldal 2 perc várakozás után kilépteti Önt és ismét a bejelentkező képernyőre navigál. 

### 3.3 Weboldal funkcióinak rövid leírása a __Fuvaros cég__ szemszögéből
- Lépjen a böngészőben a __http://localhost:3000__ címre, válassza ki a kommunikáció nyelvét és lépjen be a következő adatokkal: felhasználó: __fuvaros.ceg@admin.hu__ jelszó: __12345678__
- A weboldalon a 3.2-es ponthoz hasonló funkciókkal találkozhat a következő különbségekkel:
- A hírfolyamot most szerkeszteni is tudja a __"Hírek, üzenetek"__ oldalon a hírek mellett található __ceruza__ (= szerkesztés), __szemétkosár__ (= törlés) és a jobb felső sarokban található __+ (plussz)__ (= új felvitel) gombra kattintva.
- A __"Fuvarjaim"__, __"Raktárkészletem"__ és "__Számláim__" menüpontban minden gyártó cég összes adatát láthatja. (Gyártó cégként bejelentkezve csak a saját számláit, készleteit és fuvarjait láthatja).
- A __"Beállítások"__ menüpontban nem csak saját adatait szerkesztheti, hanem a __"Felhasználók kezelése"__ menüpontban törölheti is azokat a felhasználókat, amelyekre már nincsen szükség. Új felhasználó felvitele itt nem lehetséges, mert azt a TMS rendszerből indítva lehet kezelni.

### 3.4 __TMS__ rendszer funkcióinak áttekintése
- A __TMS rendszer Rest api hívásokon keresztül__ kapcsolódik a CUSTOMER PORTAL-hoz.
- Kérem, hogy a letöltött repository "restApiRequestsForTMS" mappájában található __"restApiRequestsForTMS.json"__ fájlt importálja be __Postman__ programjába ahhoz, hogy az ebben a pontban leírt funkciókat kipróbálhassa.

__A Postman programba importált hívások ismertetése:__
- A __localsystem__ végpontjai IP ellenőrzéssel védettek. Ezt az ellenőrzést a __backend/middlewares/verifyLocalSystem.js__ middleware végzi. Az IP-címet a __"LOCAL_SYSTEM_IP"__ környezeti változóban lehet megadni. Ha itt egy "*"-ot (csillag) ad meg, akkor a rendszer nem végez ellenőrzést.
- __localsystem/invoices/upload__ request segítségével számlát tölthet fel a rendszerbe. A CUSTOMER PORTAL a __localsystemId__ mezőben megadott azonosítóval rendeli hozzá az új számlát a gyártó céghez.
- __localsystem/deliveries/upload__ request segítségével szállítási feladatot tölthet fel a rendszerbe.
- __localsystem/stocks/upload__ request segítségével egy áru készlet adatait adhatja meg.
- __localsystem/register__ request segítségével új felhasználót hozhat létre. A regisztrációs folyamat részletes leírása a __"Új felhasználó létrehozásának folyamata"__ részben található.

### 3.5 Regisztrációs folyamat
- A Postman programban a __localsystem/register__ request segítségével hozhat létre új felhasználót.
- A backend egy e-mail-t küld az új felhasználó e-mail címére.
- Az e-mail-ben 2 link található. Az elsővel elfogadhatja a meghívást és aktiválhatja fiókját a böngészőben megjelenő "Első bejelentkezés" oldalon. ( Forráskódban: frontend/Pages/FirstLogin oldal. ) Itt módosíthatja a nevét, el kell fogadnia a GDPR rendelkezéseket és a használati feltételeket és meg kell adnia jelszavát. A jelszó legyen legalább 8 karakteres, tartalmazzon kis- és nagybetűket valamint speciális karaktereket.
- A 2. link segítségével elutasíthatja a meghívást. ( Forráskódban: frontend/Pages/DismissRegistration oldal. ) A weboldal ebben az esetben törli a felhasználó adatait a rendszerből.
- Amíg a fiók nincs aktiválva, nem lehet vele belépni a rendszerbe.

## 4 Műszaki specifikáció - backend

### 4.1 Alkalmazott technológia
- __Futtató környezet__  
Node JS (v14.17.4)
- __Framework__  
Express
- __3thparty függőségek__  
bcryptjs -jelszavak titkosítása  
cors - szerverek közötti hívások engedélyezése  
dotenv - környezeti változók kezelése  
jsonwebtoken - token alapú authentikáció  
morgan - kérések log-olása  
nodemailer - e-mail küldés  
validator - adatok formátumának ellenőrzése  
winston - log-olás  

- __Tesztelés__  
Jest  

### 4.2 Megvalósított funkcionalitás
A backend funkcióinak rendszer szintű leírását a __docs/openapi.yaml__ fájlban találja. Megjelenítéséhez kérem indítsa el a docs könyvtárban található szervert vagy a program docker változatát és navigáljon a __http://localhost:5000__ oldalra.

## 5 Műszaki specifikáció - frontend

### 5.1 Alkalmazott technológia
- __Keretrendszer__  
React (v17.0.2)
- __3thparty függőségek__  
Google material icons - vektor technológiával előkészített ikonok  
Bootstrap 5  
ag-grid - professzionális táblázat megjelenítő  
file-saver - Fájl készítése (Excel adatexport letölthető fájlba mentéséhez)  
validator - adatok formátumának ellenőrzése  
sass - CSS compiler  
xlsx - Excel formátumot előállító 3thparty alkalmazás  

- __Tesztelés__  
Jest

### 5.2 Aloldalak listája
- __PageContact__ - Cég elérhetőségei
- __PageContactVienna__ - Cég bécsi telephelyének adatai
- __PageContactBudapest__ - Cég budapesti telephelyének adatai
- __PageContactKoper__ - Cég koperi telephelyének adatai
- __PageDeliveries__ - szállítások adatainak lekérdezése
- __PageDismissRegistration__ - Emailben kapott meghívás elutasítása
- __PageFirstLogin__ Emailben kapott meghívás elfogadása után adategyeztetés és első belépés
- __PageGreeting__ Üdvözlő oldal (Nyitó oldal)
- __PageHome__ Hírek, üzenetek
- __PageInvoices__ Számlák lekérdezése
- __PageLogin__ Bejelentkezés
- __PageSaSettings__ Adminisztrátor választó menüje (saját adatok szerkesztése / felhasználók kezelése )
- __PageSettings__ Felhasználó személyes adatainak szerkesztése
- __PageStocks__ Készletadatok lekérdezése

### 5.3 Komponensek ismertetése
- __DataGrid__ Táblázat megjelenítése az ag-grid 3thparty alkalmazás segítségével
- __ExcelExport__ Excel fájl előállítása
- __Filters__ GridReport komponenshez paraméterezhető előszűrő
- __FirstLoginForm__ Form komponens felhasználó személyes adatainak szerkesztésére
- __FormBorder__ egységes design megvalósításához keret (a narancsárga keretek az oldalakon)
- __GridReport__ paraméterezhető szűrővel és paraméterezhető adattartalommal megjelenő táblázat alapú adat megjelenítés
- __HamMenu__ hamburger menü paraméterezhető menüpontokkal
- __Header__ egységes fejléc megjelenítéséért felelős komponens. Magában foglalja a fejléc fő elemeit, a "Kilépés" gombot (LoggedUser), a nyelvválasztót (LanguageSelector) és a token lejárását figyelő/kezelő komponenst (TokenExpirationMessage)
- __HeaderLine__ Címsor. (Vízszintes kék elválasztó vonal a header és az aktuális oldal tartalma között, az aktuális oldal aktuális nyelvű címével.)
- __Infobox__ egységesen megjelenő információkat megjelenítő keret (narancssárga kerettel, fehér címsorral és logo-val, enyhén áttetsző szürke háttérrel és paraméterezhető adattartalommal)
- __InputFieldSet__ Adatok bevitelét szolgáló html input mezők gyűjteménye react vezérléssel
- __LoggedUser__ Aktuálisan belépett felhasználó e-mail címének megjelenítése és a narancssárga "Kilépés" gomb létrehozása, logout kezelése
- __LoginForm__ A bejelentkezéshez szükséges adatok (e-mail és jelszó) megadására szolgáló komponens "Belépés" és "Vendég" gombbal és azok kezelésével
- __News__ Hírek és üzenetek megjelenítésére szolgáló komponens
- __ReportInvoice__ Számlák összefoglaló táblázatának megjelenítése szűrőmezőkkel
- __TokenExpirationMessage__ Token lejáratát kezelő modul (a fejlécben ez jeleníti meg a token lejáratára figyelmeztető üzenetet és a "Meghosszabbítás" gombot)
- __UserDataForm__ Felhasználó adatainak szerkesztésére szolgáló form
- __LanguageSelector__ Weboldal nyelvének kiválasztására szolgáló beviteli mező (select) kezelése és a weboldal nyelvi megjelenítésének beállítása

## Műszaki specifikáció - Adatbázis
- __Adatbázis__  
MongoDb  

- __Adatbázis kezelő__  
Mongoose  

- __Collections__  
__Deliveries__ : Szállítások adatai  
__Invoices__ : Számlák adatai  
__News__ : Hírek, üzenetek adatai  
__Stocks__ : Raktári készletek adatai  
__Users__ : Felhasználók adatai  
__UserLevels__ : Felhasználói szintek adatai.  
A rendszer 3 felhasználói szintet kezel:  
OWNER_SA: fuvaros cég rendszergazda - teljes betekintés az adatokba, törölhet felhasználókat
OWNER_USER: fuvaros cég adminisztrátor - teljes betekintés az adatokba
CUSTOMER: csak saját számláit, szállításait és raktári készleteit láthatja
