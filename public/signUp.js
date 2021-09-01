const email = $('#email');
const password = $('#password');
const confirmPass = $('#confirm');
const userName = $('#username');

function signUp(){
    
    const newUser = {
        name: userName.val(),
        email: email.val(),
        password:password.val()
    }
if(!email.val()){
    alert('email is needed to sign up');
    return;
}
if(!password.val()){
    alert('password is needed to sign up');
    return
}
if( confirmPass.val() != password.val()){
    alert('password is not the same')
    return
}
if(!userName.val()){
    alert('username is needed to sign up')
    return
}
console.log(JSON.stringify(newUser))
$.post('/api/users/',newUser).then((res)=>{
    
        alert('User has been created')
    
}).catch((err)=>{
    alert('Please try again')
})
}

$('#submitBtn').on('click',(e)=>{
    e.preventDefault();

    signUp();
})