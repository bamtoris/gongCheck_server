const express = require('express');
const app = express();

const mysql = require('mysql');

const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1234',
    database: 'gongcheck'
});

app.listen(3001, () => {
    console.log('server is running on port 3001');
});


// 마이페이지 -> 체크리스트 생성
app.post('/createChecklist', (req, res) => {
    // const id = req.body.checklist_id;
    // const name = req.body.checklist_name;
    // const title = req.body.checklist_title;
    // const list = req.body.checklist_list;

    db.query('insert into checklist'+ ' values (null, ?, ?, null);',
    ['daniel', "제목없음"],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send('A new post created')
    });
});

// 마이페이지 -> 내 체크리스트 불러오기
app.post('/getMyChecklist', (req, res) => {
    db.query('SELECT * FROM gongcheck.user inner join gongcheck.checklist on user.user_name = checklist.user_name where checklist.user_name = ?;',
    ['daniel'],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send(result);
    });
});

// 체크리스트 업데이트하기
app.put('/updateChecklist', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const list = req.body.list;

    db.query("UPDATE gongcheck.checklist set checklist_title=?, checklist_list=? WHERE checklist_id = ?",
    [title, list, id],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send(result);
    });
})


// 커뮤니티 글 쓰기
app.post('/createPost', (req, res) => {
    const title = req.body.title;
    const writing = req.body.writing;
    
    db.query('insert into posts'+' values (null, ?, ?, ?, null);',
    ['daniel', title, writing],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send('A new post created')
    });

});

app.post('/createPost_checklist', (req, res) => {
    const title = req.body.title;
    const writing = req.body.writing;
    const checklist_id = req.body.checklist_id;
    
    db.query('insert into posts'+ ' values (null, ?, ?, ?, ?);',
    ['daniel', title, writing, checklist_id],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send('A new post created')
    });
});


// 커뮤니티 전체 글 출력
app.get('/printPost', (req, res) => {
    db.query('SELECT * FROM gongcheck.posts;',
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send(result);
    });
});

// checklist id에 맞는 체크리스트 불러오기
app.post('/getChecklistById', (req, res) =>{
    const id = req.body.id;
    db.query('SELECT * FROM gongcheck.checklist WHERE checklist.checklist_id = ?;',
    [id],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send(result);
    });
});

// 커뮤니티 글 - checklist 가져가기
app.post('/clippingChecklist', (req, res) => {
    const title = req.body.title;
    const list = req.body.list;
    
    db.query('insert into checklist'+ ' values (null, ?, ?, ?);',
    ['daniel', title, list],
    (err, result) => {
        if(err)
            console.log(err);
        else
            res.send('체크리스트 가져가기 성공');
    });
});