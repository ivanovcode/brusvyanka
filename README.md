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