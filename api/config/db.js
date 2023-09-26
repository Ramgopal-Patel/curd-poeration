import mongoose from "mongoose";

const connectToDb=()=>{
            mongoose.connect(process.env.DB_URI)
            .then((conn)=>{
                console.log(`DB connected to ${conn.connection.host}`);
            })
            .catch((err)=>{
                console.log(err);

            })
}

export default connectToDb;