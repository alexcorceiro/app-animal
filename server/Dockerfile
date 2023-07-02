# Choisissez une image de base avec Node.js
FROM node:14

# Créer un répertoire pour l'application
WORKDIR /usr/src/server

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port que votre application utilise
EXPOSE 7000

# Lancer votre application
CMD [ "npm", "start" ]
