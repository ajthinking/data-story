<?php

use Illuminate\Support\Facades\Route;

Route::view('datastory/{story?}', 'data-story::workbench');