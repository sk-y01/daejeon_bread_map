/**
 * 이미지 URL 생성
 * 
 * @description 서버에서 보내는 이미지 경로
 * @author      jjlee
 * @param {*}   image 
 * @returns 
 */
export const toImageUrl = (image) => {
  if (!image) return ''

  let fixed = String(image).replace(/\\/g, '/')

  if (/^https?:\/\//i.test(fixed)) {
    return fixed
  }

  if (!fixed.startsWith('/')) {
    fixed = `/${fixed}`
  }

  // 로컬 개발
  // return `${import.meta.env.VITE_LOCAL_URL}${fixed}`
  return `${import.meta.env.VITE_API_URL}${fixed}`
}