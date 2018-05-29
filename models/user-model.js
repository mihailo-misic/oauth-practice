const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  twitterId: String,
  thumbnail: String,
});

UserSchema.statics.findOneOrCreate = async function (condition, doc) {
  const one = await this.findOne(condition);

  return one || this.create(doc);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;