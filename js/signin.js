var email = document.querySelector('#email');
var password = document.querySelector('#password');
var form = document.querySelector('form');

function showError(input, message) {
 let parent = input.parentElement;
 let small = parent.querySelector('small');
 parent.classList.add("error");
 small.innerText = message;
}
function showSuccess(input) {
 let parent = input.parentElement;
 let small = parent.querySelector('small');
 parent.classList.remove("error");
 small.innerText = "";
}
function checkEmtyError(listInput) {
 let isEmtyError = false;
 listInput.forEach(input => {
  input.value = input.value.trim();
  if (!input.value) {
   isEmtyError = true;
   showError(input, "khong duoc de trong!");
  } else {
   showSuccess(input);
  }
 });
 return isEmtyError;
}
form.addEventListener('submit', function (e) {
 e.preventDefault();
 let isError = checkEmtyError([email, password]);
 console.log(isError)
 if (!isError) {
  if (password.value.trim() == '1234' && email.value.trim() == 'jon') {
   window.location.href = "http://127.0.0.1:5500/home.html?";
   localStorage.setItem("name", email.value.trim());
   localStorage.setItem("password", password.value.trim());
  } else {
   let small = document.querySelector(".error-toggle");
   small.innerText = "mat khau hoac ten dang nhap sai!";
   return;
   // email.value = "";
   // password.value = "";

  }
 }
})


