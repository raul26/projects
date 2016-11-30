var passport = require('passport');
var User = require('../models/users')
module.exports = {
  init: function(req, res) {
    return res.json({'jsjs': "salu2"});
  },
  register: function(req, res) {
    User.create({
      username: req.body.username,
      passport: req.body.password
    },function(err, user) {
      if (err) {
        res.json({'err': err});
        console.log(err);
      };
      return res.json(user);
    })
  }
}
