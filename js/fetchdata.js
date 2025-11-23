const getAllPosts=async()=>{
    let data ;
    try{
const res= await fetch("http://localhost:5000/getAllPosts");
data = await res.json();
console.log(data)
    }
    catch{
        console.log("error fetching data")
    }
   
}

getAllPosts();