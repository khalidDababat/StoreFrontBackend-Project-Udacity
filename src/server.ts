import express ,{Request ,Response} from "express";


//Application Object
const app =express(); 
const port:string ="4000"; 




app.get('/', (req :Request,res:Response)=>{
      res.send("hello World");
});

app.listen(port ,()=>{
  console.log(`running server on http://localhost:${port}`);
});


