# 🏆 OneGoal - Goal Tracker

OneGoal est une application web permettant de **créer, gérer et structurer des objectifs** de manière avancée. Grâce à son interface intuitive et son système de suivi performant, il aide les utilisateurs à organiser leurs objectifs en sous-objectifs et tâches, tout en visualisant leur progression.

---

## ✨ Fonctionnalités principales

✅ **Authentification sécurisée**  
- Inscription et connexion avec hachage des mots de passe (**bcrypt**)  
- Vérification d'email via **Nodemailer** (anti-bot)  
- Gestion des sessions avec **JWT**  

✅ **Gestion avancée des objectifs**  
- Création d’objectifs et sous-objectifs imbriqués  
- Ajout de tâches associées à chaque sous-objectif  
- Modification et suppression des objectifs/sous-objectifs/tâches  
- Gestion visuelle et interactive des objectifs via un **calendrier**  

✅ **Suivi de progression**  
- Interface dynamique affichant l’évolution des objectifs  
- Dashboard interactif avec **indicateurs de progression**  

✅ **Backend robuste**  
- API REST codée en **Node.js + Express**  
- Base de données **MySQL gérée avec Sequelize**  
- Sécurité renforcée avec **validation des entrées** et protections anti-injections SQL  

✅ **Frontend ergonomique**  
- Développé en **React** avec une UI moderne et **TailwindCSS**  
- Composants réutilisables pour une meilleure maintenabilité  
- Expérience utilisateur fluide et responsive  

---

## 🚀 Technologies utilisées

| Technologie        | Description |
|-------------------|-------------|
| **Frontend**     | React, TailwindCSS |
| **Backend**      | Node.js, Express, Sequelize |
| **Base de données** | MySQL |
| **Authentification** | JWT, bcrypt |
| **Sécurité**     | Nodemailer, Helmet, Validation des entrées |
| **Gestion des requêtes** | Axios |
| **Autres**       | dotenv (gestion des variables d’environnement), CORS |

---

## 📸 Aperçu du projet

> **Ajoute ici des captures d'écran de l'interface** pour illustrer le projet.  
> Exemple :  
> ![Aperçu du Dashboard](https://via.placeholder.com/800x400.png?text=Capture+d%27%C3%A9cran)

---

## 🛠 Installation & Configuration

### 1️⃣ **Cloner le projet**
```bash
git clone https://github.com/ton-profil/onegoal.git
cd onegoal
```

### 2️⃣ **Installation des dépendances**
#### 📌 Backend
```bash
cd backend
npm install
```
#### 📌 Frontend
```bash
cd frontend
npm install
```

### 3️⃣ **Configurer la base de données**
1. **Créer une base de données MySQL**
```sql
CREATE DATABASE onegoal;
```
2. **Configurer les accès** dans le fichier `.env` :
```env
DATABASE_URL=mysql://user:password@localhost:3306/onegoal
JWT_SECRET=ton_secret
SMTP_USER=ton_email
SMTP_PASS=ton_mot_de_passe
```
3. **Appliquer les migrations (si Sequelize est utilisé)**
```bash
npx sequelize db:migrate
```

### 4️⃣ **Lancer le projet**
#### 🌐 Backend
```bash
npm start
```
#### 🎨 Frontend
```bash
npm run dev
```

---

## 🧑‍💻 API - Endpoints principaux

| Méthode | Endpoint | Description |
|---------|---------|-------------|
| **POST** | `/api/auth/register` | Inscription d’un utilisateur |
| **POST** | `/api/auth/login` | Connexion d’un utilisateur |
| **POST** | `/api/goals` | Création d’un objectif |
| **GET** | `/api/goals` | Récupération de tous les objectifs |
| **PUT** | `/api/goals/:id` | Mise à jour d’un objectif |
| **DELETE** | `/api/goals/:id` | Suppression d’un objectif |

> 📌 **Ajoute plus d’endpoints si nécessaire** pour bien détailler ton API.

---

## 🤝 Contact

📬 **Me contacter :**  
📧 Email : romeoprtl.dev@gmail.com(mailto:romeoprtl.dev@gmail.com)  
💼 LinkedIn : https://www.linkedin.com/in/romeo-portolan-a89459184/ 



