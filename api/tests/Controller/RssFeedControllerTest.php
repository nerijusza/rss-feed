<?php
declare(strict_types=1);

namespace App\Test\Controller;

use App\DataFixtures\AppFixtures;
use App\Tests\Controller\XmlHttpRequestTrait;
use Liip\TestFixturesBundle\Test\FixturesTrait;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RssFeedControllerTest extends WebTestCase
{
    use FixturesTrait;
    use XmlHttpRequestTrait;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadFixtures([AppFixtures::class]);
    }

    function testEndpointWithoutTokenShouldNotBeAvailable(): void
    {
        $client = self::createClient();
        $this->makeRequestWithoutToken($client,'GET', '/api/rss');
        $this->assertEquals(401, $client->getResponse()->getStatusCode());
    }

    function testFrequentWordsEndpoint(): void
    {
        $client = self::createClient();

        $this->makeRequestWithToken($client,'GET', '/api/rss');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $response = \json_decode($client->getResponse()->getContent(), true);

        $this->assertTrue(!empty($response['feed']['entry']));
    }
}
