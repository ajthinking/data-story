<?php

namespace DataStory\Support;

use Illuminate\Filesystem\Filesystem;

class SimpleFile
{
    public static function put($path, $contents)
    {
        $fs = new FileSystem;

        if (! $fs->isDirectory(dirname($path))) {
            $fs->makeDirectory(dirname($path), 0777, true, true);
        }

        $fs->put($path, $contents);
    }
}