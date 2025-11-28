// import calculateTimeDifferance from "../js/utils/calculateTimeDifferance"
const showLoggedUser = ()=>{
    const userElement = document.getElementById('logged-userName');
    let user = localStorage.getItem('loggedInUser');
    if(user){
        user=JSON.parse(user);
    }
    userElement.innerText = user.userName;
}

const checkedLoggedInUser = ()=>{
    let user = localStorage.getItem('loggedInUser');
    if(user){
        user = JSON.parse(user);
    }else{
        window.location.href="/index.html"
    }
}
const logOut=()=>{
    localStorage.clear();
    checkedLoggedInUser();
}


const addNewPost= async()=>{
//posted user id from l.storage
let user = localStorage.getItem('loggedInUser');
    if(user) user = JSON.parse(user);
    const postedUserId = user.userId;
//time post
    let now = new Date();
    now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
    let timeOfPost= now.toISOString();
//post text
const postedtextElement= document.getElementById("newPost-text");
const postText = postedtextElement.value;
// image
const postedImageElement = document.getElementById("newPost-image");
const postImageUrl = postedImageElement.value;
//creating post obj
const postObject = {
    postedUserId:postedUserId,
    postTime:timeOfPost,
    postText:postText,
    postImageUrl:postImageUrl
};

//sending data to the server
 try {
        const res = await fetch("http://localhost:5000/addNewPost",{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(postObject)
        })
        const data = await res.json();
    } catch (error) {
        console.log(error.message)
    }finally{
        location.reload()
    }
}

const getAllPosts=async()=>{
    let data ;
    try{
const res= await fetch("http://localhost:5000/getAllPosts");
data = await res.json();
console.log(data)
showAllPosts(data)
    }
    catch{
        console.log("error fetching data")
    }
   
}

const showAllPosts = (allPosts) => {
    console.log(allPosts)
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = "";

    allPosts.forEach(async(post) => {
        console.log(post)
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <div class="post-header">
                <div class="post-user-image">
                    <img src="${post.postedUserImage}" alt="">
                </div>
                <div>
                    <div class="post-username-time">
                        <p class="post-username">${post.postedUserName}</p>
                        <div class="posted-time">
                            <span>${timeDiff(`${post.postTime}`)}</span>
                            <span> ago</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="post-text">
                <p class="post-text-content">${post.postText}</p>
            </div>

            <div class="post-image">
                <img src="${post.postImageUrl}" alt="post-image">
            </div>
        `;

        postContainer.appendChild(postDiv);
        //comments ubder a post
let postComments =await fetchCommentsOfaPost(post.postId);
console.log(postComments)
postComments.forEach((comment)=>{
    const commentHolder = document.createElement('div');
    commentHolder.classList.add('comment-holder');
commentHolder.innerHTML=` 
  <div class="comment">
        <div class="comment-user-image"><img src=${comment.comentedUserImage} alt="comment user image"></div>
        <div class="comment-text-container">
            <h4>${comment.comentedUserName}</h4>
            <p class="comment-text">${comment.commentText}.</p>
        </div>
    </div>`
    postDiv.appendChild(commentHolder);

})

//adding a comment to the post 
const addNewComment = document.createElement('div');
addNewComment.classList.add('postComment-holder');
addNewComment.innerHTML=`
 <div class="post-comment-input-field-holder">
        <input type="text" name="" class="postComment-input-field" id="postComment-input-for-postId-${post.postId}">
    </div>
     <div class="comment-btn-holder">
        <button onclick="handlePostComment(${post.postId})" id="comment-btn" class="postComment-btn">Comment</button>
    </div>
`
postDiv.appendChild(addNewComment)

    });
};
const handlePostComment = async(postId) => {
    let user = localStorage.getItem('loggedInUser');
    if(user) user = JSON.parse(user);

    const commentedUserId = user.userId;

    
    const commentTextElement = document.getElementById(`postComment-input-for-postId-${postId}`);
    if (!commentTextElement) {
        console.error("Input not found for postId:", postId);
        return;
    }

    const commentText = commentTextElement.value;
    console.log("Comment for post", postId, ":", commentText);

    //  current time of cmnt

    let now = new Date();
    now.setMinutes(now.getMinutes()-now.getTimezoneOffset());
    let timeOfComment = now.toISOString();

    const commentObject={
        commentsOfPostId:postId,
        commentedUserId:commentedUserId,
        commentText:commentText,
        commentedTime:timeOfComment
    };
    try {
        const res = await fetch("http://localhost:5000/postComment",{
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify(commentObject)
        })
        const data = await res.json();
    } catch (error) {
        console.log(error.message)
    }finally{
        location.reload()
    }
};

const fetchCommentsOfaPost = async(postId)=>{
let commentsOfPost=[];
try {
    const res = await fetch(`http://localhost:5000/getAllComments/${postId}`)
    commentsOfPost = await res.json()

} catch (error) {
    console.log(error.message);
}finally{
    return commentsOfPost;
}
}

getAllPosts();
