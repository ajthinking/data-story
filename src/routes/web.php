<?php

use DataStory\Diagram;
use DataStory\Models\Story;
use Illuminate\Support\Facades\Route;

Route::view('datastory/{story?}', 'data-story::workbench');

Route::get('cool', function() {
    $diagram = Diagram::deserialize(
        Story::where(
            'path', 'like', '%r2v.story.json'
        )->first()->content        
    );

    return $diagram->registerGlobal()
        ->run()
        ->getResult();
});