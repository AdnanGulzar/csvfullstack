
const CsvData  = require('../models/csvModel');
const csvParser = require('csv-parser');
const Papa = require('papaparse');

const { uniqueNamesGenerator, Config, adjectives, colors, animals } = require('unique-names-generator');

const csvDataController = async (req, res) => {  
  const file = req.file;
  console.log(file)

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  if (file.mimetype !== 'text/csv') {
    return res.status(400).json({ error: 'Invalid file format' });
  }

  const records = [];
  const fileContent = file.buffer.toString(); 
  Papa.parse(file.buffer.toString(), {
    header: true,
    skipEmptyLines: true,
    step: (result) => {
      records.push(result.data);
    },
    complete: async () => {
      if (records.length < 20) {
        return res.status(400).json({ error: 'Minimum 20 records required' });
      }

      try {
        await CsvData.bulkCreate(records);
        return res.status(200).json({ message: 'CSV data inserted successfully' });
      } catch (error) {
        return res.status(500).json({ error: error });
      }
    }
  });
}


const getAll=async (req, res) => {
  try {
    const allData = await CsvData.findAll();
    return res.status(200).json(allData);
  } catch (error) {   
    return res.status(500).json({ error: 'Error retrieving data from the database' });
  }
}

const generateRandomController = async (req, res) => {
  const numRecords = 20;

  const result = await generateRandomData(numRecords);
  console.log(result)
  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(500).json({ error: result });
  }
}

const generateRandomData = async (numRecords) => {
  const data = [];
  for (let i = 0; i < numRecords; i++) {
    const randomName= uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals]
    }); 
    data.push({
      name:randomName,
      contact: `street  ${i*Math.random()*1000} pakistan`
    });
  }

  try {
    console.log(data)
    await CsvData.bulkCreate(data);
    return { success: true, message: 'Random data inserted successfully' };
  } catch (error) {
    return { success: false, error: error };
  }
};

module.exports = { generateRandomController, csvDataController,getAll };
