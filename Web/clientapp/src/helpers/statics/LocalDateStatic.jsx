const formatter=new Intl.DateTimeFormat('prs-AF',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});
const getDayName=(date)=>formatter.formatToParts(Date.parse(date))[6].value;
const getDate=(date)=>formatter.formatToParts(Date.parse(date))[4].value;
const getMonthName=(date)=>formatter.formatToParts(Date.parse(date))[2].value
const getYear=(date)=>formatter.formatToParts(Date.parse(date))[0].value;
const LocalDateStatic={
    fullDate:(date)=>`${getDayName(date)} ${getDate(date)} ${getMonthName(date)} ${getYear(date)}`,
    getYear:(date)=>getYear(date),
    getDayName:(date)=>getDayName(date),
    getDate:(date)=>getDate(date),
    getMonthName:(date)=>getMonthName(date)
}
export default LocalDateStatic;