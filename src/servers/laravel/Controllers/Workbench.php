<?php

namespace DataStory\Controllers;

class Workbench
{
    public function __invoke()
    {
        return view('data-story::workbench')->with([
            'story'  => request()->input('story') ?? null,
            'client' => request()->input('client') ?? 'APIClient',
        ]);
    }
}