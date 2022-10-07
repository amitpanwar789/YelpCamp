const c = require("crypto");
const fs = require("fs");
const start = Date.now();
process.env.UV_TREADPOOL_SIZE = 4;


function hash(){  c.pbkdf2('a','b' , 100000, 512,'sha512' , ()=>{
    console.log(Date.now() - start);
})}

fs.readFile('test.js',()=>{
    console.log("fs" , Date.now() - start);
})
hash()
hash()
hash()
hash()
hash()



