const pool = require("./db")


const sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location") VALUES ($1, $2) RETURNING *;'
const data = ['Casquejo','Manila']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();