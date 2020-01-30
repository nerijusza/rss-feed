<?php
declare(strict_types=1);

namespace App\Service\FrequentWords;

class FrequentWord
{
    private string $word;
    private int $count;

    public function __construct(string $word, int $count)
    {
        $this->word = $word;
        $this->count = $count;
    }

    public function getWord(): string
    {
        return $this->word;
    }

    public function getCount(): int
    {
        return $this->count;
    }
}
