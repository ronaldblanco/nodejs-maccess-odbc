
'use strict';

const ADODB = require('node-adodb');

module.exports = {
	
  /**
   * Variables
   * Provider=Microsoft.Jet.OLEDB.4.0; -> For .mdb files and olders.
   */
	connection: undefined,
	provider: 'Provider=Microsoft.ACE.OLEDB.12.0;',
	
  /**
   * Set Provider
   *
   * @param {string} provider
   */	
	setProvider: function(provider){
		this.provider = 'Provider=' + provider + ';'
	},
	
  /**
   * Get Provider
   *
   */	
	getProvider: function(){
		console.log(this.provider);
	},
	
  /**
   * Make Connection
   *
   * @param {string} dataSource
   */	
	connectTo: function(dataSource){
		this.connection = ADODB.open(this.provider + 'Data Source=' + dataSource + ';');
	},
	
  /**
   * Insert Row
   *
   * @param {string} table
   * @param {object} insertData = {vars:[
   *   {name:'UserName', value:'Newton'},
   *   {name:'UserSex', value:'Male'},
   *   {name:'UserAge', value:25},
   *   {name:'fecha', value:'10/12/17'}
   * ]}
   */	
  insert: function(table, insertData){
    const NUM_REGEX = /^[0-9]/i;
    const DATE_REGEX = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/i;
    var names = '(';
    var values = '(';
    insertData.vars.map(function(data, index){
	  if(index < insertData.vars.length - 1){
		names = names + data.name + ', ';
		if (DATE_REGEX.test(data.value)) values = values + '#' + data.value + '#, ';
	    else if (NUM_REGEX.test(data.value)) values = values + data.value + ', ';
		else values = values + '"' + data.value + '", ';
	  } else {
		names = names + data.name;
	    if (DATE_REGEX.test(data.value)) values = values + '#' + data.value + '#';
	    else if (NUM_REGEX.test(data.value)) values = values + data.value + '';
		else values = values + '"' + data.value + '"';
	  }
    });
    names = names + ')';
    values = values + ')';
    // console.log(names + '->' + values)
    this.connection
    .execute('INSERT INTO ' + table + names + ' VALUES ' + values)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
	  return data;
    })
    .catch(error => {
      console.log(error);
    });
  },

  /**
   * Select All Rows
   *
    * @param {string} table
   */
  selectAll: function(table){
    this.connection
    .query('SELECT * FROM ' + table)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.log(error);
    });
  },

  /**
   * Select Rows Where
   *
   * @param {string} table
   * @param {object} where = {name:'UserName', value:'Newton'}
   */
  selectWhere: function(table, where){
    const NUM_REGEX = /^[0-9]/i;
    const DATE_REGEX = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/i;
    var query = '';
    if (DATE_REGEX.test(where.value) === true) query = 'SELECT * FROM ' + table + ' WHERE (((' + table + '.' + where.name + ')=#' + where.value + '#))';	  
    else if (NUM_REGEX.test(where.value) === true) query = 'SELECT * FROM ' + table + ' WHERE (((' + table + '.' + where.name + ')=' + where.value + '))';
    else query = 'SELECT * FROM ' + table + ' WHERE (((' + table + '.' +where.name + ')="' + where.value + '"))';
    this.connection
    .query(query)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.log(error);
    });
  },

  /**
   * Delete All Rows
   *
    * @param {string} table
   */
  deleteAll: function(table){
	  console.log(this.connection);
    this.connection
    .query('DELETE * FROM ' + table)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.log(error);
    });
  },

  /**
   * Delete Rows Where
   *
   * @param {string} table
   * @param {object} where = {name:'UserName', value:'Newton'}
   */
  deleteWhere: function(table, where){
    const NUM_REGEX = /^[0-9]/i;
    const DATE_REGEX = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/i;
    var query = '';
    if (DATE_REGEX.test(where.value) === true) query = 'DELETE * FROM ' + table + ' WHERE (((' + table + '.' + where.name + ')=#' + where.value + '#))';	  
    else if (NUM_REGEX.test(where.value) === true) query = 'DELETE * FROM ' + table + ' WHERE (((' + table + '.' + where.name + ')=' + where.value + '))';
    else query = 'DELETE * FROM ' + table + ' WHERE (((' + table + '.' +where.name + ')="' + where.value + '"))';
    this.connection
    .query(query)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.log(error);
    });
  },

  /**
   * Update Rows Where
   *
   * @param {string} table
   * @param {object} where = {name:'UserName', value:'Newton'}
   * @param {object} newValue = {name:'fecha', value:'10/10/17'}
   */
  updateWhere: function(table, where, newValue){
    const NUM_REGEX = /^[0-9]/i;
    const DATE_REGEX = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/i;
    var query = '';
    if (DATE_REGEX.test(newValue.value) === true) query = 'UPDATE ' + table + ' SET ' + table + '.' + newValue.name + '=#' + newValue.value + '#';
    else if (NUM_REGEX.test(newValue.value) === true) query = 'UPDATE ' + table + ' SET ' + table + '.' + newValue.name + '=' + newValue.value;
    else query = 'UPDATE ' + table + ' SET ' + table + '.' + newValue.name + '="' + newValue.value + '"';
    if (DATE_REGEX.test(where.value) === true) query = query + ' WHERE (((' + table + '.' + where.name + ')=#' + where.value + '#))';	  
    else if (NUM_REGEX.test(where.value) === true) query = query + ' WHERE (((' + table + '.' + where.name + ')=' + where.value + '))';
    else query = query + ' WHERE (((' + table + '.' +where.name + ')="' + where.value + '"))';
    this.connection
    .query(query)
    .then(data => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.log(error);
    });
  },
  
  /**
   * Change Structure
   *
   *@param {array} names = ["UserName", "UserSex", "UserAge", "fecha"]
   *@param {object} inData = [{
   *   "UserName": "Newton",
   *   "UserSex": "Male",
   *   "UserAge": 25,
   *   "fecha": "10/12/17"
   * },
   * {
   *   "UserName": "Lola",
   *   "UserSex": "Female",
   *   "UserAge": 30,
   *   "fecha": "10/12/17"
   * }]
   * 
   * @return {object} outData = {rows: [
   * vars:[
   *   {name:'UserName', value:'Newton'},
   *   {name:'UserSex', value:'Male'},
   *   {name:'UserAge', value:25},
   *   {name:'fecha', value:'10/12/17'}
   * ], vars:[
   *   {name:'UserName', value:'Lola'},
   *   {name:'UserSex', value:'Female'},
   *   {name:'UserAge', value:30},
   *   {name:'fecha', value:'10/12/17'}
   * ]
   *]}
   */
   changeObject: function(names, inData){
	   var result = {};
	   var vars = [];
	   var rows = [];
	   inData.map(function(data, index){
		   names.map(function(name, indexName){
			   vars.push({name: name, value: data[name]});
		   })
		   rows.push(vars);
		   vars = [];
	   })
	   result.rows = rows;
	   return result;
   }
}
