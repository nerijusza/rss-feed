<?php
declare(strict_types=1);

namespace App\Controller;

use GuzzleHttp\ClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class RssFeedController extends AbstractController
{
    /**
     * @Route("/api/rss")
     */
    public function rss(ClientInterface $client, ParameterBagInterface $parameterBag)
    {
        return new JsonResponse(
            [
                'feed' => simplexml_load_string(
                    $client->request('GET', $parameterBag->get('rss.feed.url'))->getBody()->getContents()
                )
            ]
        );
    }
}
