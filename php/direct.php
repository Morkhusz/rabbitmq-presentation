<?php

require_once __DIR__ . '/vendor/autoload.php';

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPStreamConnection('localhost', 5672, 'guest', 'guest');
$channel = $connection->channel();

$type = $argv[2];
if (empty($type)) {
  $type = "info";
}
$data = $argv[1];
if (empty($data)) {
    $data = "User signed up <foo@example.org>";
}
$msg = new AMQPMessage($data);

$channel->exchange_declare('logs', 'direct', false, false, false);

$channel->basic_publish($msg, 'logs', $type);

echo ' [x] Sent ', $type, ' log ', $data, "\n";

$channel->close();
$connection->close();


