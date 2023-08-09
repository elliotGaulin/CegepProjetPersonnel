# Tests fonctionnels

## Navigation et redirection
1. À l'accès initial au site web, on est redirigé vers la page de connexion
1. Suite à la connnexion ou l'inscription, on est redirigé à la page d'accueil
1. On ne peut pas accéder à la page de connexion en étant connecté.
1. On ne peut pas accéder à la page d'inscription en étant connecté.
1. Suite à une déconnexion, on est redirigé vers la page de connexion si jamais on se trouve sur une page protégée (par exemple : la page d'accueil).
1. Si on clique sur le titre du site web, on retourne à la page d'accueil.
1. Si on clique droit sur le titre du site web, on se dirige vers l'easter egg de chat.
1. Les liens pour passer entre la page de connexion et la page d'incription fonctionnent

## Authentification
9. La connexion fonctionne.
1. Un message d'erreur informe l'utilisateur si ses information de connexion sont erronées.
1. L'inscription fonctionne. 
1. Tout les champs de l'inscription sont requis
1. Une validation est effectuée sur le champ courriel pour s'assurer d'avoir un courriel (inscription)
1. La longueur mininum du mot de passe est validée (inscription)
1. Le bouton de déconnexion fonctionne
1. L'utilisateur connecté est sauvegardé dans le *localStorage* afin de garder en mémoire l'utilisateur à le fermeture du navigateur

## Page d'accueil (navigteur de fichiers)
17. Les fichiers de l'utilisateur sont affichés
1. Le tri des fichiers fonctionne
1. La taille des fichiers est affichée en octets, kilo-octets, méga-octets ou giga-octets selon la taille du fichier
1. Le bouton de téléchargement fonctionne
1. Le bouton de suppression fonctionne
1. Le bouton de partage fonctionne
1. Le bouton de téléversement ouvre une fenêtre de sélection de fichier
1. La fenêtre de sélection de fichier permet de sélectionner un fichier et affiche le nom du fichier sélectionné
1. Le bouton soumettre de la fenêtre de sélection de fichier fonctionne
1. Le bouton soummettre de la fenêtre de sélection de fichier est désactivé si aucun fichier n'est sélectionné
1. Le bouton soummettre de la fenêtre de sélection de fichier est en chargement lors de l'envoi du fichier

## Easter egg de chat
28. La page montre une image de chat
1. L'image de chat est aléatoire

## Visibilité des fichiers
30. Les fichiers privés ne sont pas téléchargeables par un lien.
1. Les fichiers public sont téléchargeables par un lien.
1. Le changement de visibilité d'un fichier fonctionne
1. Un nouveau fichier est privé par défaut

## Dossiers
34. Les dossiers sont correctement affichés dans le navigateur de fichiers
1. Les dossiers sont affichés en premier dans le navigateur de fichiers
1. Les boutons d'actions affichés sont seulement ceux qui sont pertinents pour un dossier
1. L'ajout d'un dossier fonctionne
1. Le bouton de suppression de dossier fonctionne et supprime le dossier et son contenu
1. Le bouton d'ouverture de dossier fonctionne et ouvre le dossier
1. Le contenu du dossier courant est bien affiché.
1. Le nom du dossier courant est affiché dans le haut du navigateur de fichiers
1. Le bouton de retour fonctionne et retourne au dossier parent
1. Le bouton de retour est désactivé si on est à la racine du dossier

## Lecture de fichiers
44. Les fichiers textes sont affichés dans le navigateur de fichiers
1. Les fichiers de code sont affichés avec de la coloration syntaxique appropriée
1. Les fichiers markown sont affichés en tant que HTML
1. Les fichiers PDF :
    1. Sont rendu en tant que PDF
    1. Le zoom fonctionne
    1. Le changement de page fonctionne
