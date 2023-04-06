const express = require('express');
const app = express();
const bodyparser = require('body-parser');
var page = require('./lib/page');

app.use(express.static('public'));

app.use(bodyparser.urlencoded({ extended: false}));

app.get('/',function(request,response){
    page.home(request,response);
});

app.get('/page',function(request,response){
    page.detail(request,response);
});
app.get('/create',function(request,response){
    page.creat(request,response);
});
app.post('/create_process',function(request,response){
    page.create_process(request,response);
});
app.get('/update',function(request,response){
    page.update(request, response);
});
app.post('/update_process',function(request,response){
    page.update_process(request, response);
});
app.post('/delete_process',function(request,response){
    page.delete_process(request, response);
});
app.listen(3000)