const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: { type: Boolean, default: false },
});

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model("User", UserSchema);
