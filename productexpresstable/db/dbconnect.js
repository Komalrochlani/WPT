const mysql=require("mysql");

//create mysql connection
const mysqlcreateconnection=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"password",
    database:"test",
    port:3306
});
mysqlcreateconnection.connect((err)=>{
    if(err){
        console.log("Connection failed"+JSON.stringify(err))

    }else{
        console.log("connected to mysql")
    }
})


module.exports=mysqlcreateconnection;