import { connectDB  } from "./DB/connection.js";
import { assignmentRouter } from "./Modules/Assignment/index.js";
export const bootstrap = async (app , express) => {
    app.use(express.json());
    
    await connectDB();

    app.get("/", (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Welcome to the API"
        })
    })

    
    app.use("/api/v1/assignment", assignmentRouter);

    app.all("/*dummy",(req,res)=>{
        res.status(404).json({
            status: "fail",
            message: "Route not found"
        })
    });

}