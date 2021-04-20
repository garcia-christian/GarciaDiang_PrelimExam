const pool = require("./db")


const sql = 'UPDATE "PrelimExam"."GD_Supplier" SET "Supp-name"=$1, "Supp-location" =$2 WHERE "Supp-#" = 1 RETURNING *;'
const data = ['Balaman','Davao']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();