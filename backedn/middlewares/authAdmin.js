import jwt from "jsonwebtoken";

const authAdmin = (req,res,next)=>{
        const {adminToken} = req.cookies;
        if (!adminToken){
            return res.status(401).json({ message: "Unauthorized" });
        }
         try {
               // Verify the token using the secret key
               const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
           
               // If it does, add the id to the request body
               if (!req.body) {
                   req.body = {};
                 }
               if(decoded.email===process.env.ADMIN_EMAIL){
                   next();
               }else{
                   return res.status(401).json({ message: "Unauthorized" });
               }
              
               
           } catch (error) {
               res.status(401).json({ message:error.message });
               console.log(error.message);
           }

}
export default authAdmin;