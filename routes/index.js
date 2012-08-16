
/*
 * GET home page.
 */
exports.index = function(req, res){
  var documents;
  Doc.find({}, function(err, docs) {
    documents = docs;
  });
  res.render('index', { title: 'Express', documents: documents})
};
