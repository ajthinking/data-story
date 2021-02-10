<?php

namespace DataStory\Tests\Browser;

use DataStory\Tests\BrowserTestCase;

class SmokeTest extends BrowserTestCase
{
    public function test_no_smoking()
    {
        \Orchestra\Testbench\Dusk\Options::withoutUI();

        $this->browse(function ($browser) {
            $browser->visit('/datastory')
                // It loads and renders react
                ->assertSee('proof of concept')

                // Add a CreateJSON node
                ->click('#add-node')
                ->type('#node-search', 'CreateJSON')
                ->click('#CreateJSON')
                ->keys('#CreateJSON', '{enter}')

                // Add an Inspector
                ->click('#add-node')
                ->type('#node-search', 'Inspect')
                ->click('#Inspect')
                ->keys('#Inspect', '{enter}')
                ->assertSee('Inspect')

                // Run it
                ->click('#run')
                ->waitFor('.Toastify__toast-body')
                ->assertSee('Successfully ran story!')

                // Go to the inspector tab
                ->click('@inspect')
                ->assertSee('Robin Hood');
        });        
    }
}