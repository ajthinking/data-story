<?php

namespace DataStory\Tests\Unit;

use DataStory\NodeCatalogue;
use DataStory\Tests\TestCase;

class NodeCatalogueTest extends TestCase
{
    public function test_catalogue_to_array()
    {
        $catalogue = NodeCatalogue::make()->toArray();

        $this->assertIsArray($catalogue);
    }
}