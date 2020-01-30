<?php
declare(strict_types=1);

namespace App\Test\Service\FrequentWords;

use App\Service\FrequentWords\FrequentWord;
use App\Service\FrequentWords\FrequentWordsCalculator;
use PHPUnit\Framework\TestCase;

class FrequentWordsCalculatorTest extends TestCase
{
    /**
     * @param string[] $excludedWords
     * @param FrequentWord[] $expectedResponse
     * @dataProvider dataProvider
     */
    public function testFrequentWordCalculator(
        array $excludedWords,
        string $text,
        int $numberOfWords,
        array $expectedResponse
    ): void {
        $this->assertEquals(
            $expectedResponse,
            (new FrequentWordsCalculator($excludedWords))->calculate($text, $numberOfWords)
        );
    }

    public function dataProvider(): array
    {
        $excludedWords = ['the', 'who', 'it'];
        $text = 'There was a MAN, who WHO did DID.==. 65 .DiD   something bad bad  really bad BAd baddu bad';
        $textWithTags = <<<TEXT
            <p>Some text with tags</p>
            some good news always good
            <li>first</li>
            <li>second</li>
            <li>third</li>
TEXT;

        return [
            '#1' => [[], '', 3, []],
            '#2' => [$excludedWords, '', 3, []],
            '#3' => [
                $excludedWords,
                $text,
                3,
                [
                    new FrequentWord('bad', 5),
                    new FrequentWord('did', 3),
                    new FrequentWord('there', 1),
                ]
            ],
            '#4' => [
                ['the', 'it'],
                $text,
                3,
                [
                    new FrequentWord('bad', 5),
                    new FrequentWord('did', 3),
                    new FrequentWord('who', 2),
                ]
            ],
            '#5' => [
                ['Some'],
                $textWithTags,
                2,
                [
                    new FrequentWord('good', 2),
                    new FrequentWord('text', 1),
                ]
            ],
        ];
    }
}