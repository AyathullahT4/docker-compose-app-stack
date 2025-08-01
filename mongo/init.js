db = db.getSiblingDB('appdb');

db.createUser({
  user: 'appuser',
  pwd: 'apppass',
  roles: [{ role: 'readWrite', db: 'appdb' }]
});

db.createCollection('messages');

db.messages.insertMany([
  { text: 'Hello from MongoDB!' },
  { text: 'Connected to Docker Compose stack.' }
]);

