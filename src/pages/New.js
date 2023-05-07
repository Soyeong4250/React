import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

// 날짜 변환 함수
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); // YYYY-MM-DDTHH:mm:ss.sssZ
};

const New = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date())); // 오늘 날짜를 기본값으로
  console.log(getStringDate(new Date())); // 날짜가 올바른 형식으로 출력되는지 확인

  return (
    <div>
      <MyHeader
        headText={"새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)} />
        }
      />
      <h1>New</h1>
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default New;
