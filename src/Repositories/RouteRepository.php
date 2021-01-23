<?php

namespace DataStory\Repositories;

use DataStory\Diagram;
use DataStory\Models\Story;
use Illuminate\Contracts\Container\BindingResolutionException;
use Throwable;
use Illuminate\Support\Str;

class RouteRepository
{
    public $storyMap = [];

    public static function all()
    {
        return Story::valid()->map(function(Story $story) {
            // A Story Diagram can publish many Route stubs
            $stubs = $story->diagram()->publishes();
            
            // Append the story name to the route to use as a key
            return $stubs->map(function($stub) use($story) {
                $stub->story = $story->name;
                return $stub;
            });
        })->flatten();
    }

    public function register(string $uri, string $storyName)
    {
        $this->storyMap[$uri] = $storyName;   
    }

    public function storyAtUri($uri)
    {
        return $this->storyMap[$uri];
    }
}