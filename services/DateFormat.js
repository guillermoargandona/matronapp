export const formatDate = (date) => {
  if (date) {
    date = new Date(date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pad = "00";
    const monthFormat =
      pad.substring(0, pad.length - month.toString().length) + month;
    const dayFormat =
      pad.substring(0, pad.length - day.toString().length) + day;

    return dayFormat + "/" + monthFormat + "/" + year;
  }

  return "--/--/--";
};
