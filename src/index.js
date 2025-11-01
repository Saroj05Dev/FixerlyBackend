const express = require('express');
const cookieParser = require('cookie-parser');

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const serviceRoutes = require('./routes/Service_routes');
const subServiceRoutes = require('./routes/Sub_services_routes');
const bookingRoutes = require('./routes/booking_routes');
const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/admin_routes');
const authRouter = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.use('/api/services', serviceRoutes);
app.use('/api/sub-services', subServiceRoutes);

app.use('/api/booking', bookingRoutes);
app.use("/api/admin", adminRouter);

app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...!!`);
});


// srluDPl7mgPG6I5d
// sarojsarojkumar753_db_user