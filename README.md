Will update later..

# Testing
* Unit test: `bin/phpunit`
* Functional tests (controllers): `bin/phpunit tests/Controller`
* All tests: `bin/phpunit tests`

# Private and Public keys
For simplicity private and public keys are added to repository. To generate new:
> `openssl genrsa -out config/jwt/private.pem -aes256 4096`
>
> `openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem`
>
> Update `JWT_PASSPHRASE` in `.env` file.