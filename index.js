const validateData = (userData) => {
  let errors = []

  if (!userData.firstname) {
    errors.push('กรุณากรอกชื่อ')
  }
  if (!userData.lastname) {
    errors.push('กรุณากรอกนามสกุล')
  }
  if (!userData.age) {
    errors.push('กรุณากรอกอายุ')
  }
  if (!userData.gender) {
    errors.push('กรุณาเลือกเพศ')
  }
  if (!userData.interests || userData.interests.length === 0) {
    errors.push('กรุณาเลือกความสนใจ')
  }
  if (!userData.description) {
    errors.push('กรุณากรอกคำอธิบาย')
  }

  return errors
}

async function submitData() {

  const alertMessage = document.getElementById("alert-message");

  const firstname = document
    .querySelector('input[name="firstname"]')
    .value.trim();

  const lastname = document
    .querySelector('input[name="lastname"]')
    .value.trim();

  const age = document
    .querySelector('input[name="age"]')
    .value;

  const genderInput = document.querySelector('input[name="gender"]:checked');
  const gender = genderInput ? genderInput.value : null;

  const interests = [];

  document
    .querySelectorAll('input[name="interest"]:checked')
    .forEach((item) => {
      interests.push(item.value);
    });

  const description =
    document.querySelector('textarea[name="description"]').value.trim();

  try {

    const userData = {
      firstname,
      lastname,
      age,
      gender,
      interests,
      description
    }

    const errors = validateData(userData)

    if (errors.length > 0) {
      throw {
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        errors: errors
      }
    }

    const r = await axios.post("http://localhost:8000/user", userData);

    if (r.data) {
      alertMessage.style.color = "green";
      alertMessage.textContent = "User created successfully!";
      alertMessage.style.visibility = "visible";
    }

  } catch (error) {

    console.log(error);

    let htmlData = `<div>${error.message}</div>`

    if (error.errors) {
      htmlData += "<ul>"
      error.errors.forEach(err => {
        htmlData += `<li>${err}</li>`
      })
      htmlData += "</ul>"
    }

    alertMessage.innerHTML = htmlData
    alertMessage.style.color = "red"
    alertMessage.style.visibility = "visible"

    if (error.response) {
      alertMessage.textContent =
        `${error.response.data.message} | ${error.response.data.error}`;
    }
  }
}