
var template = {
    html:function(title,list,body, control){
        return `
        <!doctype html>
        <html>
        <head>
        <title>Bookmark - ${title}</title>
        <meta charset="utf-8">
        <style>
            @import url(https://fonts.googleapis.com/css?family=Lato:400,300,700,900);
            *, *:after, *:before {
                box-sizing: border-box;
            }
            a:hover, a:focus {
                outline: none;
            }
            .back {
                padding: 50px 0 150px 0;
            }
            body * {
                font-family: Lato !important;
            }
            .menu a {
                color:black;
                font-family: Lato;
                font-size: 17pt;
                font-weight: 400;
                padding: 15px 25px;
                /**/
                position: relative;
                display: block;
                text-decoration: none;
                text-transform: uppercase;
            }
            .SMN_effect-6 a {
                padding: 10px 0;
                border-top: 1px solid rgba(255, 255, 255, 0.3);
            }
            
            .SMN_effect-6 a:before {
                position: absolute;
                top: 0;
                left: 0;
                overflow: hidden;
                padding: 10px 0;
                max-width: 0;
                border-bottom: 2px solid #c8a755;
                color: rgb(29, 184, 133);
                content: attr(data-hover);
                transition: max-width 0.5s;
            }
            
            .SMN_effect-6 a:hover:before, .SMN_effect-6 a:focus:before {
                max-width: 100%;
            }
            #root {
                margin:auto;
                width:800px;
                height:800px;
            }
            button {
                margin: 20px;
            }
            
            .w-btn {
                position: relative;
                border: none;
                display: inline-block;
                padding: 10px 20px;
                border-radius: 15px;
                font-family: "paybooc-Light", sans-serif;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                text-decoration: none;
                font-weight: 600;
                transition: 0.25s;
            }
            .w-btn-green {
                background-color: #77af9c;
                color: #d7fff1;
            }
              
            h1 {
                color:black;
                font-size: 28px;
                font-weight: 500;
                letter-spacing: 0;
                line-height: 1.5em;
                padding-bottom: 15px;
                position: relative;
              }
            a:link ,a:hover, a:visited{
                color:black;
            }
            h1:before {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                height: 5px;
                width: 55px;
                background-color: #111;
              }
            h1:after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 2px;
                height: 1px;
                width: 100%;
                max-width: 255px;
                background-color: #333;
              }
            
            #top{
                padding-top:15px;
            }
            #list{
                width:20%;
                height:300px;
                float:left;
                text-align:left
            }
            #con{
                width:80%;
                height:300px;
                float:left;
                text-align:center;
            }
            form input {
                  flex: 1 1 10ch;
                  margin: .5rem;
            }
            form textarea {
                    flex: 3 1 30ch;
            }
            input, textarea {
                border: none;
                background: hsl(0 0% 93%);
                border-radius: .25rem;
                padding: .75rem 1rem;
              }

              
        </style>
        </head>
        <body id="root">
        <h1 id="top"><a href="/">Bookmark</a></h1>
            <div id="list">
            ${list}
            </div>

            <div id="con">
            ${body}
        
            ${control}
            </div>
        </body>
        </html>
        `;
    },
    list:function(topic){
        var list = '<div class="back color-6"><div class="row columns"><ul class="menu align-center expanded text-center SMN_effect-6">';
        for(var i = 0 ; i < topic.length;i++){
            list += `<li ><a href = "/?id=${topic[i].id}" data-hover="${topic[i].SiteName}">${topic[i].SiteName}</a></li>`
        }
    
        list = list + '</ul></div></div>';
        return list;
    },
}

module.exports = template;