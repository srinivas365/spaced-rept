const express = require('express');
const { getTypes, getLevels, getCategories, getOffset, insertSubmission, getAllSubmissions, getCurrentDaySubmits } = require('../services');
const router = express.Router();
const moment = require('moment');
const logger = require('../config/logger');
const db = require('../models');

router.post('/metadata', async (req, res) => {
  try {
    const sp_levels = await getLevels();
    const sp_types = await getTypes();
    const sp_categories = await getCategories();

    res.status(200).json({ sp_categories, sp_levels, sp_types });

  } catch (error) {
    logger.error(`Error handing metadata: ${error.stack}`);
    res.status(500).json({ sp_categories: [], sp_levels: [], sp_types: [] });
  }
});

router.post('/levels', async (req, res) => {
  try {
    const sp_levels = await getLevels();
    res.json({ sp_levels });
  } catch (error) {
    logger.error(`Error handing levels: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

router.post('/types', async (req, res) => {
  try {
    const sp_types = await getLevels();
    res.json({ sp_types });
    res.json({ hey: "it's working" });
  } catch (error) {
    logger.error(`Error handing types: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

router.post('/categories', async (req, res) => {
  try {
    const sp_categories = await getCategories();
    res.json({ sp_categories });
    res.json({ hey: "it's working" });
  } catch (error) {
    logger.error(`Error handing categories: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

router.post('/submissions/all', async (req, res) => {
  try {
    const from = req.body.from;
    const to = req.body.to;
    const data = await getAllSubmissions(from, to);
    res.status(200).json(data);
  } catch (error) {
    logger.error(`Error handing getting submissions: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

router.post('/submissions/insert', async (req, res) => {
  try {
    const sp_level = req.body.sp_level;
    const sp_type = req.body.sp_type;
    const offset = await getOffset(sp_type, sp_level);
    const rts = req.body.rts || 1;
    const currentDaySubmits = await getCurrentDaySubmits(req.body.sp_category, sp_type, sp_level);
    const next_revision_date = moment().add(offset + rts + currentDaySubmits, 'days');
    logger.info(`[INSERT] Type -> ${sp_type} | Level -> ${sp_level} | Category -> ${req.body.sp_category} |  Offset -> ${offset} | CSUBS -> ${currentDaySubmits} | NRD -> ${next_revision_date}`);

    const submissions = [
      {
        link: req.body.link,
        category: req.body.sp_category,
        type: sp_type,
        level: sp_level,
        rts,
        done: 1
      },
      {
        link: req.body.link,
        category: req.body.sp_category,
        type: sp_type,
        level: sp_level,
        rts,
        done: 0,
        dtCreated: next_revision_date
      }
    ]
    const resp = await insertSubmission(submissions);
    res.status(200).json(resp);
  } catch (error) {
    logger.error(`Error handing inserts: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

router.post('/submissions/update', async (req, res) => {
  try {
    console.log(req.body);
    const rts = req.body.rts;
    const offset = await getOffset(req.body.type, req.body.level);
    const currentDaySubmits = await getCurrentDaySubmits(req.body.category, req.body.type, req.body.level);
    const next_revision_date = moment(req.body.start).add(offset + rts + currentDaySubmits, 'days');

    logger.info(`[Update] Type -> ${req.body.type} | Level -> ${req.body.level} | Category -> ${req.body.category} | Offset -> ${offset} | CSUBS -> ${currentDaySubmits} | NRD -> ${next_revision_date}`);

    const nextSubmission = {
      link: req.body.link,
      category: req.body.category,
      type: req.body.type,
      level: req.body.level,
      dtCreated: next_revision_date,
      rts: rts + 1,
      done: 0,
    }

    const response = await db.submission.create(nextSubmission);
    await db.submission.update({ done: 1 }, {
      where: {
        id: req.body.id
      }
    });

    const resp = [{
      id: response.id,
      name: response.category,
      start: next_revision_date.format('YYYY-MM-DD HH:mm'),
      end: next_revision_date.add(5, 'minute').format('YYYY-MM-DD HH:mm'),
      color: 'red',
      timed: 1,
      link: response.link,
      type: response.level,
      level: response.level,
      category: response.category,
      rts: 1,
      done: 1
    }]

    res.status(200).json(resp);
  } catch (error) {
    logger.error(`Error handing inserts: ${error.stack}`);
    res.status(500).json({ status: 0 });
  }
});

module.exports = router;


/**
 * {
  id: 2,
  name: 'Leetcode',
  start: '2023-10-01 17:28',
  end: '2023-10-01 17:33',
  color: 'red',
  timed: 1,
  link: 'https://leetcode.com/problems/zigzag-conversion/',
  type: 'Editorial',
  level: 'Very Easy',
  category: 'Leetcode',
  rts: 1,
  done: 1
}
 */

