<?php
declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    public const EXISTING_USER_EMAIL = 'unit@test.com';
    public const EXISTING_USER_PASSWORD = '123456';

    private UserPasswordEncoderInterface $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User(self::EXISTING_USER_EMAIL);
        $user->setPassword($this->userPasswordEncoder->encodePassword($user, self::EXISTING_USER_PASSWORD));

        $manager->persist($user);
        $manager->flush();
    }
}
