import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// 필터기능을 할 컴포넌트
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  // (최신순, 오래된순)필터에 따른 정렬 다르게 하기
  const getProcessedDiaryList = () => {
    // sort를 사용하면 원본 배열 자체가 정렬되므로 원본 배열을 copy하여 정렬
    const copyList = JSON.parse(JSON.stringify(diaryList)); // 배열 => JSON 타입의 문자열로 변환 -> 배열로 복호화

    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    // 감정필터를 이용한 필터링
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 비교 함수
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); // 문자열이 들어올 수 있으므로 parseInt()로 숫자타입으로 변환
      } else if (sortType === "oldest") {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const sortedList = filteredList.sort(compare);
    return sortedList; // 정렬된 리스트 반환
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      <ControlMenu
        value={filter}
        onChange={setFilter}
        optionList={filterOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          {it.content} {it.emotion}
        </div>
      ))}
    </div>
  );
};

// diaryList가 props가 안될 경우를 대비
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
