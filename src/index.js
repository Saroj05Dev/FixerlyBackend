const express = require('express');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const customerRoutes = require('./routes/customers_routes');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// app.get('/ping', (req, res) => {
//     console.log(req.body);
//     return res.json({message: "pong"});
// })
app.use('/api/customers', customerRoutes);


app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});


// srluDPl7mgPG6I5d
// sarojsarojkumar753_db_user