const pool = require("./db")


const sql = 'UPDATE "PrelimExam"."GD_PurchaseOrder" SET "Supp-#"=$1, "Cust-#"=$2, "Date"=$3 WHERE "PO-#" = 1 RETURNING *;'
var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear()
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        today = yyyy + '-' + mm + '-' + dd + ' ' + time;


const data = [3,2,today]

pool.query(sql,data,(err,res)=>{
    if(err){
        console.log(err.stack);
    }else{
        console.log(res.rows[0]);
    }

});
pool.end();