<?php

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$data = implode(' ', array_slice($argv, 1));
if (empty($data)) {
    $data = "User signed up < foo@example.org >";
}
$msg = new AMQPMessage($data);

$channel->exchange_declare('signup', 'fanout', false, false, false);

$channel->basic_publish($msg, 'signup');

echo ' [x] Sent ', $data, "\n";

$channel->close();
$connection->close();


