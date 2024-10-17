const express = require("express");
const utils = require("./utils");
const app = express();
const db = require("./db");
const userRouter = require("./routes/user");
const categoryRouter=require("./routes/category");
const bookingRouter=require("./routes/booking");
const propertyRouter=require("./routes/property");
 
app.use(express.json());
 
app.use('/user', userRouter);
app.use('/login',userRouter);
app.use('/category',categoryRouter);
app.use('/booking',bookingRouter);
app.use('/property',propertyRouter);
app.use('/profile',userRouter);
app.use('/profile/:id',userRouter);
 
app.use((req, res, next) => {
    if (req.url === '/login' || req.url === '/user/register' || req.url==='/category' || req.url.startsWith('/user/profile')) {
        next();
    } else {
        console.log("success");
        next();   
    }
});

app.listen(1010, () => {
    console.log("server is listening on 1010");
});
