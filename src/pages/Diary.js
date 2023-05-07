import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { DiaryStateContext } from "../App.js";

const Diary = () => {
  const { id } = useParams();
  console.log(id);

  const diaryList = useContext(DiaryStateContext); // 저장된 일기 원본 데이터 가져오기

  const navigate = useNavigate();

  const [data, setData] = useState();
  useEffect(() => {
    const targetDiary = diaryList.find(
      (it) => parseInt(it.id) === parseInt(id)
    );
    console.log(targetDiary);

    // 존재하지 않는 일기의 접근 처리
    if (targetDiary) {
    } else {
      alert("존재하지 않는 일기입니다.");
      navigate("/", { repalce: true });
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className="DiaryPage">로딩중입니다 :)</div>;
  } else {
    return <div className="DiaryPage"></div>;
  }
};

export default Diary;
