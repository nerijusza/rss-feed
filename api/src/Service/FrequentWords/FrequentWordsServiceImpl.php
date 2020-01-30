<?php
declare(strict_types=1);

namespace App\Service\FrequentWords;

use FeedIo\Feed\Item;
use FeedIo\FeedIo;

class FrequentWordsServiceImpl implements FrequentWordsService
{
    private FrequentWordsCalculator $frequentWordsCalculator;
    private FeedIo $feedIo;

    public function __construct(FrequentWordsCalculator $frequentWordsCalculator, FeedIo $feedIo)
    {
        $this->frequentWordsCalculator = $frequentWordsCalculator;
        $this->feedIo = $feedIo;
    }

    /**
     * @return FrequentWord[]
     */
    function getFrequentWords(string $feedUrl, int $numberOfWords): array
    {
        return $this->frequentWordsCalculator->calculate(
            implode(
                ' ',
                array_map(
                    function (Item $item): string
                    {
                        return $item->getTitle() . ' ' . $item->getDescription();
                    },
                    iterator_to_array($this->feedIo->read($feedUrl)->getFeed())
                )
            ),
            $numberOfWords
        );
    }
}
