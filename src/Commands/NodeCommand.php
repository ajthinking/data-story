<?php

namespace DataStory\Commands;

use DataStory\Support\SimpleFile;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class NodeCommand extends Command
{
    protected $signature = 'story:node {name}';

    protected $description = 'Create a new node';

    public function handle()
    {
        $path = config('data-story.custom-nodes-dir') . '/' . $this->argument('name') . '.php';

        $contents = Str::of(
            file_get_contents(__DIR__ . '/../stubs/node.php')
        )->replaceFirst(
            'NodeName',
            $this->argument('name')
        );

        SimpleFile::put($path, $contents);

        $this->info('Successfully created node ' . $this->argument('name'));

        return 0;
    }  
}
