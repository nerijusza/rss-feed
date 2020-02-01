<?php
declare(strict_types=1);

namespace App\Tests\Controller;

use App\DataFixtures\AppFixtures;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;

trait XmlHttpRequestTrait
{
    private function getToken(KernelBrowser $client): string
    {
        static $token;

        if (!$token) {
            $credentials = \json_encode(
                [
                    'username' => AppFixtures::EXISTING_USER_EMAIL,
                    'password' => AppFixtures::EXISTING_USER_PASSWORD,
                    ],
                1
            );

            $this->makeRequestWithoutToken($client, 'POST', '/auth/login', $credentials);

            $token = json_decode($client->getResponse()->getContent(), true)['token'];
        }

        return $token;
    }

    protected function makeRequestWithToken(
        KernelBrowser $client,
        string $method,
        string $url,
        string $content = null
    ): void
    {
        $headers = [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $this->getToken($client),
        ];
        $client->xmlHttpRequest($method, $url, [], [], $headers, $content);
    }

    protected function makeRequestWithoutToken(
        KernelBrowser $client,
        string $method,
        string $url,
        string $content = null
    ): void
    {
        $client->xmlHttpRequest($method, $url, [], [], ['CONTENT_TYPE' => 'application/json',], $content);
    }
}
