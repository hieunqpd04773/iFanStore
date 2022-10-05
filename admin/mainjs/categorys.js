const url = "http://localhost:3000/category";
var editCategoryId;
let listCategorie = [];

function start(){
    getData();
    // var urlCate = "http://localhost:3000/category";
}

start();

function getData(){
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            data.forEach(category => {
                renderTable(category)
            });
        })
}
function renderTable(category){
    const output = `
        <tr>
            <td>${category.id}</td>
            <td>${category.tenloai}</td>
            <td><button class="btn btn-primary" onclick="handleUpdateCategory(${category.id})">Sửa</button></td>
            <td><button class="btn btn-danger" onclick="deleteCategory(${category.id})">Xóa</button></td>
        </tr>
    `;
    listCategorie[category.id] = category.tenloai;

    document.querySelector("#table-category").innerHTML += output;
    
}

function handleUpdateCategory(id){
    editCategoryId = id;
    var tenloai = document.querySelector('input[name="tenloaiedit"]');
    // var modalEdit = document.getElementById("#myEditModal");

    $("#myEditModal").modal("show");
    // modalEdit.modal("show");
    tenloai.value = listCategorie[id];
}

function updateCategory(){
    // var urlCate = "http://localhost:3000/category";
    var tenloaiedit =  document.querySelector('input[name="tenloaiedit"]');
    fetch(url + "/" + editCategoryId,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify( 
            {
                tenloai: tenloaiedit.value  
            }
        )
    })
    .then(res =>{
        // alert(res);
        res.json();})
    .then(() => location.reload);
}
   

function deleteCategory(id){
    var options = {
        method: 'DELETE'
    }
    fetch(url + "/" + id, options)
    .then(res =>res.json())
    .then(data =>{
        data.forEach(category => {
            renderTable(category)
        });
    })
}

function createCategory(){
    // var urlCate = "http://localhost:3000/category";
    var tenloai = document.querySelector('input[name="tenloai"]').value;
    // alert(tenloai);
    fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                tenloai: tenloai    
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
            renderTable(dataArr);
        })
}