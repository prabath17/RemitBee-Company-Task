const express = require('express');
const db = require('./config/db.js');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Server running on port 3000'));

// get

app.get('/student', (req, res) => {
  const query = 'SELECT * FROM student';
  db.query(query, (err, results) => {
    if (err) {
      
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.status(200).json(results);
  });
});

// post

app.post('/student',(req,res)=>{
  const{name,age,dept}=req.body;
  const query=`INSERT INTO student (name,age,dept) VALUES (?,?,?)`;

  db.query(query,[name,age,dept],(err,results)=>{
    if(err){
     
      return res.status(500).json({ error: 'Database insertion failed' });
    }
    res.status(201).json({ message: 'Student added successfully' });
});
});

// put 

app.put('/student/:id',(req,res)=>{
  const{id}=req.params;
  const{age,dept}=req.body;
  const query=`UPDATE student SET  age=?, dept=? WHERE id=?`;
  db.query(query,[age,dept,id],(err,results)=>{
    if(err){
      
      return res.status(500).json({ error: 'Database update failed' });
    }
    res.status(200).json({ message: 'Student updated successfully' });
  });
});

// delete

app.delete('/student/:id',(req,res)=>{
  const{id}=req.params;
  const query=`DELETE FROM student WHERE id=?`;
  db.query(query,[id],(err,results)=>{
    if(err){
      
      return res.status(500).json({ error: 'Database deletion failed' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  });
});

