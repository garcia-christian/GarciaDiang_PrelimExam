const pool = require("./db");


(async() => {
    const client = await pool.connect();

try{
    await client.query('BEGIN')
    const customer= 4;
    const PO= 11;

    const srch = 'SELECT * FROM "PrelimExam"."GD_PurchaseOrder";'
    const res = await client.query(srch);

            var i;
            var getSupp_num;
            for (i = 0; i < res.rowCount; i++) {
                if (res.rows[i]['PO-#'] == PO) {
                    getSupp_num = res.rows[i]['Supp-#']
                    break;
                }

            }
           

         const sql ='UPDATE "PrelimExam"."GD_Supplier" SET  "Pick-up-Branch"= $2 WHERE "Supp-#"=$1 RETURNING "Pick-up-Branch"'   
         const data = [getSupp_num,'Davao'];
         await client.query(sql,data)








    await client.query('COMMIT')
}
catch (e){
    await client.query('ROLLBACK')
    console.log('Rolledback')
    throw e
}
finally{
    client.release()
    
    console.log('done')
}




})().catch(e => console.error(e.stack))