const pool = require("./db")


const sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;'
const data = [2,'Monitor','Asus']

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();