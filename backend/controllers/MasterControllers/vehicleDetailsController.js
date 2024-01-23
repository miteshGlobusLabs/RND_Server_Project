// vehicleDetailsController.js
const db = require('../../db');

// Controller to handle creating a new vehicle details
const createVehicleDetails = (req, res) => {
  const {
    vehicle_No,
    vehicle_category,
    vehicle_type
  } = req.body;

  const sql = 'INSERT INTO tbVehicleDetails (vehicle_No, vehicle_category, vehicle_type) VALUES (?, ?, ?)';

  db.query(sql, [vehicle_No, vehicle_category, vehicle_type], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Vehicle details inserted successfully' });
    }
  });
};

// Controller to get all vehicle details
const getAllVehicleDetails = (req, res) => {
  const sql = 'SELECT * FROM tbVehicleDetails';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Controller to get a specific vehicle details by vehicle_No
const getVehicleDetailsByNumber = (req, res) => {
  const { vehicle_No } = req.params;
  const sql = 'SELECT * FROM tbVehicleDetails WHERE vehicle_No = ?';

  db.query(sql, [vehicle_No], (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (rows.length === 0) {
      res.status(404).json({ error: 'Vehicle not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  });
};

// Controller to update a vehicle details by vehicle_No
const updateVehicleDetailsByNumber = (req, res) => {
  try {
    const { vehicle_No } = req.params;
    const updatedJobData = req.body;

    const checkExistenceQuery = 'SELECT * FROM tbVehicleDetails WHERE vehicle_No = ?';
    db.query(checkExistenceQuery, [vehicle_No], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (rows.length === 0) {
        return res.status(404).json({ error: 'Vehicle not found' });
      }

      const updateQuery = 'UPDATE tbVehicleDetails SET ? WHERE vehicle_No = ?';
      db.query(updateQuery, [updatedJobData, vehicle_No], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(200).json({ message: 'Vehicle details updated successfully' });
        }
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a vehicle details by vehicle_No
const deleteVehicleDetailsByNumber = (req, res) => {
  const { vehicle_No } = req.params;
  const sql = 'DELETE FROM tbVehicleDetails WHERE vehicle_No = ?';

  db.query(sql, [vehicle_No], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Vehicle details not found' });
    } else {
      res.status(200).json({ message: 'Vehicle details deleted successfully' });
    }
  });
};

module.exports = {
  createVehicleDetails,
  getAllVehicleDetails,
  getVehicleDetailsByNumber,
  updateVehicleDetailsByNumber,
  deleteVehicleDetailsByNumber
};
