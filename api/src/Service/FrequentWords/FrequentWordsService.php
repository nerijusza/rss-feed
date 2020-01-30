<?php
declare(strict_types=1);

namespace App\Service\FrequentWords;

interface FrequentWordsService
{
    /**
     * @return FrequentWord[]
     */
    function getFrequentWords(string $feedUrl, int $numberOfWords): array;
}
