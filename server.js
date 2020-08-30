var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const assert = require('assert');
var path = require('path');
const data_per_page = 18;
const fs = require('fs');

app.get('/', function (req, res) {
    res.send('Hello World');
 })
 
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
// Getting Employees Contact Details
app.post('/getEmployeeDetails', function(req, res){
   let resultArray = {};
   let employeeData = [];
   let filteredObj = [];
   var obj = require("./db/employeedata.json");
   
   filteredObj = obj.filter(function(data){
      return req.body.company_name == data.company;
   })
   let page_no = req.body.page_no;
   let arrayStart = (page_no - 1) * data_per_page;
   let arrayendTemp = (page_no) * data_per_page;
   let totalNumber = filteredObj.length;
   // let arrayend = (page_no) * data_per_page;
   let arrayend = (page_no > Math.floor(totalNumber/data_per_page)) ? (arrayStart + totalNumber%data_per_page) : arrayendTemp ;;
   let totalPages = Math.ceil(filteredObj.length/data_per_page);

   if(req.body.jsonLen)
   {
      resultArray["length"] = filteredObj.length;
      resultArray["page_no"] = page_no;
   //  resultArray.push({"length": filteredObj.length});
   }

   if(req.body.page_no)
   {
       for(let i= arrayStart; i< arrayend;i++){
           employeeData.push(filteredObj[i]);
           if(i+1 == arrayend)
           {
            // resultArray.push(employeeData);
            // resultArray.push(totalPages);
            resultArray["employee_data"] = employeeData;
            resultArray["total_pages"] = totalPages;
            res.send(resultArray);
            res.end();
           }
       }
    
   }   
 });
// Ending Employees Contact Details
// Getting Company Details
app.post('/getCompanyDetails', function(req, res){
    let resultArray = [];
    let companyData = [];
    var obj = require("./db/company.json");
    resultArray.push(obj[0]);
    res.send(resultArray);
    res.end();
      
  });
  
// Getting Employees Contact Details
// Getting search details
app.post('/getSearchDetails', function(req, res){
   let resultArray = {};
   let employeeData = [];
   let filteredObj = [];
   var obj = require("./db/employeedata.json");

   filteredObj = obj.filter(function(data){
       if(data.first_name.toLowerCase().includes(req.body.key) || data.last_name.toLowerCase().includes(req.body.key) || data.job_role.toLowerCase().includes(req.body.key) ){
         return data;
       }
   })
   let page_no = req.body.page_no;
   let arrayStart = (page_no - 1) * data_per_page;
   let arrayendTemp = (page_no) * data_per_page;
   let totalNumber = filteredObj.length;
   let totalPages = Math.ceil(filteredObj.length/data_per_page);

   let arrayend = (page_no > Math.floor(totalNumber/data_per_page)) ? (arrayStart + totalNumber%data_per_page) : arrayendTemp ;
   console.log(arrayend);
   if(req.body.length)
   {
      resultArray["length"] = filteredObj.length;
      resultArray["page_no"] = page_no;
      resultArray["total_pages"] = totalPages;
      // resultArray.push({'length' : filteredObj.length});
   }
   if(req.body.page_no)
   {
       for(let i= arrayStart; i< arrayend;i++){
           employeeData.push(filteredObj[i]);
           if(i+1 == arrayend)
           {
            resultArray["employee_data"] = employeeData;
            res.send(resultArray);
            res.end();
           }
       }
    
   } 
     
 });

 // Getting reveal details
app.post('/updatereveal', function(req, res){
   let resultArray = {};
   let employeeData = [];
   let filteredObj = [];
   var obj = require("./db/employeedata.json");
   let e_id = req.body.e_id;
   let updatedObj = obj.map((data) => {
      if(data.e_id == e_id){
         data.reveal = 1;
      }
      return data;
   })
   fs.writeFile("./db/employeedata.json", JSON.stringify(updatedObj), function(){
      res.send('done');
      res.end();
   });


   
     
 });

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })