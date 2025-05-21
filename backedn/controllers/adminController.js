import jwt from "jsonwebtoken";


//admin Login admin:/api/admin/login
export const adminLogin = async (req, res) => {
   try {
    const { email, password } = req.body;
    
    if (email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({success:true, message: "Admin Login successful" });

    }else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
   } catch (error) {
         res.status(500).json({ message: error.message });
         console.log(error.message);
   }
}


//admin auth middleware:/api/admin/auth
export const isAdminAuth = async (req, res) => {
 try {
      return res.status(200).json({ success: true, message: "Admin is authenticated" }); 
    
 } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
 }
};

//admin Logout:/api/admin/logout
export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", 
        })
        return res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error);
    }
}