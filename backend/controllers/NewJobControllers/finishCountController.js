// closeController.js
const db = require('../../db');
const express = require('express');
const router = express.Router();

// Helper function for database query
async function getCountByTransactionTypeAndStatus(jobTransactionType, jobsStatus) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT
        JobTransactionType,
        COUNT(*) AS TransactionCount
      FROM
        tbNewJobs
      WHERE
        JobsStatus = ?
        AND JobTransactionType = ?
      GROUP BY
        JobTransactionType;
    `;
    const params = [jobsStatus, jobTransactionType];

    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0] ? results[0].TransactionCount : 0);
      }
    });
  });
}

// Controller functions for different routes
exports.getCountInsideToInside = async (req, res) => {
  const jobTransactionType = 'Inside To Inside';
  const jobsStatus = '3';

  try {
    const count = await getCountByTransactionTypeAndStatus(jobTransactionType, jobsStatus);
   
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCountInsideToOutside = async (req, res) => {
  const jobTransactionType = 'Inside To Outside';
  const jobsStatus = '3';

  try {
    const count = await getCountByTransactionTypeAndStatus(jobTransactionType, jobsStatus);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCountOutsideToInside = async (req, res) => {
  const jobTransactionType = 'Outside To Inside';
  const jobsStatus = '3';

  try {
    const count = await getCountByTransactionTypeAndStatus(jobTransactionType, jobsStatus);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCountOutsideToOutside = async (req, res) => {
  const jobTransactionType = 'Outside To Outside';
  const jobsStatus = '3';

  try {
    const count = await getCountByTransactionTypeAndStatus(jobTransactionType, jobsStatus);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
