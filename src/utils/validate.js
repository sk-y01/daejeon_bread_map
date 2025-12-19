/**
 * validate.js
 * 
 * @description 공통 이메일 및 기타 검증 정규식
 */
// 이메일 정규식
const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// 패스워드 정규식
const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/

/**
 * 이메일 검증
 * 
 * @param   { string } email     검증할 이메일
 * @returns { object } { isValid: boolean, errorMessage: string }
 */
export const validationEmail = (email) => {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      errorMessage: '이메일을 입력해주세요.'
    }
  }

  if (!emailReg.test(email)) {
    return {
      isValid: false,
      errorMessage: '올바른 이메일 형식이 아닙니다. 다시 입력해주세요.'
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}

/**
 * 비밀번호 검증
 * 
 * @param   { string } password     검증할 패스워드
 * @returns { object } { isValid: boolean, errorMessage: string }
 */
export const validationPassword = (password) => {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      errorMessage: '비밀번호를 입력해주세요.'
    }
  }

  if (!passwordReg.test(password)) {
    return {
      isValid: false,
      errorMessage: '영문, 숫자, 특수문자 조합 8자 이상 15자 이하로 입력해주세요.'
    }
  }

  return {
    isValid: true,
    errorMessage: ''
  }
}