
'use strict';

const maccess = require('./accessHandler.server.js');

var insertData = {vars:[
  {name:'UserName', value:'Newton'},
  {name:'UserSex', value:'Male'},
  {name:'UserAge', value:25},
  {name:'fecha', value:'10/12/17'}
]};
var table = 'Users';

maccess.connectTo('node-adodb.accdb');
maccess.deleteAll(table);
maccess.insert(table, insertData);

insertData.vars[0].value = "Lola";
insertData.vars[1].value = "Female";
insertData.vars[2].value = 30;
insertData.vars[3].value = "12/13/17";

maccess.insert(table, insertData);

maccess.selectAll(table);