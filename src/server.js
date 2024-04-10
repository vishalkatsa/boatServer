const express = require("express");
const router = require("./Router/index")
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json());



// app.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('<h1>Vishal Kumar</h1>');
// })

app.use("/api",router)
app.use('/uploads', express.static('uploads'));

app.listen(4000, () => {
    console.log(`Server Port is : ${4000}`);
})


