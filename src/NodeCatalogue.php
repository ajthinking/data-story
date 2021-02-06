<?php

namespace DataStory;

use Illuminate\Support\Str;

class NodeCatalogue
{
    public static function make()
    {
        return new static;
    }

    public function toArray() : array
    {
        $registered = config('data-story.nodes');

        $discovered = $this->discover();

        $all = collect($registered)->concat($discovered)->unique();

        return $all->map(function ($class) {
            return $class::factory($class)->variations();;
        })->flatten(1)->toArray();
    }

    public function discover() : array
    {
        if (!config('data-story.custom-nodes-scan-dir')) return [];

        $dirToScan = config('data-story.custom-nodes-dir');

        $files = glob(base_path($dirToScan . '/*.php'));

        return collect($files)->map(function ($path) {
            $path = Str::replaceFirst(base_path(), '', $path);
            $path = Str::replaceLast('.php', '', $path);

            $class = Str::of($path)->explode('/')->filter()->map(function ($part) {
                return Str::studly($part);
            })->join('\\');

            return $class;
        })->values()->toArray();
    }
}