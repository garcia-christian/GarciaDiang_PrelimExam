const pool = require("./db")


const sql = 'UPDATE "PrelimExam"."GD_Customer" SET "Cust-name"=$1, "Cust-address"= $2 WHERE "Cust-#" = 1 RETURNING *;'
const data = ['Diang','Bangke']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();