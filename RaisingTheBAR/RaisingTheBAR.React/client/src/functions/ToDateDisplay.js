import moment from 'moment'

export default function ToDateDisplay(oldDate) {
  var newDate = moment(oldDate, "YYYY-MM-DDTHH:mm:ss.SZ").format("YYYY-MM-DD HH:mm");
  return newDate;
}