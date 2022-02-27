const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/keys.env' });

// Load Model
const Conversation = require('./models/Conversation');
const GlobalMessage = require('./models/GlobalMessage');
const Message = require('./models/Message');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Read JSON
const conversations = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/conversations.json`, `utf-8`)
);
const gMessages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/globalMessages.json`, `utf-8`)
);
const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/messages.json`, `utf-8`)
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, `utf-8`)
);

// Import into DB
const importData = async () => {
  try {
    await Conversation.create(conversations);
    await GlobalMessage.create(gMessages);
    await Message.create(messages);
    await User.create(users);
    console.log('You are fully loaded bruh'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Conversation.deleteMany();
    await GlobalMessage.deleteMany();
    await Message.deleteMany();
    await User.deleteMany();
    console.log('Its gone, whew'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
