
const express = require('express');
const multer = require('multer');
const {  generateRandomController, csvDataController, getAll } = require('./../controllers/csvController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/savefromcsv', upload.single('csvFile'), csvDataController);   


router.get("/getall",getAll)


router.get('/generate',generateRandomController)

module.exports = router;
