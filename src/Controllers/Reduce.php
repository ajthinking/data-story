<?php

namespace DataStory\Controllers;

use DataStory\Diagram;
use DataStory\Models\Story;

/**
 * To 'reduce' a diagram means we run it and return a sole resulting value
 */
class Reduce
{
    public function __invoke($story)
    {
        $diagram = Diagram::deserialize(
            Story::where('name', $story)->first()->content
        );

        return $diagram->registerGlobal()->run()->getResult();
    }
}