import app from "./app.js";


app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    console.log(`server is running on ${process.env.PORT}`)
})