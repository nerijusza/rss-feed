#!/bin/bash

echo "Setting up Symfony.."

echo "Installing API(Symfony) composer dependencies.."
cd /usr/src/app && composer install

echo "Setting up database.."
cd /usr/src/app && bin/console doctrine:migrations:migrate

echo "Loading dummy (unit test) data.."
cd /usr/src/app && bin/console doctrine:fixtures:load

echo "========================"
echo "Project setup finished!"
echo "========================"