import {
  Router
} from 'express';

const routes = Router();

routes.get('/:city1/:city2', (req, res) => {
  req.params.city1
  res.render('index', {
    title: 'MetaWeather demo',
    city1: req.params.city1,
    city2: req.params.city2
  });
});

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  res.render('index', {
    title: 'MetaWeather demo'
  });
});

/**
 * GET /error
 */
routes.get('/error', (req, res, next) => {
  const {
    title
  } = req.query;

  if (title == null || title === '') {
    // You probably want to set the response HTTP status to 400 Bad Request
    // or 422 Unprocessable Entity instead of the default 500 of
    // the global error handler (e.g check out https://github.com/kbariotis/throw.js).
    // This is just for demo purposes.
    next(new Error('The "title" parameter is required'));
    return;
  }

  res.render('index', {
    title
  });
});

export default routes;
