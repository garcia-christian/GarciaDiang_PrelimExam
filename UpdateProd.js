const pool = require("./db")


const sql = 'UPDATE "PrelimExam"."GD_Product" SET "Prod-name"=$1, "Prod-Brand" =$2 WHERE "Prod-#" = 2 RETURNING *;'
const data = ['HDD','Seagate']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();