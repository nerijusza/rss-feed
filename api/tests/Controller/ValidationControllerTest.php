<?php
declare(strict_types=1);

namespace App\Test\Controller;

use App\DataFixtures\AppFixtures;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ValidationControllerTest extends WebTestCase
{
    /**
     * @dataProvider dataProvider
     */
    function testFrequentWordsEndpoint(string $email, bool $valid): void
    {
        $client = self::createClient();
        $client->xmlHttpRequest('GET', '/validate/email/' . $email, [], [], []);

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $response = \json_decode($client->getResponse()->getContent(), true);

        $this->assertTrue(\array_key_exists('valid', $response));
        $this->assertEquals($valid, $response['valid']);
    }

    public function dataProvider(): array
    {
        return [
            '#valid'         => ['real.valid@email.com', true],
            '#Notvalid1'     => ['wrong@email', false],
            '#Notvalid2'     => ['3245', false],
            '#ExistingEmail' => [AppFixtures::EXISTING_USER_EMAIL, false],
        ];
    }
}
