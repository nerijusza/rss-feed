<?php
declare(strict_types=1);

namespace App\Controller;

use App\Service\FrequentWords\FrequentWord;
use App\Service\FrequentWords\FrequentWordsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FrequentWordsController extends AbstractController
{
    /**
     * @Route("/api/frequentWords", methods={"GET"})
     */
    public function frequentWords(FrequentWordsService $frequentWordsService, ParameterBagInterface $parameterBag)
    {
        $frequentWords = $frequentWordsService->getFrequentWords($parameterBag->get('rss.feed.url'), 10);

        $response = [
            'items' => array_map(
                function (FrequentWord $frequentWord): array
                {
                    return ['word' => $frequentWord->getWord(), 'count' => $frequentWord->getCount()];
                },
                $frequentWords
            )
        ];

        return new JsonResponse($response);
    }
}
