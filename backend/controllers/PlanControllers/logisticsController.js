// controllers/logisticsController.js
const db = require('../../db');



// posting logictics data  

const insertJobLogistics  = async (req, res) => {
  const logisticsData = req.body; // Assuming req.body is an array of objects

  // Define the SQL query to insert multiple job logistics details
  const sql = 'INSERT INTO tbNewJobLogisticsDetails (JobNo, TransporterID, VehicleCategory, VehicleType, VehicleNo, DriverName, UoM, WOLineNo, TaskDate, BuyCost, TripCount) VALUES ?';

  // Convert the array of objects into a 2D array of values
  const values = logisticsData.map(item => [
    item.JobNo,
    item.TransporterID,
    item.VehicleCategory,
    item.VehicleType,
    item.VehicleNo,
    item.DriverName,
    item.UoM,
    item.WOLineNo,
    item.TaskDate,
    item.BuyCost,
    item.TripCount
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) {

      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(201).json({ message: 'Data inserted successfully' });
  });
};


// getting Logistics data  

const getAllJobLogistics = async (req, res) => {


  const sql = 'SELECT * FROM tbNewJobLogisticsDetails';

  // Execute the SQL query to retrieve logistics detail data
  db.query(sql, (err, rows) => {
    if (err) {

      res.status(500).json({ error: 'Internal Server Error' });
    } else {

      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
};














module.exports = {
  insertJobLogistics,
  getAllJobLogistics,
};
