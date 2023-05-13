import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";
import { getStringDate } from "../util/Date.js";
import { emotionList } from "../util/Emotion.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { useEffect } from "react";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date())); // 오늘 날짜를 기본값으로
  console.log(getStringDate(new Date())); // 날짜가 올바른 형식으로 출력되는지 확인

  const [emotion, setEmotion] = useState(3); // 어떤 감정을 선택했는지 저장하는 state

  // 감정 클릭 시 state 변경하는 로직
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  // 텍스트 저장을 위한 state
  const [content, setContent] = useState("");
  // 공란인 상태로 다음 단계로 넘어가고자 할 때 포커스를 위한 레퍼런스
  const contentRef = useRef();

  // 작성완료를 위한 함수
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 수정하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate("/", { replace: true }); // 일기 작성하기를 뒤로가기로 다시 못돌아오게 하기 위해 replace 옵션을 true로 설정
  };

  // 수정 페이지에서 활용
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로 가기"} onClick={() => navigate(-1)} />
        }
      />
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
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              // <div key={it.emotion_id}>{it.emotion_descript}</div>
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton
              text={"취소하기"}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
