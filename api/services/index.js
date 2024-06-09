const db = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');
const config = require('../config/config');

const { sequelize } = require('../models');

const getTabItems = async () => {
  const sp_tab_items = await db.category.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('tab')), 'tab']]
  })
  return sp_tab_items.map(x=>x.tab);
}

const getTypes = async () => {
  const sp_types = await db.level_offset.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('type')), 'type']]
  })
  return sp_types.map(x=>x.type);
}

const getLevels = async () => {
  const sp_types = await db.level_offset.findAll({
    attributes: [[sequelize.fn('DISTINCT', sequelize.col('level')), 'level']]
  })
  return sp_types.map(x=>x.level);
}

const getCategories = async (tab) => {
  const sp_categories = await db.category.findAll({
    attributes: ['name'],
    where: {
      tab: tab
    }
  })
  return sp_categories.map(x=>x.name);
}

const getOffset = async (type, level) => {
  const data = await db.level_offset.findOne({
    where: {
      type,
      level
    }
  });

  return data.offset;
}

const insertSubmission = async (payload) => {
  await db.submission.bulkCreate(payload);
  const resp = [
    {
      name: payload[0].category,
      start: moment().format('YYYY-MM-DD HH:mm'),
      end: moment().add(5,'minute').format('YYYY-MM-DD HH:mm'),
      color: 'green',
      timed: 1,
      link: payload[0].link,
      type: payload[0].type,
      level: payload[0].level,
      category: payload[0].category,
      rts: payload[0].rts,
      tab: payload[0].tab
    },
    {
      name: payload[1].category,
      start: payload[1].dtCreated.format('YYYY-MM-DD HH:mm'),
      end: payload[1].dtCreated.add(5,'minute').format('YYYY-MM-DD HH:mm'),
      color: 'red',
      timed: 1,
      link: payload[1].link,
      type: payload[1].type,
      level: payload[1].level,
      category: payload[1].category,
      rts: payload[1].rts,
      tab: payload[1].tab
    },
  ];

  return resp;
}

const getAllSubmissions = async (from, to, category, tab) => {
  const fromDate = moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const toDate = moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss');

  let whereClause = { dtCreated: { [Op.between]: [ fromDate, toDate] }, tab };

  if(category != null){
    whereClause['category'] = category;
  }


  let submittedList = await db.submission.findAll({
    where: whereClause
  });

  const pendingCount = await db.submission.count({
    where: {
      dtCreated: { [Op.between]: [ fromDate, toDate] },
      done: 0
    }
  })

  submittedList = submittedList.map((submission) => ({
    id: submission.id,
    name: submission.category,
    start: moment(submission.dtCreated).format('YYYY-MM-DD HH:mm'),
    end: moment(submission.dtCreated).add(5,'minute').format('YYYY-MM-DD HH:mm'),
    color: submission.done == 1 ? 'green' : 'red',
    timed: 1,
    link: submission.link,
    type: submission.type,
    level: submission.level,
    category: submission.category,
    rts: submission.rts,
    done: submission.done,
    tab: submission.tab
  }));

  return { submittedList, pendingCount };
}

const getSummary = async (from, to, category, tab) => {
  const fromDate = moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const toDate = moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss');

  let pendingListWhereClause = {
    done: 0,
    dtCreated: { [Op.between]: [ fromDate, toDate] },
    tab: tab
  };

  let doneListWhereClause = {
    done: 1,
    dtCreated: { [Op.between]: [ fromDate, toDate] },
    tab: tab
  };

  if(category != null){
    doneListWhereClause['category'] = category;
    pendingListWhereClause['category'] = category;
  }

  let pendingList = await db.submission.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('dtCreated')), 'dtCreated'],
      [sequelize.fn('COUNT', sequelize.literal('1')), 'pendingCount'],
    ],
    where: pendingListWhereClause,
    group: [sequelize.fn('DATE', sequelize.col('dtCreated'))],
    raw: true
  });

  let doneList = await db.submission.findAll({
    attributes: [
      [sequelize.fn('DATE', sequelize.col('dtCreated')), 'dtCreated'],
      [sequelize.fn('COUNT', sequelize.literal('1')), 'doneCount'],
    ],
    where: doneListWhereClause,
    group: [sequelize.fn('DATE', sequelize.col('dtCreated'))],
    raw: true
  });

  const pendingCount = await db.submission.count({
    where: {
      dtCreated: { [Op.between]: [ fromDate, toDate] },
      done: 0
    }
  });

  pendingList = pendingList.map((submission) => ({
    start: moment(submission.dtCreated).format('YYYY-MM-DD'),
    color: 'pink',
    timed: 0,
    name: `${submission.pendingCount} pending`,
  }));

  doneList = doneList.map((submission) => ({
    start: moment(submission.dtCreated).format('YYYY-MM-DD'),
    color: 'green',
    timed: 0,
    name: `${submission.doneCount} done`,
  }));

  return { submittedList: [ ...pendingList, ...doneList ], pendingCount };
}

const getCurrentDaySubmits = async (category, type, level) => {
  const count = await db.submission.count({
    where: {
      dtCreated: { [Op.between]: [ moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'), moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')] },
      category,
      level,
      type
    }
  });

  return count;
}

const getOverallProgress = async (tab, done) => {
  const data = await db.sequelize.query(`with cte as (
    SELECT 
        a.category, COUNT(distinct link) as cnt
    FROM
        SP_SUBMISSION a
    WHERE
        done = :done
        and date(dtCreated) <= curdate()
    GROUP BY 1)
    select a.name as x,
      coalesce(b.cnt,0) as y
        from SP_CATEGORY a left join cte b on a.name = b.category where a.tab = '${tab}'`, {type: db.sequelize.QueryTypes.SELECT, replacements: {done}, raw: true});
  
  return data;
};

module.exports = {
  getTypes,
  getCategories,
  getLevels,
  getOffset,
  insertSubmission,
  getAllSubmissions,
  getCurrentDaySubmits,
  getSummary,
  getOverallProgress,
  getTabItems
}