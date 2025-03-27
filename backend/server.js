


// import express from "express";
// import dotenv from "dotenv";
// import { connectionDB } from "./config/db.js";
// import Product from "./models/product.model.js";
// import mongoose from "mongoose";
// import productRoutes from "./routes/product.route.js"
// import path from "path";

// dotenv.config();

// const app = express();
// const PORT=process.env.PORT;
// const __dirname =path.resolve()
// app.use(express.json()); // allows a json data to be passed in the body

// app.use("/api/products",productRoutes)
  

// if(process.env.NODE_ENV ==="production"){
//   app.use(express.static(path.join(__dirname,"/frontend/dist")));

//   app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
//   })
// }

// connectionDB();

// app.listen(PORT, () => {
//   console.log("Server started on http://localhost:"+PORT);
// });




import express from "express";
import dotenv from "dotenv";
import { connectionDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Corrected path

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html")); // Corrected path
  });
}

// Connect to DB
connectionDB();

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

