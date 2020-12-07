const express = require('express');
const SeatsUnavailable = require('../models/seatsUnavailable');

const router = express.Router();

router.param('seatsUnavailableId', async (req, res, next) => {
  try {
    const seatsUnavailable = await SeatsUnavailable.findOne({
      _id: req.params.seatsUnavailableId,
    });
    if (!seatsUnavailable) {
      res.status(404).json({ message: 'seatsUnavailable id does not exist' });
    } else {
      req.seatsUnavailable = seatsUnavailable;
      req.seatsUnavailableId = req.params.seatsUnavailableId;
      next();
    }
  } catch (err) {
    res.status(500).send();
  }
});
router.get('/', async (req, res) => {
  try {
    const allSeatsUnavailable = await SeatsUnavailable.find();
    res.json(allSeatsUnavailable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:seatsUnavailableId', async (req, res) => {
  res.send(req.seatsUnavailable);
});
router.get(
  '/theater_Id/:theaterId/theaterName/:theaterName/show/:show',
  async (req, res) => {
    const allSeatsUnavailable = await SeatsUnavailable.find({
      theater_id: req.params.theater_id,
      theaterName: req.params.theaterName,
      show: req.params.show,
    });
    if (allSeatsUnavailable.length > 0) {
      res.json({
        seatsUnavailable: allSeatsUnavailable[0].seatsUnavailable,
      });
    } else {
      res.status(404).send();
    }
    // res.json(allSeatsUnavailable);
  }
);
router.patch(
  '/theater_Id/:theaterId/theaterName/:theaterName/show/:show',
  async (req, res) => {
    const allSeatsUnavailable = await SeatsUnavailable.updateOne(
      {
        theater_id: req.params.theater_id,
        theaterName: req.params.theaterName,
        show: req.params.show,
      },
      {
        $set: {
          seatsUnavailable: req.body,
        },
      }
    );
    return res.send(allSeatsUnavailable);
  }
);
module.exports = router;
