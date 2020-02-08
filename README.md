# Application
Simple RSS reader web application with following views:
1) User registration - form with e-mail and password fields + e-mail verification using ajax.
* Existence of already registered e-mail should be checked “on the fly” via ajax call when writing e-mail
address and before submitting form.
2) Login form with e-mail address and password.
3) RSS feed view (Feed source: https://www.theregister.co.uk/software/headlines.atom).
* After successful login in top section display 10 most frequent words with their respective counts in
the whole feed excluding top 50 English common words (taken from here
https://en.wikipedia.org/wiki/Most_common_words_in_English)
* Underneath create list of feed items.
# How to run the app
**Requirements**
* [Docker >= 19.0.x](https://docs.docker.com/install/)
* [Docker-compose >= 1.21.x](https://docs.docker.com/compose/install/)

**Run the app**
* Run command to setup and launch app `CURRENT_UID=$(id -u):$(id -g) docker-compose up --build`
* Wait for applications to load. Can take a while to download npm dependencies (not properly displayed in logs)
* Open url: http://127.0.0.1:3000/
# Implementation notes
* Fully dockerized environment
* Frontend implemented as SPA using React
* API implemented in PHP with Symfony 5.0
* Auth implemented using [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token)
# Possible future improvements
* Add tests (Symfony tested) to React application
* Add global Exception handler in Symfony to return friendly JSON response
# API (Symfony)
## Testing
* Unit test: `docker-compose exec php bin/phpunit`
* Functional tests (controllers): `docker-compose exec php bin/phpunit tests/Controller`
* All tests: `docker-compose exec php bin/phpunit tests`

## Private and Public keys
For simplicity private and public keys (for generating GWT token) are added to repository. To generate new:
* `openssl genrsa -out config/jwt/private.pem -aes256 4096`
* `openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem`
* Update `JWT_PASSPHRASE` in `.env` file.