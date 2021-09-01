const title = $('#title');
const description = $('#description');
const submitBtn = $('#submitBtn');



const postBlog = () => {
    const newPost = {
        title: title.val(),
        content: description.val(),
    }
    if(!title.val()){
        alert('title needed');
        return
    }
    if(!description.val()){
        alert('Description needed');
        return
    }
// console.log(newPost)

$.ajax({
type:"POST",
url: '/api/blog',
data: newPost,
}).then((res)=>{
        document.location.replace('/');
}).catch(err)
}

submitBtn.on('click',postBlog)