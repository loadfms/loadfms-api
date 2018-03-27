import resource from 'resource-router-middleware';
import deviceSchemma from '../models/devices';
import { Router } from 'express';

export default ({ config, db }) => {
  let routes = Router();

  routes.get('/', function (req, res) {
    var collection = db.model('device', deviceSchemma);

    collection.find(function (err, device) {
      if (err) return console.error(err);
      res.json(device);
    })
  });

  routes.get('/status', function (req, res) {
    var collection = db.model('device', deviceSchemma);

    collection.find(function (err, device) {
      if (err) return console.error(err);
      let result = [];
      device.forEach(item => {
        result.push(item.port + '-' + item.state);
      });
      res.send(result.join());
    })
  });

  routes.post('/', function (req, res) {
    var collection = db.model('device', deviceSchemma);
    let body = req.body;

    var item = new collection({
      name: body.name,
      state: body.state,
      port: body.port
    });

    item.save(function (err, object) {
      if (err) return console.error(err);
      res.json(object)
    });
  });

  routes.put('/:name/:state', function (req, res) {
    var collection = db.model('device', deviceSchemma);

    var query = { name: req.params.name };
    collection.update(query, { state: req.params.state.includes('on') ? 1 : 0 }, {}, function (err, device) {
      if (err) return console.error(err);
      res.json(device);
    })
  });

  return routes;
}