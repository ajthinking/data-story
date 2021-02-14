<?php

namespace DataStory\Tests\Feature;

use DataStory\Tests\TestCase;

class FakeModelTest extends TestCase
{
    public function test_fake_models_can_be_used_in_tests()
    {
        $fakeUser = \App\Models\User::class;

        $this->assertInstanceOf(
            \Illuminate\Database\Eloquent\Builder::class,
            $fakeUser::query()
        );
    }
}