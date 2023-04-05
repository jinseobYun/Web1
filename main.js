var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var template = require('./lib/templates');
const mysql = require('mysql');  // mysql 모듈 로드
const conn = mysql.createConnection({  // mysql 접속 설정
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'bookmark'
});
conn.connect();

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var id = queryData.get('id')
    var pathname = new URL('http://localhost:3000' + _url).pathname;
    
    if (pathname === '/'){
        if(id === null){
            
            conn.query(`SELECT * FROM topic`,function(error,result){
                if (error){throw error;}
                var title = 'Welcome';
                var description = 'Add Your Bookmark';
                var list = template.list(result);
                var html = template.html(title,list,`<h2>${title}</h2><div class = "article">${description}</div>`,`
                <button type="button" class="w-btn w-btn-green" onclick="location.href =  '/create'">생성</button>`);
                
                response.writeHead(200);
                response.end(html);   
            });
        }else {
            conn.query(`SELECT * FROM topic`,function(error,result){
                if (error){throw error;}
                conn.query(`SELECT * FROM topic WHERE topic.id=?`,[id],function(error2,topic){
                    if (error2){throw error;}
                    var list = template.list(result);
                    var html = template.html(topic[0].SiteName,list,`<h2>${topic[0].SiteName}</h2><a href="${topic[0].SiteUrl}">${topic[0].SiteUrl}</a></div>`,
                    `<table>
                    <tr>
                        <td><button type="button" class="w-btn w-btn-green" onclick="location.href =  '/update?id=${id}'">수정</button></td>
                        <td>
                            <form action="delete_process" method="post">
                                <input type="hidden" name="id" value="${id}">
                                <input type="submit" class="w-btn w-btn-green" value="삭제">
                            </form>
                        </td>
                    </tr>
                    </table>`);
                    
                    response.writeHead(200);
                    response.end(html);
                });
            }); 
        }
    }else if(pathname ==='/create'){
        conn.query(`SELECT * FROM topic`,function(error,result){
            if (error){throw error;}
            var title = 'create';
            var list = template.list(result);
            var html = template.html(title,list,`
            <form
            action="/create_process" method="post">
            <p><input type="text" name="title" placeholder = "SITE NAME"></p>
            <p>
            <textarea name="description" placeholder="URL">http://</textarea></p>
            <p>
            <input type="submit" class="w-btn w-btn-green">
            </p>
            `,`<p></p>`);
            
            response.writeHead(200);
            response.end(html);  
        });
    }
    else if(pathname === '/create_process'){
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            conn.query(`INSERT INTO topic (SiteName,SiteUrl,Date) VALUES (?,?,NOW())`,[title,description],function(error,result){
                if (error){throw error;}
                response.writeHead(302,{location: `/?id=${result.insertId}`});
                response.end();
            });
        });
    }
    else if(pathname==='/update'){
        conn.query(`SELECT * FROM topic`,function(error,result){
            var list = template.list(result);
            conn.query(`SELECT * FROM topic WHERE id=?`,[id],function(error,topic){
                var html = template.html(topic[0].SiteName,list,`
                <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <p><input type="text" name="title" placeholder = "SITE NAME" value = "${topic[0].SiteName}"></p>
                <p>
                <textarea name="description" placeholder="URL">${topic[0].SiteUrl}</textarea></p>
                <p>
                <input type="submit" class = "w-btn w-btn-green">
                </p>`,"")
                response.writeHead(200);
                response.end(html);
            });
        });
    }
    else if(pathname === '/update_process'){
        var body = '';
        request.on('data',function(data){
            body += data;
        });
        request.on('end',function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            conn.query(`UPDATE topic SET SiteName=?, SiteUrl=?, Date=NOW() WHERE id=?`,[title,description,id],function(error,result){
                response.writeHead(302,{location: `/?id=${id}`});
                response.end();
            });
        });
        }
        else if(pathname === '/delete_process'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                var post = qs.parse(body);
                var id = post.id;
                conn.query(`DELETE FROM topic WHERE id=?`,[id],function(error,result){
                    response.writeHead(302,{location: `/`});
                    response.end();
                });
            });
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
    
    

 
});
app.listen(3000);   