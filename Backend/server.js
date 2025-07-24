const express=require('express');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'@123',
    database:'todo'
})
db.connect((err)=>{
    if(err){
        console.log("Error while connecting!");
    }
    console.log("connected to the database");
})
app.get('/',(req,res)=>{
    console.log('default route');
    db.query(`select * from todoItems`,(err,result)=>{
        if(err){
            console.log("error while getting data")
        }
        console.log(result)
    res.send(result)
})
})
app.post('/addTask',(req,res)=>{
    console.log(req.body);
     db.query(`insert into todoItems(itemDesc) values('${req.body.text}')`,(err,result)=>{
        if(err){
            console.log('error occured');
            return
        }
        console.log("inserted successfully");   
    })
    res.send('task added') 
})
app.put('/editTask', (req, res) => {
  const { ID, itemDesc } = req.body;

  if (!ID || !itemDesc) {
    return res.status(400).json({ error: 'Missing ID or itemDesc' });
  }

  const query = `UPDATE todoItems SET itemDesc = ? WHERE ID = ?`;
  db.query(query, [itemDesc, ID], (err, result) => {
    if (err) {
      console.error("Error while updating:", err);
      return res.status(500).send('Internal Server Error');
    }

    console.log("Updated successfully");
    res.json({ success: true });
  });
});
app.delete('/deleteTask',(req,res)=>{
    db.query(`delete from todoItems where ID =('${req.body.ID}')`,(err,result)=>{
        if (err) {
      console.error("Error while deleting:", err);
      return res.status(500).send('Internal Server Error');
    }
        console.log("deleted successfully");
        res.send('task deleted');
    })
})
app.listen(3000,()=>{
    console.log('Server is started..');
})