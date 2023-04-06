var qs = require('querystring');
var db = require('./db');
var template = require('./templates.js');

exports.home = function(request,response){
    db.query(`SELECT * FROM topic`,function(error,result){
        if (error){throw error;}
        var title = 'Welcome';
        var description = 'Add Your Bookmark';
        var list = template.list(result);
        var html = template.html(title,list,`<h2>${title}</h2><div class = "article">${description}</div>`,`
        <button type="button" class="w-btn w-btn-green" onclick="location.href =  '/create'">생성</button>`);
        
        response.writeHead(200);
        response.end(html);   
    });
}
exports.detail = function(request, response){
    var queryData = request.query
    var id = queryData.id
    db.query(`SELECT * FROM topic`,function(error,result){
        if (error){throw error;}
        db.query(`SELECT * FROM topic WHERE topic.id=?`,[id],function(error2,topic){
            if (error2){throw error;}
            var list = template.list(result);
            var html = template.html(topic[0].SiteName,list,`<h2>${topic[0].SiteName}</h2><a href="${topic[0].SiteUrl}">${topic[0].SiteUrl}</a></div>`,
            `<table>
            <tr>
                <td><button type="button" class="w-btn w-btn-green" onclick="location.href =  '/update?id=${id}'">수정</button></td>
                <td>
                    <form action="/delete_process" method="post">
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
exports.creat = function(request, response){
    db.query(`SELECT * FROM topic`,function(error,result){
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
exports.create_process = function(request,response){
    var post = request.body;
    var title = post.title;
    var description = post.description;
    db.query(`INSERT INTO topic (SiteName,SiteUrl,Date) VALUES (?,?,NOW())`,[title,description],function(error,result){
        if (error){throw error;}
        response.writeHead(302,{location: `/page/?id=${result.insertId}`});
        response.end();
    });

}
exports.update = function(request, response){
    var queryData = request.query
    var id = queryData.id
    db.query(`SELECT * FROM topic`,function(error,result){
        var list = template.list(result);
        db.query(`SELECT * FROM topic WHERE id=?`,[id],function(error,topic){
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
exports.update_process = function(request, response){

    var post = request.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    db.query(`UPDATE topic SET SiteName=?, SiteUrl=?, Date=NOW() WHERE id=?`,[title,description,id],function(error,result){
        response.writeHead(302,{location: `/page/?id=${id}`});
        response.end();
    });

}
exports.delete_process = function(request, response){
           
    var post = request.body
    var id = post.id;
    db.query(`DELETE FROM topic WHERE id=?`,[id],function(error,result){
        response.writeHead(302,{location: `/`});
        response.end();
    });
            
}