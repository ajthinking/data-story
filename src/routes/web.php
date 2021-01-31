<?php

namespace DataStory\Controllers;

use Illuminate\Support\Facades\Route;

Route::view('datastory/{story?}', 'data-story::workbench');
Route::get('/datastory/routes/{story}', Reduce::class);