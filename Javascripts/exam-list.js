var exam_list = [];
$("#add_question").click(() => {
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
    $("#addQuestionModal").modal("show");
    $("#addExamModal").modal("hide");
  }
});
$(".cancel_create_exam").click(() => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Bạn có muốn hủy thêm kì thi không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
});
var exam = {
  id: generateRandomId(),
  name_exam: "",
  subject: "",
  type: "",
  class_exam: "",
  time_exam: 0,
  time_start: "",
  status: 0,
  questions: [],
  students: [],
};
$("#add_question_multipe_choice").click(() => {
  var fields = [
    "input_question",
    "answer0",
    "answer1",
    "answer2",
    "answer3",
    "correct_answer",
  ];
  var isValid = true;

  var values = fields.map((field) => {
    var value = $("#" + field).val();
    if (!validateAddExam(value)) {
      $(".mess_" + field).show();
      isValid = false;
    } else {
      $(".mess_" + field).hide();
    }
    return value;
  });

  if (isValid) {
    var question = {
      question: values[0],
      options: [values[1], values[2], values[3], values[4]],
      answer: parseInt(values[5]),
    };

    fields.forEach((field, index) => {
      if (index !== fields.length - 1) {
        // Kiểm tra nếu không phải trường cuối cùng
        $("#" + field).val(""); // Đặt giá trị của trường đầu vào thành rỗng
        $(".mess_" + field).hide(); // Ẩn thông báo lỗi
      }
    });
    exam.questions.push(question);
    getListQuetions(exam);
  }
});
$("#addExam").click(() => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Bạn có muốn thêm kì thi không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý!",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        exam.name_exam = $("#name_exam").val();
        exam.subject = $("#subject").val();
        exam.type = $("#type").val();
        exam.class_exam = $("#class_exam").val();
        exam.time_exam = $("#time_exam").val();
        exam.time_start = $("#time_start").val();
        exam.status = getStatus(exam.time_start); // Gán giá trị status dựa trên time_start
        exam_list.push(exam);
        localStorage.setItem("exam_list", JSON.stringify(exam_list)); // Lưu danh sách exam_list vào localStorage
        window.location.reload();
      }
    });
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
    element.options.forEach((option, id) => {
      html += `
            <div class="mt-1 ${getAnswerText(
              id,
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
  $("#list_question").html(html);
}
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
        exam.questions.splice(questionIndex, 1);
        console.log(exam.questions);
        // Xóa câu hỏi khỏi giao diện
        getListQuetions(exam);
      }
    });
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
function validateAddExam(value) {
  if (value != "") {
    return true;
  }
  return false;
}
function generateRandomId() {
  var randomNumber = Math.floor(Math.random() * 10000);
  var timestamp = Date.now();
  return parseInt(timestamp.toString() + randomNumber.toString());
}
function getAnswerText(value1, value2) {
  if (value1 == parseInt(value2)) {
    return "text-success f-f-BeVietNam-Bold";
  }
  return "";
}
