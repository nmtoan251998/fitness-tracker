// Lưu thông tin giới tính và tuổi người dùng
const gender = document.getElementById("gender");
const old = document.getElementById("old");

if (old.value == "") {
  document.getElementById("get-mac").disabled = true;
  document.getElementById("btn_connect").disabled = true;
}

if (typeof Storage !== "undefined") {
  old.value = localStorage.getItem("old");
  gender.value = localStorage.getItem("gender");
} else {
  console.log("Error browser not support localStorage. Upgrade your browser!");
}

$(document).ready(function () {
  $("#change_infor").click(function () {
    if (typeof Storage !== "undefined") {
      const newGender = document.getElementById("new_gender");
      const newOld = document.getElementById("new_old");
      localStorage.setItem("gender", newGender.value);
      localStorage.setItem("old", newOld.value);
    } else {
      console.log(
        "Error browser not support localStorage. Upgrade your browser!"
      );
    }
  });
});

if (old.value != "") {
  document.getElementById("get-mac").disabled = false;
  document.getElementById("btn_connect").disabled = false;
}