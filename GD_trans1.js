const pool = require("./db");


(async() => {
    const client = await pool.connect();

try{
    await client.query('BEGIN')
 
   //supplier
   var sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location")VALUES ($1, $2) RETURNING *';
   var data = ['Jablao','Israel'];
   var res = await client.query(sql,data)
   console.log(res.rows[0])

   sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location")VALUES ($1, $2) RETURNING *';
   data = ['Cerbera','China'];
   res = await client.query(sql,data)
   console.log(res.rows[0])

   sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location")VALUES ($1, $2) RETURNING *';
   data = ['Badiang','Japan'];
   res = await client.query(sql,data)
   console.log(res.rows[0])

   sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location")VALUES ($1, $2) RETURNING *';
   data = ['Manero','Korea'];
   res = await client.query(sql,data)
   console.log(res.rows[0])

   sql = 'INSERT INTO "PrelimExam"."GD_Supplier"("Supp-name", "Supp-location")VALUES ($1, $2) RETURNING *';
   data = ['Cloribel','Thiland'];
   res = await client.query(sql,data)
   console.log(res.rows[0])
//Product
    sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;';
    data = [5,'Motherboard','MSI',];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;';
    data = [5,'Processor','Intel'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;';
    data = [5,'Power Supply','Corsair'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;';
    data = [6,'CPU Cooler','Corsair'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Product"("Supp-#","Prod-name", "Prod-Brand") VALUES ($1, $2,$3) RETURNING *;';
    data = [7,'Graphics Card','NVIDA'];
    res = await client.query(sql,data)
    console.log(res.rows[0])
    //Customer
    sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2)RETURNING *;';
    data = ['Lasat','Ma-a'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2)RETURNING *;';
    data = ['Salazar','Buhangin'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2)RETURNING *;';
    data = ['Pandi','Calinan'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2)RETURNING *;';
    data = ['Hibaya','Cabantian'];
    res = await client.query(sql,data)
    console.log(res.rows[0])

    sql = 'INSERT INTO "PrelimExam"."GD_Customer"("Cust-name", "Cust-address") VALUES ($1, $2)RETURNING *;';
    data = ['Sarmiento','Sasa'];
    res = await client.query(sql,data)
    console.log(res.rows[0])







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