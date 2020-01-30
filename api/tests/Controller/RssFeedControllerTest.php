<?php
declare(strict_types=1);

namespace App\Test\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RssFeedControllerTest extends WebTestCase
{
    function testFrequentWordsEndpoint(): void
    {
        $client = self::createClient();

        $client->xmlHttpRequest('GET', '/api/rss');

        $this->assertEquals(200, $client->getResponse()->getStatusCode());

        $response = \json_decode($client->getResponse()->getContent(), true);

        $this->assertTrue(!empty($response['feed']['entry']));
    }
}
