
const submitBtn = $('#submitBtn');
const userInput = $('#inputEmail');
const pass = $('#inputPassword')

function login(){
   
const userData = {
    email: userInput.val(),
    password: pass.val()
}

if(!userInput.val()){
    alert('Incorrect email or password, please try again')
}
if(!pass.val()){
    alert('Incorrect email or password, please try again')
}
console.log(userData);
    $.post('/api/users/login',userData).then(()=>{document.location.href='/'})
};


submitBtn.on('click',(e)=>{
    e.preventDefault();
    login();
    
})