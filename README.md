### Быстрый старт ###

На локальной машине проброс ключа ssh
```
eval `ssh-agent`
ssh-add
ssh -A ivanov@test.brusvyanka.ru -p 2525
```

На удаленном сервере
```
pip install ansible #установка ansible-playbook
~/.local/bin/ansible-playbook conf.yml -v  #(! all | localhost) при первом запуске
~/.local/bin/ansible-playbook deploy.yml -v  #(! all | localhost) тоже самое что git pull
virtualenv .env #развертывание окружения
```

Дополнительные команды
```
sudo chown -R www-data ./brusvyanka #фикс с правами на случай
source .env/bin/activate #хз нужно выполнить
sudo python manage.py thumbnail clear #работа с кэшем

service uwsgi restart #рестарт после любых изменений

```


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