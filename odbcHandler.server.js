let con = new odbc.Connection()
    .connect(connection.connectionString);
 
let r = async () => {
    await con.prepareQuery("CREATE TABLE tblTest( myColumn int )").toSingle();
    await con.prepareQuery("INSERT INTO tblTest( myColumn )VALUES(?)", 250).toSingle();
    let r = await con.prepareQuery("SELECT * FROM tblTest").toSingle();
 
    console.log( r.myColumn ); // == 250 
};
 
r().then(() => {
 
}).catch((err) => {
    console.log( err );
});