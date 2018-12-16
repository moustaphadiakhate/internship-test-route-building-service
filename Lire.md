# sunubus

### Configuration avec Docker

Creer vous propres instances de MySQL et Redis

#### Build `sunubusDevTest` :

    docker build -t sunubusDevTest .

#### Lancer l'image :

    docker run -p 80:3000 --name sunubusDevTest sunubusDevTest


### Configuration avec Docker-Compose

  1. Accès au container `mysql` 
      * (Windows) `docker-compose exec mysql <CMD>`

  2. Entrer dans le container  `mysql` 
      * `mysql -u root -p`

  3. Authentifier avec le  `DB_PASS` dans le fivhier `.env` 

  4. Vou serez en mesure de l'utuliser si vous voyez `mysql>` dans le container.

  5. Copier tout dans `app/database/sunubus.sql`

  6. Coller tout et apuyer sur Entrer

  7. Copier tout dans  `app/database/sunubus.sql`

  8. Coller tout et apuyer sur Entrer

  9. Maintemant verifier en tapant les commandes suvantes `show databases; use sunuus; show tables;` tapez Entrer.

  10. la sortie devrait ressembler comme ça:
      ```
      mysql> show databases; use sunubus; show tables;
      +--------------------+
      | Database           |
      +--------------------+
      | information_schema |
      | sunubus            |
      | mysql              |
      | performance_schema |
      | sys                |
      +--------------------+
      5 rows in set (0.02 sec)

      Database changed
      +----------------------+
      | Tables_sunubus    |
      +----------------------+
      | hero                 |
      | bus                  |
      +----------------------+
      2 rows in set (0.00 sec)
      ```

##### Database Configurations
1. Dans le fichier `.env` mettre les infos:
    * `DB_USER` are your TON_USERNAME.
    * `DB_PASS` are your TON_PASSWORD.
    * `DB_NAME` devrait être  `sunubus`.
    * `DB_HOST` devrait être  `locahost`.


---

##### Redis Configurations
1. Accès au container `Redis` 
`docker-compose run redis redis-cli -h redis`

2. Dans le fichier `.env` mettre les infos:
    * `REDIS_URL`  devrait être  ADRESS_COMPLET.
    * `REDIS_PASS` devrait être  TON_PASSWORD.
    * `REDIS_USER` devrait être  `sunubus`.

---

##### Dernière Etape
1. `cd /app`
2. `npm install`
3. `npm start`
4. Aller dans `localhost:3000` avec votre navigateur
    * Normamalemt vos verez ceci dans le log du console server:
    ```
    REUISSIT : Le server des heros de sunubus au port 3000
    DATABASE REUISSIT : App connecté a la database sunubus dev test !
    REDIS REUISSIT : Client connecté à Redis

    ```
