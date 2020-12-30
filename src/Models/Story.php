<?php

namespace DataStory\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Story extends Model
{
    use \Sushi\Sushi;
    use SoftDeletes;

    /**
     * Hack to avoid migrations
     */
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

                'path'          => realpath($path),
                'content'       => file_get_contents($path),
                'deleted_at'    => null,
            ];
        })->push([
            // DUMMY TO FOOL SUSHI IN CASE OF EMPTY TABLE
            'name'       => 'dummy',
            'path'       => 'dummy',
            'content'    => 'dummy',
            'deleted_at' => 'dummy',
            
        ])->toArray();
    }
}