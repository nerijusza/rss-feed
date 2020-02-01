<?php
declare(strict_types=1);

namespace App\Test\Controller;

use App\DataFixtures\AppFixtures;
use App\Tests\Controller\XmlHttpRequestTrait;
use Liip\TestFixturesBundle\Test\FixturesTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class FrequentWordsControllerTest extends WebTestCase
{
    use FixturesTrait;
    use XmlHttpRequestTrait;

    public function setUp()
    {
        parent::setUp();
        $this->loadFixtures([AppFixtures::class]);
    }

    function testEndpointWithoutTokenShouldNotBeAvailable(): void
    {
        $client = self::createClient();
        $this->makeRequestWithoutToken($client,'GET', '/api/frequentWords');
        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }

    function testFrequentWordsEndpoint(): void
    {
        $client = self::createClient();

        $this->makeRequestWithToken($client,'GET', '/api/frequentWords');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $response = \json_decode($client->getResponse()->getContent(), true);

        $this->assertTrue(\array_key_exists('items', $response));
        $this->assertEquals(10, \count($response['items']));

        $excludedWords = $client->getContainer()->getParameter('excluded.words');
        $frequentWords = array_map(
            function (array $item): string {
                return $item['word'];
            },
            $response['items']
        );

        $this->assertEquals([], array_intersect($excludedWords, $frequentWords));
    }
}
