module.exports = function(List) {
  List.beforeRemote('*.save',function(ctx, list, next) {
    var req = ctx.req;
    req.body.date = Date();
    next();
  });
};
