<?php

namespace DataStory\Tests\Unit;

use DataStory\Tests\TestCase;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class FakeModelTest extends TestCase
{
    public function test_basic_execution()
    {
        $this->assertInstanceOf(
            Collection::class,
            User::all()
        );
    }
}