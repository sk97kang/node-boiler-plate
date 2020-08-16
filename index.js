// express module을 가져옴
const express = require("express");
// express app을 만듬
const app = express();
// 5000번 포트 사용
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

// application/x-www-form-urlencoded => 분석해서 가져올 수 있게함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json => 분석해서 가져올 수 있게함
app.use(bodyParser.json());

// mongoDB 연결을 해주는 라이브러리
const mongoose = require("mongoose");

// mongoDB 연결
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// "/" 디렉토리에 오면 "Hello Word!"를 출력함
app.get("/", (req, res) => {
  res.send("Hello World! Node");
});

app.post("/register", (req, res) => {
  // 회원 가입 할때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    else res.status(200).json({ success: true });
  });
});

// port 5000 으로 app을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
