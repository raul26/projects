module.exports = function(Person) {
  Person.beforeRemote('*.__create__lists',function(ctx, user, next) {
    var req = ctx.req;
    req.body.createdAt = new Date();
    next();
  });
};
