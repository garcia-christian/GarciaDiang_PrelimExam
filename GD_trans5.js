const pool = require("./db");


(async() => {
    const client = await pool.connect();

try{
    await client.query('BEGIN')
    
    const cus_num = 4;

    var sql = 'SELECT * FROM "PrelimExam"."GD_PurchaseOrder";'
    var res = await client.query(sql)

    var i;

    for (i = 0; i < res.rowCount; i++) {
        var array = [];
        if (res.rows[i]['Cust-#'] == cus_num) {
            array[0] ='Purchase Order No.: '+ res.rows[i]['PO-#']

            sql = 'SELECT * FROM "PrelimExam"."GD_Customer";'
           const res1 = await client.query(sql)

            var c;    
            for (c = 0; c < res1.rowCount; c++) {
                if (res1.rows[c]['Cust-#'] == cus_num) {
                    array[1] ='Customer: '+ res1.rows[1]['Cust-name'];

                    break;
                }

            }

            sql = 'SELECT * FROM "PrelimExam"."GD_Supplier"'
           const res2 = await client.query(sql)
            var a;    
            for (a = 0; a < res2.rowCount; a++) {
                if (res2.rows[a]['Supp-#'] == res2.rows[i]['Supp-#']) {
                    array[2] = 'Supplier: '+ res2.rows[1]['Supp-name'];
                    break;
                }

            }
            var date = res.rows[0]['Date'] +''
            date = date.split(" ")
            array[3] = 'Date: '+ date[0];
            array[4] = 'Time: '+date[1];
    
            console.log(array)

            
        }

    }




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