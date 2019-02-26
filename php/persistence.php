<?php

/*
    name: $queue
    passive: false
    durable: true // the queue will survive server restarts
    exclusive: false // the queue can be accessed in other channels
    auto_delete: false //the queue won't be deleted once the channel is closed.
*/

$channel->queue_declare($queue, false, true, false, false);

/*
    name: $exchange
    type: direct
    passive: false
    durable: true // the exchange will survive server restarts
    auto_delete: false //the exchange won't be deleted once the channel is closed.
*/
$channel->exchange_declare($exchange, AMQPExchangeType::DIRECT, false, true, false);

/*
    AMQPMessage::DELIVERY_MODE_PERSISTENT // message will be writen on disk
*/
$messageBody = implode(' ', array_slice($argv, 1));
$message = new AMQPMessage($messageBody, ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]);


