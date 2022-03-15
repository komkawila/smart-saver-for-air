// Header
const express = require('express');
const cors = require("cors");
const config = require('./util/config');
const app = express();
const port = config.PORT;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(cors());
app.use(express.json());

// Image API Address
app.use(express.static('./routes/users/uploads-images/uploads'));
app.use('/images', express.static('./routes/users/uploads-images/uploads'));

const airRoute = require('./routes/air/air');
app.use('/air', airRoute);

const usersRoute = require('./routes/users/users');
app.use('/users', usersRoute);

const loginRoute = require('./routes/login');
app.use('/login', loginRoute);

const datalogRoute = require('./routes/datalog/datalog');
app.use('/datalog', datalogRoute);

// const modesRoute = require('./routes/modes/modes');
// app.use('/modes', modesRoute);

const configRoute = require('./routes/setconfig/setconfig');
app.use('/config', configRoute);

// Image Upload
const uploadimageRoute = require('./routes/users/uploads-images/users.uploads');
app.use('/upload-image', uploadimageRoute);

// Air Config
const airconfigRoute = require('./routes/airconfig/airconfig');
app.use('/airconfig', airconfigRoute);

// Devices Config
const devicesRoute = require('./routes/devices/devices');
app.use('/devices', devicesRoute);
app.use('/devices2', devicesRoute);

app.listen(port, () =>
    console.log(`sttslife-api app listening on port ${port}!`)
);