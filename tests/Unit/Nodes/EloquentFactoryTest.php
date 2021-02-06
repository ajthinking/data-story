<?php

use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use DataStory\Diagram;
use DataStory\Nodes\EloquentFactory;
use DataStory\Nodes\EloquentQuery;
use DataStory\Nodes\Pass;
use DataStory\Tests\TestCase;


class EloquentFactoryTest extends TestCase
{
    public function test_it_will_return_an_eloquent_collection()
    {
        Diagram::test()
            ->node(EloquentFactory::class, [
                // Factory, Catalouge and Node implementations are tied up in a weird way
                // The model can also be sent in a parameter and should not be needed here
                'model' => \App\Models\User::class,
            ])
            ->input([
                ['name' => 'ajthinking'],
                ['name' => 'brainmaniac'],
            ])
            ->assertOutputCount(2);
    }
}