const DiaryList = ({ diaryList }) => {
  return (
    <div>
      {diaryList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

// diaryList가 props가 안될 경우를 대비
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
