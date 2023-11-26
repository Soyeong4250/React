// 날짜 변환 함수
export const getStringDate = (date: Date): string => {
  return date.toISOString().slice(0, 10); // YYYY-MM-DDTHH:mm:ss.sssZ
};
