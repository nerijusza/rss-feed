<?php
declare(strict_types=1);

namespace App\Tests\Controller;

use App\DataFixtures\AppFixtures;
use App\Repository\UserRepository;
use Liip\TestFixturesBundle\Test\FixturesTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class AuthControllerTest extends WebTestCase
{
    use FixturesTrait;
    use XmlHttpRequestTrait;

    private UserRepository $userRepository;

    public function setUp()
    {
        parent::setUp();
        $this->loadFixtures([AppFixtures::class]);
        $this->userRepository = $this->getContainer()->get(UserRepository::class);
    }

    /**
     * @dataProvider dataProvider
     */
    public function testUserRegistration(string $content, bool $userShouldBeCreated): void
    {
        $client = self::createClient();

        $usersInRepoBefore = \count($this->userRepository->findAll());
        $client->xmlHttpRequest('POST', '/auth/register', [], [], [], $content);
        $usersInRepoAfter = \count($this->userRepository->findAll());

        if ($userShouldBeCreated) {
            $this->assertEquals(200, $client->getResponse()->getStatusCode());
            $this->assertEquals($usersInRepoBefore + 1, $usersInRepoAfter, 'Users in repo should increase by one');
        } else {
            $this->assertNotEquals(200, $client->getResponse()->getStatusCode());
            $this->assertEquals($usersInRepoBefore, $usersInRepoAfter, 'Users in repo should not change');
        }
    }

    public function dataProvider(): array
    {
        return [
            '#NoPayload'        => ['', false],
            '#WrongEmail'       => ['{"email":"wrong@email","password":"123456"}', false],
            '#TooShortPassword' => ['{"email":"first@email.com","password":"12"}', false],
            '#GoodCase'         => ['{"email":"first@email.com","password":"123456"}', true],
            '#SecondGoodCase'   => ['{"email":"second@email.com","password":"123456"}', true],
        ];
    }
}
