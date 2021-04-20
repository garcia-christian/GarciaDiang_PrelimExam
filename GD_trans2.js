const pool = require("./db");


(async() => {
    const client = await pool.connect();

try{
    await client.query('BEGIN')
    //customer number input
    const cus_num = 3;

    const findsql = 'SELECT * FROM "PrelimExam"."GD_Product";'
    const res = await client.query(findsql)

    function getSupp(Prod_id){
        var result;
        var i;
        
        for(i=0;i<res.rowCount; i++){
              if(res.rows[i]['Prod-#']==Prod_id){
                    result = res.rows[i]['Supp-#']
                    break;
              }  

               
        }
        return result;
    }

    //first buy
    var item = 6;
        var sup_id = getSupp(item);
      
        var sql = 'INSERT INTO "PrelimExam"."GD_PurchaseOrder"("Supp-#", "Cust-#", "Date") VALUES ($1, $2, $3) RETURNING "PO-#";'

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear()
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        today = yyyy + '-' + mm + '-' + dd + ' ' + time;
        var data = [sup_id,cus_num,today]
        const PO = await client.query(sql,data);

        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING *;'
        data = [PO.rows[0]["PO-#"],item]
        await client.query(sql,data)

    //Second Buy
        
        item = 7
        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING *;'
        data = [PO.rows[0]["PO-#"],item]
        await client.query(sql,data)

    //third Buy
        item = 8
        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING *;'
        data = [PO.rows[0]["PO-#"],item]
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