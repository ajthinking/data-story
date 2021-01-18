<?php

use Illuminate\Support\Facades\Route;

Route::view('datastory/{story?}', 'data-story::workbench');
Route::get('/datastory/routes/{story}', \DataStory\Controllers\Reduce::class);