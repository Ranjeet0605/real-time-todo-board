const connectDb = require("./config/db");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 5000;
//connect to the database
connectDb();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   
})
