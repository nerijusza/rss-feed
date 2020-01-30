<?php
declare(strict_types=1);

namespace App\Test\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class FrequentWordsControllerTest extends WebTestCase
{
    function testFrequentWordsEndpoint(): void
    {
        $client = self::createClient();

        $client->xmlHttpRequest('GET', '/api/frequentWords');

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
