const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://internal-service:egEaT07mdW4Hbdza@cluster0.gaxqkxk.mongodb.net/internal-service-db?retryWrites=true&w=majority',
    );
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
