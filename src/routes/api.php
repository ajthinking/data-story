<?php

use Illuminate\Support\Facades\Route;

Route::post('datastory/api/boot', \DataStory\Controllers\Boot::class);
Route::post('datastory/api/run', \DataStory\Controllers\Run::class);
Route::post('datastory/api/save', \DataStory\Controllers\Save::class);