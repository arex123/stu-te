const serverUrl = "http://localhost:3001/";
function handleSubmit(event) {
  event.preventDefault();
  //   let date = event.target.date.value;

  const data = {
    title: event.target.title.value,
    author: event.target.author.value,
    content: event.target.content.value,
  };

  console.log("ll", data);

  axios
    .post(serverUrl + "createBlog", data)
    .then((d) => {
      let data = d.data
      displayUserOnScreen(data)
    })
    .catch((e) => {
      console.log(e);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  // let ullist = document.querySelector('ul')
  axios
    .get(serverUrl + "getBlogs")
    .then((d) => {
      let details = d.data;
      for (let i = 0; i < details.length; i++) {
        displayUserOnScreen(details[i]);
      }

      var coll = document.getElementsByClassName("collapsible");
      var i;

      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      }
    })
    .catch((e) => {
      console.log("error ", e);
    });
});

function displayUserOnScreen(blog) {

  console.log("blogs ",blog)
  let mainTag = document.querySelector(".blog-show-inner");

  let btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = blog.title;
  btn.className = "collapsible";

  mainTag.appendChild(btn);

  let content = document.createElement("div");
  content.className = "content";

  let authorP = document.createElement("p");
  authorP.textContent = "Author " + blog.author;
  authorP.className = "authorid"
  content.appendChild(authorP);

  let contentP = document.createElement('p')
  contentP.className='contentid'
  contentP.textContent = blog.content
  content.appendChild(contentP)
  
  
  
  //adding comment section
  
    let commentP = document.createElement('h3')
    commentP.className='comment'
    commentP.textContent = "comment"
    content.appendChild(commentP)
    

    let divcomm =  document.createElement('div')
    divcomm.className = 'divcomm'

    let commentInput = document.createElement('input')
    commentInput.name = "comment"
    commentInput.placeholder = "Enter Comment"
    commentInput.className="commentInput"
    commentInput.id = blog.id
    divcomm.appendChild(commentInput)
    
    let commentSubmit = document.createElement('p')
    commentSubmit.className="commentsubmit"
    commentSubmit.textContent='Send'
    divcomm.appendChild(commentSubmit)

    content.appendChild(divcomm)


    if(blog?.comments?.length>0){
      
      let secForCmt = document.createElement('div')
      for(let i=0;i<blog.comments.length;i++){
        let cmn = blog.comments[i]
        
        let tp = document.createElement('p')
        tp.textContent = cmn.comment
        
        let tphr = document.createElement('hr')
        secForCmt.appendChild(tp)
        
        let delccmt = document.createElement('p')
        delccmt.className = "delccmt"
        delccmt.textContent  = "delete"
        delccmt.id = cmn.id

        secForCmt.appendChild(delccmt)

        delccmt.addEventListener('click',(event)=>{
          let prevSib = event.target.previousElementSibling
          let nextSib = event.target.nextElementSibling
          axios.delete(serverUrl+"deleteComment/"+cmn.id)
          .then(d=>{
            console.log("comment delete")

            prevSib.remove()
            nextSib.remove()
            event.target.remove()


          }).catch(e=>{
            console.log(e)
          })
        })


        secForCmt.appendChild(tphr)
        console.log("comments to put ",cmn)

        
      }
      content.appendChild(secForCmt)

    }


    commentSubmit.addEventListener('click',handleCommentSubmit)


    mainTag.appendChild(content);
}

function handleCommentSubmit(event){
  const previousInput = event.target.previousElementSibling;
  console.log("prev ",previousInput)

  // Check if the previous sibling is an input element
  if (previousInput && previousInput.tagName === 'INPUT') {
      // Get the value and ID of the input element
      const inputValue = previousInput.value;
      const inputId = previousInput.id;

      // Log the value and ID
      console.log('Input Value:', inputValue);
      console.log('Input ID:', inputId);

      let data = {
        id : inputId,
        comment : inputValue
      }

      axios.post(serverUrl+"addComment",data)
      .then(d=>{
        let ncomment = d.data
        console.log("comment submitted ",ncomment)
        createComment(ncomment,event)
      })
      .catch(e=>{
        console.log(e)
      })



  } else {
      console.log('No previous input element found.');
  }
}

function createComment(cmt){

  let cmtSec = document.createElement('div')
  const nc = document.createElement('p')
  nc.id = cmt.id
  nc.className = "innercomment"
  nc.textContent = cmt.comment

  cmtSec.appendChild(nc)

  //deleting comment
  // let delc = document.createElement('span')
  // delc.className='cmtdel'
  

}