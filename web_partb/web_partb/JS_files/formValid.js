
const myForm = document.querySelector('.my-form')
const nameInput = document.querySelector('#name')
const lastNameInput = document.querySelector('#last_name')
const emailInput = document.querySelector('#email')
const userNameInput = document.querySelector('#user_name')
const passwordInput = document.querySelector('#password')
const cityInput = document.querySelector('#city')
const phoneInput = document.querySelector('#phone')

const nameError = document.querySelector('#name-error');


const onSubmit = (e) => {
    e.preventDefault()
//isEmpty
    if (nameInput.value === '' || lastNameInput.value === '' || emailInput.value === '' || userNameInput.value === '' || passwordInput.value === '' || cityInput.value === '' ||phoneInput.value === '' ){
      console.log('fields empty')
      alert("Please fill out all fields");
    }

  //isString
   else if( !/^[a-zA-Z\s]*$/i.test(nameInput.value) || !/^[a-zA-Z\s]*$/i.test(lastNameInput.value) || !/^[a-zA-Z\s]*$/i.test(userNameInput.value) || !/^[a-zA-Z\s]*$/i.test(cityInput.value) ){
     alert("Only English letters are allowed")
     console.log('not letters')
   }

    //validemail
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)){
      alert("please enter a valid email")
      console.log('not valid email')
    }

    //validPassword
    else if (passwordInput.value.length<8){
      alert("please enter a password with more than 7 characters")
      console.log('not valid password')
    }

    //validPhone
    else if(!/^\d{10}$/.test(phoneInput.value)){
      alert("please enter a valid phone number")
      console.log('not valid phone')
     }
    else {
        console.log('fields filled up')
        alert("Well done! you are in:)")
        const li = document.createElement('li')
        li.innerHTML = `${nameInput.value}: ${lastNameInput.value} ${emailInput.value}: ${userNameInput.value} ${passwordInput.value}: ${cityInput.value} ${phoneInput.value}`
        nameInput.value = ''
        lastNameInput.value = ''
        emailInput.value = ''
        userNameInput.value = ''
        passwordInput.value = ''
        cityInput.value = ''
        phoneInput.value = ''

    }
}

myForm.addEventListener('submit' , onSubmit)
