<?php

namespace DataStory\Controllers;

use DataStory\Diagram;

class Run
{
    public function __invoke()
    {
        $diagram = Diagram::hydrate(
            request()->input('model')
        );
        
        $diagram->registerGlobal()->run();

        return [
            'diagram' => $diagram
        ];      
    }
}