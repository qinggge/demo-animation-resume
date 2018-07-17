/* 把code写到#code和style标签里 */
var result = `/*
 * 你好
 * 这是我的一个简历作品
 * 希望你会喜欢
 * 请耐心观看
 */

*{
    transition: all 1s;
}
html{
    background: rgb(222,222,222);
    font-size: 16px;
}
#code{
    border: 1px solid black;
    box-shadow: 10px 10px 5px #888888;
    padding: 16px;
}

/* 是不是代码不太美观？
现在加上代码高亮。 */


#code{
    background: #1E1E1E;
    color: #CE9178;
}
.token.selector{
    color: #A8BA7D;
}
.token.property{
    color: #9CDCF1;
}
.token.function{
    color: #C4DCAA;
}
.token.comment{
    color: #5D874C;
}

/* 接下来进入正题。
我需要一张纸。 */

#code{
    position: fixed;
    left: 0;
    margin: 16px;
    width: 45%;
    height: 90%;
}
#paper{
    position: fixed;
    right: 0;
    margin: 16px;
    background: #1e1e1e;
    width: 45%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
#paper .content{
    height: 100%;
    width: 100%;
    overflow: auto;
}
`

var result2 = `
#paper{
    color: white;
    border: 1px solid black;
    box-shadow: 10px 10px 5px #888888;
}

/*
 * 话不多说
 * 接下来进入正题
 * 自我介绍！
 */

`

var md = `
# 自我介绍

我叫朱煌
生日1994年10月
毕业于湖南工业大学
自学前端 工作两年
希望应聘前端开发岗位

# 技能介绍

熟悉HTML5 CSS3
熟悉JavaScript
熟悉Vue.js React.js

# 项目介绍

1. Canvas画板
2. 此份简历
3. Vue.js在线简历编辑器

# 联系方式

QQ： 308932172
Email： me@zhuhuang.me
Tel： 13923619097
`

var result3 =  `/*
 * markdown语法好像不太好看
 * 没关系 现在就让它更美观
 * …………
 * …………
 * …………
 * …………
 * 变！
 */

`

var result4 =  `/*
 * 调整一下markdown的样式
 */

 .content > h1{
    color: #9CDCF1;
    border-bottom: 1px solid white;
    padding: 0px 0px 16px 0px;
 }
 .content > p{
    padding: 0px 0px 8px 0px;
 }
 .content > p > a{
    color: #A8BA7D;
 }
`


writeCode('', result, ()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                writeCode(result+result2,result3,()=>{
                    changeMarkdown(()=>{
                        writeCode(result+result2+result3,result4,()=>{

                        })
                    })
                })
            })
        })
    })
})

function writeCode(prefix, code, fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval( () => {
        n += 1
        domCode.innerHTML =  Prism.highlight(prefix + code.substring(0,n),Prism.languages.css, 'css')
        styleTag.innerHTML = prefix + code.substring(0,n)
        domCode.scrollTop = domCode.scrollHeight
        if(n >= code.length){
          window.clearInterval(id)
          fn.call()
        }
    },30) 
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval( () => {
        n += 1
        domPaper.innerHTML =  markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(id)
            fn.call()
        }
    },30) 
}

function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = 'paper'
    var content = document.createElement('pre')
    content.className = 'content'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}

function changeMarkdown(fn){
    var markdown = document.querySelector('#paper>.content')
    markdown.innerHTML = marked(md)
    fn.call()
}