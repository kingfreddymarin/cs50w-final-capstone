# FINAL PROJECT

## THE BACKEND:

#### Developed in Django, using SQLite as a database, Django Rest Framework for API's management, Knox for security for the users and Django Cors Headers to be able to access the API from a different server (localhost:3000 <- frontend's server). 

To properly run the API, you need to install the following pip packages:
- py -m pip install Django
- py -m pip install djangorestframework
- py -m pip install django-rest-knox
- py -m pip install django-cors-headers

### To run the API, run the next command from the root directory of this repo:

- py manage.py runserver

## THE FRONTEND:

#### Developed with React for the UI and Nodejs for the libraries and packages.
To properly run the frontend environment, you'll first need to install [Node](https://nodejs.org/en/download/) in your device. Then navigate with youtr favorite terminal to the 'frontend' folder in the root of this project.

Once in the 'frontend' folder, run the following commands to install the libraries and packages:

- npm i (installs every dependency listed in the package.json file needed to run the frontend)

### To run the front-end, run the next command from the 'frontend' directory of this repo:

- npm start
