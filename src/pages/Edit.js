import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App.js";

import DiaryEditor from "../components/DiaryEditor.js";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);

  const diaryList = useContext(DiaryStateContext);
  console.log(diaryList); // 저장되어 있던 일기리스트 가져오기

  useEffect(() => {
    const targetDiary = diaryList.find(
      (it) => parseInt(it.id) === parseInt(id)
    );
    console.log(targetDiary);

    if (targetDiary) {
      setOriginData(targetDiary); // 원본 데이터를 targetDiary로 초기화
    } else {
      // undefined일 경우 (targetDiary가 없을 때)
      navigate("/", { replace: true });
    }
  }, [id, diaryList]); // id또는 diaryList갸 변하면 데이터 다시 가져오기
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
