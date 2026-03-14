const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE';
let selsctedId = ''

window.onload = async () =>{
  const urlParams = new URLSearchParams(window.location.search);
  const id =  urlParams.get('id');
  console.lot('id',id);
    if(id){
      mode = 'EDIT';
      selsctedId = id;

      try{
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        const user = response.data;

          const firstname = document
      .querySelector('input[name="firstname"]')
      .value.trim();

    const lastname = document
      .querySelector('input[name="lastname"]')
      .value.trim();

    const age = document
      .querySelector('input[name="age"]')
      .value;

      firstnameDOM.value = user.firstname;
      lastnameDOM.value = user.lastname;
      ageDOM.value = user.age;
      descriptionDOM.value = user.description;

      let genderDOM = document.querySelectorAll('input[name=gender]')
      let interestDOMs = document.querySelectorAll('input[name=interests]')

    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : null;

    const interests = [];

    for(let i =0; i <genderDOM.length;i++) {
      if (genderDOM[i].value==user.gender){
        genderDOM[i].checked = true;
      }
    }
    for (let i = 0; i< interestDOMs.length;i++){
      if(user.interests.includes(interestDOMs[i].value)){
        interestDOMs[i].checked = true;
      }
    }

      }catch(error){
        console.error('Error fetching user data:',error);
      }
    }
}

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

    if(mode=='CREATE'){
      const response = await axios.post(`${BASE_URL}/users`,userData);
      console.log('response',response.data);

    }else{
      const response = await axios.put(`${BASE_URL}/users/${selsctedId}`,userData);
      message = 'แก้ไขข้อมูลสำเร็จ';
      console.log('response',response.data);
    }
    messageDOM.innerText = message;
    messageDOM.className = 'message success';

    const response = await axios.post(`${BASE_URL}/users`, userData);

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