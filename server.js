const express= require('express');
const connectDB = require('./script')
const app = express();

connectDB();
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
