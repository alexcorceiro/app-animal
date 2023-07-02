# Choisissez une image de base avec Node.js
FROM node:14

# Installer expo-cli globalement
RUN npm install -g expo-cli

# Créer un répertoire pour l'application
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port pour Expo
EXPOSE 19000


# Lancer l'application avec Expo
CMD [ "npx", "expo", "start" ]
