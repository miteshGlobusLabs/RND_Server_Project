

// transporterController.js
const db = require('../../db');

// Controller to handle creating a new transporter job
const createTransporterJob = (req, res) => {
  const {
    TransporterID,
    Name,
    Contact_Person,
    Phone_Number,
    Address
  } = req.body;

  const sql = 'INSERT INTO tbTransporterJOB (TransporterID, Name, Contact_Person, Phone_Number, Address) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [TransporterID, Name, Contact_Person, Phone_Number, Address], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Transportation data inserted successfully' });
    }
  });
};

// Controller to get all transporter jobs
const getAllTransporterJobs = (req, res) => {
  const sql = 'SELECT * FROM tbTransporterJOB';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Controller to get a specific transporter job by TransporterID
const getTransporterJobById = (req, res) => {
  const { TransporterID } = req.params;
  const sql = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';

  db.query(sql, [TransporterID], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (rows.length === 0) {
      res.status(404).json({ error: 'TransporterID not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  });
};

// Controller to update a transporter job by TransporterID
const updateTransporterJobById = (req, res) => {
  try {
    const { TransporterID } = req.params;
    const updatedJobData = req.body;

    const checkExistenceQuery = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';
    db.query(checkExistenceQuery, [TransporterID], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: 'TransporterID not found' });
      }

      const updateQuery = 'UPDATE tbTransporterJOB SET ? WHERE TransporterID = ?';
      db.query(updateQuery, [updatedJobData, TransporterID], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Job details updated successfully' });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a transporter job by TransporterID
const deleteTransporterJobById = (req, res) => {
  const { TransporterID } = req.params;
  const sql = 'DELETE FROM tbTransporterJOB WHERE TransporterID = ?';

  db.query(sql, [TransporterID], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'TransporterID not found' });
    } else {
      res.status(200).json({ message: 'Job details deleted successfully' });
    }
  });
};

module.exports = {
  createTransporterJob,
  getAllTransporterJobs,
  getTransporterJobById,
  updateTransporterJobById,
  deleteTransporterJobById
};
