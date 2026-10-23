# 📱 React Native Task Manager Aplikacija

Mobilna aplikacija za upravljanje zadacima (To-Do aplikacija) razvijena pomoću **React Native** i **Expo** okvira, s integriranom **Firebase (Firestore i Authentication)** bazom podataka i sustavom prijave.

---

## 🚀 Glavne značajke
- **Autentifikacija korisnika:** Prijava, registracija i sigurna sesija korisnika podržana s `AsyncStorage` perzistencijom (korisnik ostaje prijavljen nakon gašenja aplikacije).
- **Upravljanje zadacima (CRUD):** 
  - Dodavanje novih zadataka s nazivom, opisom, kategorijom i oznakom važnosti (`vazan`).
  - Pregled svih zadataka u realnom vremenu (`onSnapshot` sinkronizacija s Firestore bazom).
  - Uređivanje postojećih zadataka, mijenjanje statusa dovršenosti i oznake važnosti.
  - Brisanje zadataka uz sigurnosnu potvrdu (`Alert`).
- **Napredno filtriranje i pretraga:**
  - Pretraživanje zadataka po nazivu u stvarnom vremenu.
  - Filtriranje po statusu (*Svi*, *Aktivni*, *Završeni*) i kategoriji (*Privatno*, *Posao*, *Škola*).
- **Vizualni indikatori:** Oznaka zvjezdice (`⭐`) za važne zadatke i dinamički statusni krugovi.

---

## 🛠️ Korištene tehnologije
- **Frontend:** React Native, Expo, React Navigation (Stack Navigator)
- **Backend & Baza podataka:** Firebase Authentication & Cloud Firestore
- **Lokalna pohrana:** AsyncStorage
- **Alati:** Git, GitHub, VS Code

---

## ⚙️ Instalacija i pokretanje projekta

Slijedi ove korake kako bi pokrenuo projekt na svom računalu:

### 1. Kloniranje repozitorija
git clone https://github.com/LovreDido/react-mative-task-app.git 
cd react-native-task-app

### 2. Instalacija potrebnih paketa:
npm install

### 3. Pokretanje poslužitelja:
npx expo start --lan

Aplikaciji pristupi skeniranjem QR koda putem Expo Go aplikacije na svom mobilnom uređaju.

---

## 👨‍💻 Autor
Ovaj projekt je izrađen kao seminarski rad / praktična vježba za mobilne aplikacije.
