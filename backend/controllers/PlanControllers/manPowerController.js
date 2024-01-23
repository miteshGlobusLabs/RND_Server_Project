// controllers/manPowerController.js
const db = require('../../db');




// posting Man power data  

const insertManPowerDetails = async (req, res) => {
  const manPowerData = req.body; // Assuming req.body is an array of objects

  // Define the SQL query to insert multiple job ManPower details
  const sql =
    'INSERT INTO tbNewJobManPowerDetails (JobNo, ManPowerQty, TaskDate, BuyCost) VALUES ?';

  // Convert the array of objects into a 2D array of values
  const values = manPowerData.map((item) => [
    item.JobNo,
    item.ManPowerQty,
    item.TaskDate,
    item.BuyCost,
  ]);

  db.query(sql, [values], (err, result) => {
    if (err) {

      res.status(500).json({ error: 'Internal Server Error' });
    } else {

      res
        .status(201)
        .json({ message: 'Job ManPower details inserted successfully' });
    }
  });
};


// getting Man power data  

const getAllManPowerDetails = async (req, res) => {
  const sql = 'SELECT * FROM tbNewJobManPowerDetails';

  // Execute the SQL query to retrieve ManPower detail data
  db.query(sql, (err, rows) => {
    if (err) {

      res.status(500).json({ error: 'Internal Server Error' });
    } else {

      res.status(200).json(rows); // Send the retrieved data as JSON response
    }
  });
};







module.exports = {
  insertManPowerDetails,
  getAllManPowerDetails,
};
