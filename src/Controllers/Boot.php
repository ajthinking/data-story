<?php

namespace DataStory\Controllers;

use DataStory\Diagram;
use DataStory\Models\Story;

class Boot
{
    public function __invoke()
    {
        return [
            'status'                => 200,
            'stories'               => Story::all(),
            'capabilities' => Diagram::capabilities(),
            'serializedModel'       => request()->input('story') ? Story::where(
                'path', 'like', '%' . request()->input('story') . '.story.json'
            )->first()->content : null,
        ];        
    }
}