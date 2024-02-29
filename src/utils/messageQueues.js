const amqplib = require("amqplib");
// const { application } = require("express");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");
const createChannel = async () => {
  try {
    const connection = await amqplib.connect(MESSAGE_BROKER_URL);
    // create connection with MESSAGE_BROKER (RabbitMQ)
    // This MESSAGE_BROKER maintains multiple Queues

    const channel = await connection.createChannel();
    // create Channel object in order to connect with queues

    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    // This MESSAGE_BROKER helps us to ditributes messages to different queues
    return channel;
  } catch (error) {
    throw error;
  }
};

// deque operation
const subscribeMessage = async (channel, service, binding_key) => {
  try {
    const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");
    // check wheather channel is  created or not
    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("received data");
      console.log(msg.content.toString());
      const payload = JSON.parse(msg.content.toString());
      // console.log(service);
      service.subscribeEvents(payload);
      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
};

// enque operation
const pulishMessage = async (channel, binding_key, message) => {
  try {
    await channel.assertQueue("REMINDER_QUEUE");
    await channel.piblish(EXCHANGE_NAME, binding_key, Buffer.from(message));
  } catch (error) {
    throw error;
  }
};

// EXCHANGE_NAME => Distributer Name
// binding_key => defines what queue we have to tranfer the message
// message => content to send
// Buffer.from(message) => wrap the inside the buffer

module.exports = { createChannel, subscribeMessage, pulishMessage };
