const urlUser = "http://localhost:3000/users";
var userId;
var dataUser = [];
var dataUserEmail = [];
var dataUserPassword = [];
var addModalFormUser = document.querySelector(".addFormUser");
var editModalFormUser = document.querySelector(".editFormUser");

function start(){
    getDataUser();

}

start();

function getDataUser(){
    fetch(urlUser)
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                renderDataUser(user);
            });
        })
}

function renderDataUser(user){
    var roleUser;
    if(user.role == 1){
        roleUser = "Admin";
    }
    else{
        roleUser = "Khách hàng";
    }
    const output = `
    <tr>
        <td>${user.id}</td>
        <td>${user.fullname}</td>
        <td>${user.password}</td>
        <td>${user.phone}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${roleUser}</td>
        <td><button class="btn btn-primary" onclick="handleUpdateUser(${user.id})">Sửa</button></td>
        <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Xóa</button></td>
    </tr>
    `;
    dataUser[user.id] = user.fullname;
    dataUserEmail[user.id] = user.email;
    dataUserPassword[user.id] = user.password;
    document.querySelector("#table-user").innerHTML += output;
}

function handleUpdateUser(id){
    userId = id;

    $("#myEditModalUser").modal("show");
    editModalFormUser.fullname.value = dataUser[id];
    editModalFormUser.email.value = dataUserEmail[id];
    editModalFormUser.password.value = dataUserPassword[id];
}

function updateUser(){
    fetch(urlUser + "/" + userId,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify( 
            {
                fullname: editModalFormUser.fullname.value,  
                email: editModalFormUser.email.value,  
                password: editModalFormUser.password.value,  
                role: editModalFormUser.role.value  
            }
        )
    })
    .then(res =>{
        // alert(res);
        res.json();})
    .then(() => location.reload);
}

function deleteUser(id){
    var options = {
        method: 'DELETE'
    }
    fetch(urlUser + "/" + id, options)
    .then(res =>res.json())
    .then(() => location.reload);
}

function createUser(){
    fetch(urlUser,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                fullname: addModalFormUser.fullname.value,    
                password: addModalFormUser.password.value,    
                phone: addModalFormUser.phone.value,    
                email: addModalFormUser.email.value,    
                address: addModalFormUser.address.value,    
                role: 0
            }
        )
    })
        .then(
            res => {
                // alert(res)
                res.json()
            })
        .then(data =>{
            const dataArr = [];
            dataArr.push(data);
            renderDataUser(dataArr);
        })
}