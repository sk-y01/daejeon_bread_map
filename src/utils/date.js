/**
 * toDate
 * 
 * @description 내부 공통 : 어떤 값이 들어와도 Date 객체로 변환
 * @param {*} input 
 * @returns { Date | Null }
 */
export const toDate = (input) => {
  if (!input & input !== 0) return null;

  // instanceof : obj instanceof Class
  // -> input이 Date 클래스의 객체인 지 확인
  // 아닐 경우, Date 객체로 변환
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/**
 * convertDateFormat
 * 
 * @description 날짜를 'YYYY.mm.dd' 형식으로 변환
 * @param {*} input 
 * @param {*} delimiter 기본 값 : . (Optional)
 * @returns { string } 'YYYY.mm.dd' 형식의 문자열
 */
export const convertDateFormat = (input, delimiter = '.') => {
  if (!input) return '';

  const date = new Date(input);
  
  if (isNaN(date.getTime())) {
    alert('시간에 맞지 않는 형식입니다. 다시 확인해주세요', input);

    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '00');
  const day = String(date.getDate()).padStart(2, '00');

  return [year, month, day].join(delimiter);
}