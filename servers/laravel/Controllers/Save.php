<?php

namespace DataStory\Controllers;

use DataStory\Support\SimpleFile;

class Save
{
    public function __invoke()
    {
        $filename = request()->input('filename');
        $content = request()->input('model');
    
        SimpleFile::put(
            config('data-story.stories-dir') . '/' . $filename . '.story.json',
            $content
        );    
    }
}