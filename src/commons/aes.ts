/**
 * Created by jiangyukun on 2017/11/16.
 */

export default function getAes() {

  const time = new Date()

  const year = time.getFullYear()

  const mouth = time.getMonth() + 1

  const reallyMouth = mouth < 10 ? '0' + mouth : mouth

  const date = time.getDate()

  const reallyDate = date < 10 ? '0' + date : date

  const hour = time.getHours()

  const reallyHour = hour < 10 ? '0' + hour : hour

  const minute = time.getMinutes()

  const reallyMinute = minute < 10 ? '0' + minute : minute


  let info = 'lcsy_' + year + reallyMouth + reallyDate + reallyHour + reallyMinute


////////////////////////////////////////////////aes 加密

  let plaintText = info

  let key = CryptoJS.enc.Utf8.parse("6b6062e5b57586998c1469bc77916aaa")

  let options = {
    iv: CryptoJS.enc.Utf8.parse("0000000000000000"),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }

  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, options)

  return encodeURIComponent(encryptedData.toString())

}