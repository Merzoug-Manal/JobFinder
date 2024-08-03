require('dotenv').config();
const express = require("express");
const cors=require("cors")
const broker = require('./src/config/broker')
const app=express()
const auth = require('./src/middleware/isAuth')



app.use(cors())
app.use(express.json()) 


app.get("/test", (req, res) => {
    res.send("hello");
  }); 
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
  

async function main() {
  try {
    await prisma.$connect()
    console.log('Connected to the database')
  } catch (error) {
    console.error('Could not connect to the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}
// check if the broker is connected
broker.checkConnection();

const Authroutes = require('./src/routes/auth')
const Adminroutes = require('./src/routes/routesAdmin')
app.use('/api/auth', Authroutes)
app.use('/api',auth, Adminroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  main()
