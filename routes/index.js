var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Validaciones', success:false, errors:req.session.errors });
  req.session.errors=null;
});
router.post('/submit', function (req, res, next) {
  //validando
  req.check('email', 'Invalid Email Address').isEmail();
  req.check('password', 'Password must have 4 characters at least').isLength({min:4});
  req.check('password', 'Password cant have more than 12 characters').isLength({max:12});
  req.check('password', 'Confirmation Error').equals(req.body.passwordConfirm);
  var errors = req.validationErrors();
  if(errors){
    req.session.errors=errors;
    console.log(errors);
  }
  res.redirect('/');
});
module.exports = router;
