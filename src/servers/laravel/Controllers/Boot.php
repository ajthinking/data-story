<?php

namespace DataStory\Controllers;

use DataStory\Diagram;
use DataStory\Models\Story;

class Boot
{
    public function __invoke()
    {
        return [
            'stories'         => Story::all(),
            'capabilities'    => Diagram::capabilities(),
            'serializedModel' => $this->getSerializedModel(),
        ];        
    }

    protected function getSerializedModel()
    {
        $requestedStory = request()->input('story');

        if(!$requestedStory) return;

        return Story::where(
            'path',
            'like',
            "%$requestedStory.story.json"
        )->first()->content;
    }
}