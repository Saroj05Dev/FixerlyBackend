const express = require('express');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const customerRoutes = require('./routes/customers_routes');
const providerRoutes = require("./routes/provider_routes");
const serviceRoutes = require('./routes/Service_routes');
const subServiceRoutes = require('./routes/Sub_services_routes');
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// app.get('/ping', (req, res) => {
//     console.log(req.body);
//     return res.json({message: "pong"});
// })
app.use('/api/customers', customerRoutes);
app.use("/api/providers", providerRoutes);

app.use('/api/services', serviceRoutes);
app.use('/api/sub-services', subServiceRoutes);

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});


// srluDPl7mgPG6I5d
// sarojsarojkumar753_db_user