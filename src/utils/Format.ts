/** timestamp型「yyyy-MM-ddTHH:mm」を「yyyy/MM/dd HH:mm」に変換 */
export const datetimeFormat = (timestamp: string): string => {
  const datetime = new Date(timestamp);
  const yyyy = `${datetime.getFullYear()}`;
  const MM = `0${datetime.getMonth() + 1}`.slice(-2);
  const dd = `0${datetime.getDate()}`.slice(-2);
  const HH = `0${datetime.getHours()}`.slice(-2);
  const mm = `0${datetime.getMinutes()}`.slice(-2);
  // const ss = `0${datetime.getSeconds()}`.slice(-2);
  return yyyy + "/" + MM + "/" + dd + " " + HH + ":" + mm;
}
