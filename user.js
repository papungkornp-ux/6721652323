//2. นำ user ที่โหลดมาแสดงในหน้าเว็บ
const BASE_URL = "http://localhost:8000";

// 1. load user data จาก api
window.onload = async ()=>{

}
const loadData = async () =>{
        const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);

    const userDOM = document.getElementById("user");
    let htmlData = '<div>';
    for (let i = 0; i<response.data.length; i++){
        let user = response.data[i];
        htmlData += `<div>
        ${user.firstName} ${user.lastName}
        <button>Edit</button>
        <button class = 'delete' data=id='${user.id}'>Delete</button>
        </div>`
    }
    htmlData = '</div>';
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName("delete");
    for (let i =0; i< deleteDOMs.length; i++){
        deleteDOMs[i].addEventListener("click",async(event)=>{
            const id = event.target.dataset.id;
            try{
                await axios.delete(`${BASE_URL}/users/${id}`);
            }catch(error){
                console.error("Error deleting user: ",error);
            }
        });
    }
}
