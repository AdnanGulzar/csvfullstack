const express = require('express');
const sequelize =require("./utils/db");
var cors = require('cors')

const csvroutes =require("./routes/csvRoute")
// Create an Express app
const app = express();
app.use(cors({  origin: '*',}))
app.use(express.json());




(async () => {
  await sequelize.sync();
  console.log('Database synced');
})();


app.use("/api",csvroutes)

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
