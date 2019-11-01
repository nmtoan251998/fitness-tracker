// Lưu thông tin giới tính và tuổi người dùng
const old = document.getElementById("old");

if (old.value == "") {
  document.getElementById("get-mac").disabled = true;
  document.getElementById("btn_connect").disabled = true;
}

if (typeof Storage !== "undefined") {
  old.value = localStorage.getItem("old");
} else {
  console.log("Error browser not support localStorage. Upgrade your browser!");
}

$(document).ready(function () {
  $("#change_infor").click(function () {
    if (typeof Storage !== "undefined") {
      const newOld = document.getElementById("new_old");
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