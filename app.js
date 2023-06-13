const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const userroute=require('./routes/user')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(userroute);

app.use('/', (req, res, next) => {
    const content = fs.readFileSync(path.join(__dirname, 'message.txt')).toString();
    console.log(content);
    //since we need to keep dynamic content to this file we can sendFile directly, we need to do .send() or use EJS
    //res.sendFile(path.join(__dirname,'views','message.html')); 
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message</title>
    </head>
    <body>
        <p id="ans">No chat exist</p>
        <form method="post" action="/savechat">
            <input type="text" name="username" id="uid" hidden>
            <label for="msg">Message</label>
            <br>
            <input type="text" name="message" id="msg">
            <button type="submit" id="btn">send</button>
        </form>
        <script>
        document.getElementById('btn').addEventListener("click",(e)=>{
            document.getElementById('uid').value=localStorage.getItem("username");
        })
        document.getElementById('ans').innerText=${JSON.stringify(content)};
    </script>
    
</body>
</html>`);
});
app.listen(3000);