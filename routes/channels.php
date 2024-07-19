<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('channel-for-everyone', function ($user) {
    return true;
});
