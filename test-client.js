#!/usr/bin/env node
const io = require('socket.io-client');

function createTestClient(clientName, existingGuestId = null) {
  const socket = io('http://localhost:3000');
  
  socket.on('connect', () => {
    console.log(`${clientName}: Connected to server`);
    socket.emit('join', { guestId: existingGuestId });
  });

  socket.on('welcome', (data) => {
    console.log(`${clientName}: Welcome received - Guest ID: ${data.guestId}`);
    console.log(`${clientName}: Starting resources:`, JSON.stringify(data.state.resources, null, 2));
  });

  socket.on('stateUpdate', (data) => {
    console.log(`${clientName}: State update - AP: ${data.actionPoints?.current}/${data.actionPoints?.max}`);
  });

  socket.on('actionResult', (data) => {
    console.log(`${clientName}: Action result:`, data);
  });

  socket.on('worldEvent', (data) => {
    console.log(`${clientName}: World event:`, data.message);
  });

  socket.on('disconnect', () => {
    console.log(`${clientName}: Disconnected`);
  });

  // Test some actions after connecting
  setTimeout(() => {
    console.log(`${clientName}: Sending explore action`);
    socket.emit('action', { type: 'explore' });
  }, 2000);

  setTimeout(() => {
    console.log(`${clientName}: Sending develop action`);
    socket.emit('action', { type: 'develop', data: { resourceType: 'food' } });
  }, 4000);

  return socket;
}

// Create multiple test clients
console.log('Starting multiplayer test...');

const client1 = createTestClient('Client1');
const client2 = createTestClient('Client2');
const client3 = createTestClient('Client3');

// Keep the test running for 30 seconds
setTimeout(() => {
  console.log('Test complete, disconnecting clients...');
  client1.disconnect();
  client2.disconnect();
  client3.disconnect();
  process.exit(0);
}, 30000);