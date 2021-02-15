<?php

namespace DataStory\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/datastory/{story?}', Workbench::class);
Route::get('/datastory/routes/{story}', Reduce::class);