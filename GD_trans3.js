const pool = require("./db");


(async() => {
    const client = await pool.connect();

try{
    await client.query('BEGIN')
    //customer number input
    const cus_num = 4;

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

        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING "Line_Count";'
        data = [PO.rows[0]["PO-#"],item]
        const line1 = await client.query(sql,data)

    //Second Buy
        
       var item2 = 7
        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING "Line_Count" ;'
        data = [PO.rows[0]["PO-#"],item2]
        const line2 =  await client.query(sql,data)

    //third Buy
        var item3 = 8;
        sql = 'INSERT INTO "PrelimExam"."GD_LineItem"("PO-#", "Prod-#") VALUES ($1, $2) RETURNING "Line_Count";'
        data = [PO.rows[0]["PO-#"],item3]
        const line3 = await client.query(sql,data)


    //cancel
        const cancel = 'DELETE FROM "PrelimExam"."GD_LineItem" WHERE "Line_Count" = $1 ;'
        const dataC = [line3.rows[0]['Line_Count']]
        await client.query(cancel,dataC)

        





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