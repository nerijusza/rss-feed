#!/bin/bash

echo "--------------------------------------------------";
echo " Starting API (Symfony) tests";
echo "--------------------------------------------------";

CURRENT_UID=$(id -u):$(id -g) docker-compose exec php bin/phpunit tests

echo "--------------------------------------------------";
echo " Starting Front (React) Cypress tests";
echo "--------------------------------------------------";

docker run -it -v $PWD/front:/e2e -w /e2e cypress/included:4.0.0 --config baseUrl=http://host.docker.internal:3000

echo "--------------------------------------------------";
echo " Test finished!";
echo "--------------------------------------------------";