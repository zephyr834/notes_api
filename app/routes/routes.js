var ObjectId = require('mongodb').ObjectId;

module.exports = function(app, db) {
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectId(id) };
    db.db().collection('notes').findOne(details, (err, item) => {
      if(err) {
        res.send({ 'error': 'An error has occured:' + err });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
  
    db.db().collection('notes').insertOne(note, (err, result) => {
      if(err) {
        res.send({ 'error': 'An error has occured:' + err});
      } else {
        res.send(result.ops[0]);
      }
    });
  });
}