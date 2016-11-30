module.exports = function(CoffeShop) {
  CoffeShop.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var openHour = 8, closeHour = 21;
    console.log('current hour is: ' + currentHour);
    var response;
    if (currentHour>openHour && currentHour<closeHour) {
      response = 'The business is open';
    }
    else{
      response = "Now is closed";
    }
    cb(null, response);
  };
  CoffeShop.getName = function(shopId, cb) {
    CoffeShop.findById(shopId, function  (err, coffeShop) {
      var response;
      if (!coffeShop) {
        response = 'Invalid ID';
      }else{
        response = "name of the coffee shop is: "+ coffeShop.name;
      }
      cb(null, response);
      console.log(response);
    });
  };
  CoffeShop.remoteMethod(
    'status',
    {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );
  CoffeShop.remoteMethod(
    'getName',
    {
      http: {path: '/getname', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http:{source: 'query'}},
      returns: {arg: 'name', type: 'string'}
    }
  );
};
