const express = require('express');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const serviceRoutes = require('./routes/Service_routes');
const subServiceRoutes = require('./routes/Sub_services_routes');
const bookingRoutes = require('./routes/booking_routes');
const userRouter = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.use('/api/services', serviceRoutes);
app.use('/api/sub-services', subServiceRoutes);

app.use('/api/booking', bookingRoutes);

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});


// srluDPl7mgPG6I5d
// sarojsarojkumar753_db_user