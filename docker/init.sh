#!/bin/bash

migrateDatabase() {
  bin/console doctrine:migrations:migrate
  return $? == 0;
}

echo "Setting up Symfony.."

echo "Installing API(Symfony) composer dependencies.."
cd /usr/src/app
composer install

echo "Setting up database.."
while ! migrateDatabase
do
   echo "Database migration failed. Most likely that mysql is not ready yet, retrying in 3 seconds.."
   sleep 3
done

echo "Loading dummy (unit test) data.."
bin/console doctrine:fixtures:load

echo "========================"
echo "Symfony setup finished!"
echo "========================"