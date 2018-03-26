import resource from 'resource-router-middleware';
import deviceSchemma from '../models/devices';
import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	routes.get('/', function (req, res) {
    var collection = db.model('device', deviceSchemma);

    collection.find(function (err, kittens) {
      if (err) return console.error(err);
      res.json(kittens);
    })
  });
  
  routes.get('/:name', function (req, res) {
    var collection = db.model('device', deviceSchemma);

    collection.find({ name: req.params.name}, function (err, kittens) {
      if (err) return console.error(err);
      res.json(kittens);
    })
	});

	routes.post('/', function (req, res) {
    var collection = db.model('device', deviceSchemma);
    let body = req.body;

    var item = new collection({
      name: body.name,
      state: body.state
    });

    item.save(function (err, object) {
      if (err) return console.error(err);
      res.json(object)
    });
	});

	return routes;
}