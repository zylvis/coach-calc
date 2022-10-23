const FormatDateTOYYYYMMDD = (date: Date):string => {

var year = date.toLocaleString("default", { year: "numeric" });
var month = date.toLocaleString("default", { month: "2-digit" });
var day = date.toLocaleString("default", { day: "2-digit" });

return year + "-" +  month + "-" + day;
}
export default FormatDateTOYYYYMMDD;