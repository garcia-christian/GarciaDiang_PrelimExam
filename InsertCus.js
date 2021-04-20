const pool = require("./db")


const sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2) RETURNING *;'
const data = ['Rado','Sasa']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();