const pool = require("./db");


pool.query('SELECT * FROM "PrelimExam"."GD_Supplier";',(err,res)=>{
    try{
        console.log(res.rows);
    }catch (err){
        console.error(err.message);
    }
})
 
pool.end()