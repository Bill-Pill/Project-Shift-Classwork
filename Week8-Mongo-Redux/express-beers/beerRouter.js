const express = require('express');
const router = express.Router();
const beerDB = require('./beers-data.json')

router.param('beer', function (req, res, next, id) {
  req.beer = beerDB.beers.find(beer => beer.id === id);
  next();
});

router.param('review', function (req, res, next, reviewID) {
  req.beerReview = req.beer.reviews.find(review => (review.reviewID == reviewID));
  next();
});


router.get('/', (req, res) => {
  res.send(beerDB.beers);
});

router.get('/:beer', (req, res) => {
  res.send(`Here's your beer!: ${req.beer.name}`);
});

router.get('/:beer/reviews', (req, res) => {
  res.send(`Psssst. The reviews are in for ${req.beer.name}: ${JSON.stringify(req.beer.reviews)}`);
});

router.get('/:beer/reviews/:review', (req, res) => {
  res.send(`Review: ${req.beerReview.text}`);
})

module.exports = router;