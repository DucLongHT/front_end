const idExam = window.location.href.split("?id=")[1];
console.log(idExam);
function getExamById(id) {
  return exam_list.find(function (exam) {
    return parseInt(exam.id) === parseInt(id);
  });
}
function getDetailExam(data) {
  var html = "";

  html += `
            <tr class="align-middle">
                    <td>${data.name_exam}</td>
                    <td>${data.subject}</td>
                    <td>${data.type}</td>
                    <td>${data.class_exam}</td>
                    <td><span class="f-f-BeVietNam-Bold">${
                      data.time_exam
                    } phút</span></td>
                    <td>
                        <span class="f-f-BeVietNam-Bold">${
                          data.time_start
                        }</span>
                    </td>
                    <td> ${convertStatusToText(data.status)}</td>
                    <td class="text-center">
                        <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#editExamModal" style="cursor: pointer;"></i>
                        
                        </i>
                    </td>
                </tr>
            `;
  $("#detail_exam").html(html);
}
getDetailExam(getExamById(idExam));
function convertStatusToText(status) {
  if (status == 1) return "Chưa bắt đầu";
  else if (status == 0) return "Đang diễn ra";
  else return "Đã kết thúc";
}

// Hàm sửa đề thi
$("#editExam").on("click", () => {
  var fields = [
    "name_exam",
    "subject",
    "type",
    "class_exam",
    "time_exam",
    "time_start",
  ];
  var isValid = true;

  fields.forEach((field) => {
    var value = $("#" + field).val();
    if (!validateAddExam(value)) {
      $(".mess_" + field).show();
      isValid = false;
    } else {
      $(".mess_" + field).hide();
    }
  });
  if (isValid) {
    var exam = getExamById(idExam);

    exam.name_exam = $("#name_exam").val();
    exam.subject = $("#subject").val();
    exam.type = $("#type").val();
    exam.class_exam = $("#class_exam").val();
    exam.time_exam = $("#time_exam").val();
    exam.time_start = $("#time_start").val();
    exam.status = getStatus(exam.time_start); // Gán giá trị status dựa trên time_start
    // Thêm đối tượng exam vào danh sách exam_list

    // Kiểm tra giá trị đã được lấy và gán vào đối tượng exam và danh sách exam_list
    // console.log(exam_list);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sửa kì thi thành công",
      showConfirmButton: true,
      // timer: 1500
    }).then((result) => {
      localStorage.setItem("exam_list", JSON.stringify(exam_list)); // Lưu danh sách exam_list vào localStorage
      window.location.reload();
    });
  }
});
function getListQuetions(data) {
  var html = "";
  data.questions.forEach((element, index) => {
    html += `
    <div class="col-10 mt-3">
          <div class="f-f-BeVietNam-Bold">Câu ${index + 1}: ${
      element.question
    }</div>
          `;
    element.options.forEach((option, index) => {
      html += `
            <div class="mt-1 ${getAnswerText(
              index,
              element.answer
            )}">A. ${option}</div>
            `;
    });
    html += `
      </div>
      <div class="col-2 d-flex justify-content-center align-items-center f-s-24">
          <i class="fa-solid fa-trash" onclick ="deleteQuetion(${index})" style="cursor: pointer;">
          </i>
      </div>
    `;
  });
  $("#question_list").html(html);
}
getListQuetions(getExamById(idExam));
function deleteQuetion(questionIndex) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Bạn có muốn xóa câu hỏi không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Xóa câu hỏi từ mảng exam.questions
        getExamById(idExam).questions.splice(questionIndex - 1, 1);
        // Xóa câu hỏi khỏi giao diện
        getListQuetions(getExamById(idExam));
        localStorage.setItem("exam_list", JSON.stringify(exam_list)); // Lưu danh sách exam_list vào localStorage
      }
    });
}
function getAnswerText(value1, value2) {
  if (value1 == parseInt(value2)) {
    return "text-success f-f-BeVietNam-Bold";
  }
  return "";
}
function validateAddExam(value) {
  if (value != "") {
    return true;
  }
  return false;
}
