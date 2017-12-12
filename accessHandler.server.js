'use strict';
 
const ADODB = require('node-adodb');
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=node-adodb.accdb;');
 
// ???????
connection
  .execute('INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Newton", "Male", 25)')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    // TODO ????
  });
 
// ????????
connection
  .execute(
    'INSERT INTO Users(UserName, UserSex, UserAge) VALUES ("Lola", "Female", 22)',
    'SELECT @@Identity AS id'
  )
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    // TODO ????
  });
 
// ??????
connection
  .query('SELECT * FROM Users')
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    // TODO ????
  });
 
// ????????
connection
  .schema(20)
  .then(schema => {
    // console.log(JSON.stringify(schema, null, 2));
  })
  .catch(error => {
    // TODO ????
  });