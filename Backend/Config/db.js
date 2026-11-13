import mongoose from "mongoose";
import dns from "dns"
dns.setServers(["1.1.1.1"])
const connecDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}warranty`)
        console.log("DataBase Connect Successfully");
        
    } catch (error) {
       console.log("DataBase Not connect Successfully");
        
    }
}
export default connecDB;