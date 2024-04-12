# WeatherApp

WeatherApp est une application web de consultation météorologique. Elle permet de consulter les prévisions de la journée. Elle a été développée à l'aide de ExpressJS (serveur), SQLite (bd) et Twig (templates).

## Commencer

Ces instructions vous permettront de mettre en place une copie du projet en exécution en local.

### Prérequis

Ce projet nécessite Node.js et npm pour s'exécuter localement. Assurez-vous de les avoir installés sur votre système.

### Installation

Suivez ces étapes pour configurer le projet localement :

1. Clonez ce dépôt sur votre machine locale :
      git clone https://exemple.com/weatherapp.git
      cd weatherapp

2. Installez les dépendances :
       npm install
   
4. Démarrez le serveur :
       npm start

L'application sera accessible sur le port 3000 ('http://localhost:3000')

## Usage

Utilisez l'application pour consulter les prévisions météorologiques de la journée par ville ajoutée en naviguant sur l'interface web.

1. Accéder à la page d'accueil (qui affiche la liste des villes ajoutées)
   
![Screen : HomePage][sreens_ui/HomePage.png]

2. Ajouter une ville

![Screen : AddCityForm][sreens_ui/AddCityPage.png]

3. Rechercher une ville

![Screen : SearchCityBar][sreens_ui/SearchCityBar.png]

![Screen : SearchCityBar][sreens_ui/SearchCityBar_2.png]

4. Consulter la météo d'une ville donnée

![Screen : WeatherPage][sreens_ui/WeatherPage.png]

![Screen : WeatherPage][sreens_ui/WeatherPage_2.png]

Plus de screenshoots disponibles dans le dossier 'screens_ui/' (responsive design).

## Documentation

La documentation du code est générée à l'aide de JSDoc. Vous pouvez la consulter en ouvrant le fichier `index.html` situé dans le dossier `docs`.
Placez vous au niveau du dossier doc et lancer la commande :
        http-server

#### Auteur

Beatriz Moura - Développement initial - BeaMoura0906
