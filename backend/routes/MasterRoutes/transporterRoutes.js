// // routes/transporterRoutes.js
// const express = require('express');
// const db = require('../../db');

// const router = express.Router();


// router.post('/', (req, res) => {
//   const {
//     TransporterID,
//     Name,
//     Contact_Person,
//     Phone_Number,
//     Address
//   } = req.body;

//   // Define the SQL query to insert a new item
//   const sql = 'INSERT INTO tbTransporterJOB (TransporterID, Name, Contact_Person, Phone_Number, Address) VALUES (?, ?, ?, ?, ?)';

//   // Execute the SQL query to insert the item data
//   db.query(
//     sql,
//     [TransporterID, Name, Contact_Person, Phone_Number, Address],
//     (err, result) => {
//       if (err) {

//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {

//         res.status(201).json({ message: 'Transportation data inserted successfully' });
//       }
//     }
//   );
// });



// // Get all job ManPower details
// router.get('/', (req, res) => {

//   const sql = 'SELECT * FROM tbTransporterJOB';

//   // Execute the SQL query to retrieve ManPower detail data
//   db.query(sql, (err, rows) => {
//     if (err) {

//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.status(200).json(rows); // Send the retrieved data as JSON response
//     }
//   });
// });



// router.get('/:TransporterID', (req, res) => {
//   const { TransporterID } = req.params;

//   // Define the SQL query to retrieve job data by JobNo
//   const sql = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';

//   // Execute the SQL query to retrieve job data
//   db.query(sql, [TransporterID], (err, rows) => {
//     if (err) {

//       res.status(500).json({ error: 'Internal Server Error' });
//     } else if (rows.length === 0) {
//       res.status(404).json({ error: 'WorkOrderNo not found' });
//     } else {
//       res.status(200).json(rows[0]); // Send the retrieved data as JSON response
//     }
//   });
// });


// //Update a workorder details by Transporter id` 

// router.patch('/:TransporterID', (req, res) => {
//     try {
//       const { TransporterID } = req.params;
//       const updatedJobData = req.body;
  
//       // Check if the job with the specified TransporterID exists
//       const checkExistenceQuery = 'SELECT * FROM tbTransporterJOB WHERE TransporterID = ?';
//       db.query(checkExistenceQuery, [TransporterID], (err, rows) => {
//         if (err) {

//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
  
//         if (rows.length === 0) {
//           return res.status(404).json({ error: 'Work not found' });
//         }
  
//         // Update the job data
//         const updateQuery = 'UPDATE tbTransporterJOB SET ? WHERE TransporterID = ?';
//         db.query(updateQuery, [updatedJobData, TransporterID], (err, result) => {
//           if (err) {

//             res.status(500).json({ error: 'Internal Server Error' });
//           } else {

//             res.status(200).json({ message: 'Job details updated successfully' });
//           }
//         });
//       });
//     } catch (err) {

//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
  
//   // delete using TransporterID
  
//   router.delete('/:TransporterID', (req, res) => {
//     const { TransporterID } = req.params;
  
//     // Define the SQL query to delete a customer by customerCode
//     const sql = 'DELETE FROM tbTransporterJOB WHERE TransporterID = ?';
  
//     // Execute the SQL query to delete the customer
//     db.query(sql, [TransporterID], (err, result) => {
//       if (err) {

//         res.status(500).json({ error: 'Internal Server Error' });
//       } else if (result.affectedRows === 0) {
//         res.status(404).json({ error: 'Order not found' });
//       } else {

//         res.status(200).json({ message: 'Job details deleted successfully' }); 
//       }
//     });
//   })





// module.exports = router;







// transporterRoutes.js
const express = require('express');
const router = express.Router();
const transporterController = require('../../controllers/MasterControllers/transporterController');

router.post('/', transporterController.createTransporterJob);
router.get('/', transporterController.getAllTransporterJobs);
router.get('/:TransporterID', transporterController.getTransporterJobById);
router.patch('/:TransporterID', transporterController.updateTransporterJobById);
router.delete('/:TransporterID', transporterController.deleteTransporterJobById);

module.exports = router;
