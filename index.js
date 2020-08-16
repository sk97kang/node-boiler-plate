// express module을 가져옴
const express = require("express");
// express app을 만듬
const app = express();
// 5000번 포트 사용
const port = 5000;

// mongoDB 연결을 해주는 라이브러리
const mongoose = require("mongoose");
// mongoDB 연결
mongoose
  .connect(
    "mongodb+srv://test:test@boilerplate.obdyb.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// "/" 디렉토리에 오면 "Hello Word!"를 출력함
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// port 5000 으로 app을 실행
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
