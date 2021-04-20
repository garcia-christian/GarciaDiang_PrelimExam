const pool = require("./db")


const sql = 'UPDATE "PrelimExam"."GD_LineItem" SET "PO-#"=$1, "Prod-#"=$2 WHERE "Line_Count" = 1 RETURNING *;'

const data = [2,5]

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();