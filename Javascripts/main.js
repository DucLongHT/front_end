console.log(users);
$("#user_name").focus();
function validateRegister() {
  if ($("#user_name").val() == "") {
    $(".mess_user").addClass("d-block");
  } else {
    $(".mess_user").removeClass("d-block");
  }
  if ($("#password").val() == "") {
    $(".mess_password").addClass("d-block");
  } else {
    $(".mess_password").removeClass("d-block");
  }
  if ($("#repeat_password").val() == "") {
    $(".mess_repeat_password").addClass("d-block");
  } else {
    $(".mess_repeat_password").removeClass("d-block");
  }
  if ($("#password").val() != $("#repeat_password").val()) {
    $(".mess_repeat_password2").addClass("d-block");
  } else {
    $(".mess_repeat_password2").removeClass("d-block");
  }
  if (
    $("#user_name").val() != "" &&
    $("#password").val() != "" &&
    $("#password").val() == $("#repeat_password").val()
  ) {
    return true;
  } else return false;
}
function validateLogin() {
  if ($("#user_name").val() == "") {
    $(".mess_user").addClass("d-block");
  } else {
    $(".mess_user").addClass("d-none");
  }
  if ($("#password").val() == "") {
    $(".mess_password").addClass("d-block");
  } else {
    $(".mess_password").addClass("d-none");
  }

  if ($("#user_name").val() != "" && $("#password").val() != "") {
    return true;
  } else return false;
}

function login() {
  if (validateLogin()) {
    if (
      users.find(
        (user) =>
          user.username === $("#user_name").val() &&
          user.username === "admin" &&
          user.password === $("#password").val()
      )
    ) {
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Đăng nhập thành công",
      //   showConfirmButton: false, // Tắt nút xác nhận
      //   timer: 700, // Thời gian hiển thị thông báo (1,5 giây)
      // }).then((result) => {
      window.location.href = "admin_dashboard.html";
      // });
    } else if (
      users.find(
        (user) =>
          user.username === $("#user_name").val() &&
          user.password === $("#password").val() &&
          user.username != "admin"
      )
    ) {
      const validUser = users.find(
        (user) =>
          user.username === $("#user_name").val() &&
          user.password === $("#password").val() &&
          user.username != "admin"
      );

      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Đăng nhập thành công",
      //   showConfirmButton: false, // Tắt nút xác nhận
      //   timer: 700, // Thời gian hiển thị thông báo (1,5 giây)
      // }).then((result) => {
      if (validUser) {
        window.location.href = "index.html?idUser=" + validUser.id;
      }
      // });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tên đăng nhập hoặc tài khoản không chính xác",
        showConfirmButton: true,
      });
    }
  }
}

function register() {
  if (validateRegister()) {
    if (users.find((user) => user.username === $("#user_name").val())) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tên đăng nhập đã tồn tại",
        showConfirmButton: true,
        // timer: 1500
      });
      return;
    }
    // Tạo một đối tượng chứa thông tin đăng ký
    var user = {
      id: generateRandomId(),
      username: `${$("#user_name").val()}`,
      password: `${$("#password").val()}`,
      participations: {
        quantity: 0,
      },
    };
    // Thêm đối tượng user vào mảng users
    users.push(user);
    // Lưu mảng users vào localStorage
    localStorage.setItem("users", JSON.stringify(users)); // Lưu mảng users vào localStorage
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Đăng ký thành công",
      showConfirmButton: true,
      timer: 1500,
    }).then((result) => {
      $("input").val("");
      window.location.href = "login.html";
    });
  }
}

function setupEnterEvent(id) {
  document.getElementById(id).addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      // Sử dụng 'Enter' thay vì mã keyCode
      login();
    }
  });
}
setupEnterEvent("user_name");
setupEnterEvent("password");
function generateRandomId() {
  var randomNumber = Math.floor(Math.random() * 10000);
  var timestamp = Date.now();
  return parseInt(timestamp.toString() + randomNumber.toString());
}
// setupEnterEvent("repeat_password");
