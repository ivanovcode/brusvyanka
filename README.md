### Быстрый старт ###

На локальном 
eval `ssh-agent`
ssh-add
ssh -A ivanov@test.brusvyanka.ru -p 2525

На удаленном
pip install ansible
~/.local/bin/ansible-playbook conf.yml -v  (all | localhost)
~/.local/bin/ansible-playbook deploy.yml -v  (all | localhost)

Дополнительные команды
sudo chown -R www-data ./brusvyanka
source .env/bin/activate | sudo python manage.py thumbnail clear | sudo rm -rf ./media/cache/* | sudo rm -rf ./media2/cache/*
service uwsgi restart
virtualenv .env



### Тестовая среда на докере ###

 * установите docker http://docker.com
 * скачайте media https://yadi.sk/d/7WYDOQT0uaQJ6


```
pip install docker-compose
tar xjvf media_test.tar.bz2
docker-compose up
```


### устанавливаем зависимости: ###

```
#!bash
pip install --upgrade -r requirements.txt

```

### создаем базу: ###

```
#!bash
python manage.py migrate

```

### запускаем тестовый сервер: ###

```
#!bash
python manage.py runserver

```

### создать локального админа: ###

```
#!bash
python manage.py createsuperuser

```


### Деплой ###

```
#!bash

fab develop deploy
```

### Синхронизация с продакшеном без STATIC папки ###
```
rsync -avzh --exclude 'static' root@ilyaeliseev.ru:/home/ilyaeliseev/src/  ./
```