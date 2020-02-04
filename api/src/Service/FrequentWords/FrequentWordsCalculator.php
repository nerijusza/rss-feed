<?php
declare(strict_types=1);

namespace App\Service\FrequentWords;

class FrequentWordsCalculator
{
    /**
     * @var string[]
     */
    private array $excludedWords;

    /**
     * @param string[] $excludedWords
     */
    public function __construct(array $excludedWords)
    {
        $this->excludedWords = array_map(
            function (string $word) {
                return strtolower($word);
            },
            $excludedWords
        );

        $this->excludedWords[] = 's'; // for words like "Oracle's"
    }

    /**
     * @return FrequentWord[]
     */
    public function calculate(string $text, int $numberOfWords): array
    {
        $counter = [];
        foreach ($this->getWords($text) as $word) {
            if (\in_array($word, $this->excludedWords, true)) {
                continue;
            }

            $counter[$word] = ($counter[$word] ?? 0) + 1;
        }

        arsort($counter, SORT_ASC);
        $counter = array_slice($counter, 0, $numberOfWords);

        return array_map(
            function (string $word, int $count) {
                return new FrequentWord($word, $count);
            },
            array_keys($counter),
            array_values($counter)
        );
    }

    private function getWords(string $text): array
    {
        $text = $this->cleanUp($text);

        return $text ? explode(' ', $text) : [];
    }

    private function cleanUp(string $text): string
    {
        $text = strip_tags(strtolower($text));
        $text = preg_replace('/n\'t/', ' not', $text);
        $text = preg_replace('/[^a-z]/', ' ', $text);
        $text = preg_replace('/\s{2,}/', ' ', $text);

        return trim($text);
    }
}
