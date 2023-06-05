const express=require("express");
const router=express.Router();
const connection=require("../db/dbconnect");

router.get("/products",function(req,resp){
    console.log("in product")
    
    connection.query("select * from product",(err,data,fields)=>{
        if(err){
            console.log("in if statement")
            resp.status(500).send("Data not found"+JSON.stringify(err))
        }else{
            console.log(data)
            resp.render("index",{prodata:data})
        }
    })
})

router.get("/displayAddForm",function(req,resp){
    resp.render("add-pro")
    //resp.render("update-pro")
});

router.post("/insertProduct",function(req,resp){
    var pid=req.body.pid;
    var pname=req.body.pname;
    var price=req.body.price;
    var qty=req.body.qty;
    connection.query("insert into product values(?,?,?,?)",[pid,pname,price,qty],(err,result)=>{
        if(err){
            resp.status(500).send("Data not found"+JSON.stringify(err))
        }else{
            resp.redirect("/products")
        }
    })
})

router.get("/edit/:pid",function(req,resp){
    connection.query("select * from product where pid=?",[req.params.pid],(err,data,fields)=>{
        console.log(data)
        if(err){
            resp.status(500).send("Data not found"+JSON.stringify(err))
        }else{
            resp.render("update-pro",{prodata:data[0]})
        }
    })
    
})

router.post("/updateProduct",function(req,resp){
    var pid=req.body.pid;
    var pname=req.body.pname;
    var price=req.body.price;
    var qty=req.body.qty;
    connection.query("update product set pname=?,price=?,qty=? where pid=?",[pname,price,qty,pid],(err,result)=>{
        if(err){
            resp.status(500).send("Data not found"+JSON.stringify(err))
        }else{
            resp.redirect("/products")
        }
        
    }) 
})

router.get("/delete/:pid",function(req,resp){
    //var flag=confirm("Are your Sure you want to delete?")
    //if(flag){
    connection.query("delete from product where pid=?",[req.params.pid],(err,result)=>{   
            if(err){
                resp.status(500).send("Data not found"+JSON.stringify(err))
            }else{
                resp.redirect("/products")
            }
        })
    //}
})

module.exports=router;