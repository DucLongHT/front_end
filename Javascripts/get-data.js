var exam_list = JSON.parse(localStorage.getItem("exam_list"));

if (exam_list === null) {
  exam_list = []; // Tạo một mảng exam_list mới nếu exam_list là null
}
var users = JSON.parse(localStorage.getItem("users"));
if (users === null) {
  users = [
    {
      id: 1234567891011,
      username: "admin",
      password: "111",
    },
  ]; // Tạo một mảng exam_list mới nếu exam_list là null
}

function getStatus(date) {
  const today = formatDate(new Date());
  if (date < today) {
    return -1;
  } else if (date === today) {
    return 0;
  } else {
    return 1;
  }
}
function formatDate(date) {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
