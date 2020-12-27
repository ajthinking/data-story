<?php

namespace DataStory\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Story extends Model
{
    use \Sushi\Sushi;

    public function getRows()
    {
        $tests = glob(__DIR__ . '/../../tests/stories/*');
        $real  = glob(config('data-story.stories-dir') . '/*');
        $all = array_merge($tests, $real);

        return collect($all)->map(function($path) {
            return [
                'name' => Str::of(basename($path))
                    ->replace('.story', '')
                    ->replace('.json', '')
                    ->__toString(),
                    
                'path'      => realpath($path),
                'content'   => file_get_contents($path)
            ];
        })->toArray();
    }
}