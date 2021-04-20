const pool = require("./db")


const sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING *;'
const data = [2,3]

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();