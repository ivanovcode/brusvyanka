#!/usr/bin/env sh

sleep 7
python manage.py makemigrations --settings ilya.docker_settings  thumbnail
python manage.py migrate --settings ilya.docker_settings
python manage.py loaddata --settings ilya.docker_settings data.json
python manage.py runserver --settings ilya.docker_settings 0.0.0.0:8000