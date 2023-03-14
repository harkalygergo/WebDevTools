<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Note
{
    public function __construct()
    {
        // do nothing
    }

    public function init()
    {

    }
}

// run and timing
$start = microtime(true);
(new Note())->init();
$end = microtime(true);
$time = number_format(($end - $start), 2);
