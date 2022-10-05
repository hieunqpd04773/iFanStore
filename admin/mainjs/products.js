const urlProducts = "http://localhost:3000/products";
const urlCate = "http://localhost:3000/category";
var addModalForm = document.querySelector(".addFormProduct");
var editModalForm = document.querySelector(".editFormProduct");
var tensp=[];loaisp=[];anhspedit=[];giasp=[];chitiet=[];khuyenmai=[]; ngaynhap = [];
var editProductId;
var dataProduct = [];

function start(){
    getDataProducts()
    getDataCate()
}

start()

function getDataCate(){
    fetch(urlCate)
    .then(res =>res.json())
    .then(data => {
        data.forEach(category => {
            renderCate(category)
            renderCateUpdate(category)
        });
    })
}

function getDataProducts(){
    fetch(urlProducts)
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            renderProduct(product)
        });
    })
}

function renderProduct(product){
    var output = `
    <tr>
        <td>${product.id}</td>
        <td>${product.tensp}</td>
        <td>${product.loaisp}</td>
        <td><img src="../image/${product.anhsp}" alt="${product.tensp}" width="100" height="100"></td>
        
        <td>${product.giasp}</td>
        <td>${product.chitiet}</td>
        <td>${product.ngaynhap}</td>
        <td>${product.khuyenmai}</td>
        <td><button class="btn btn-primary" onclick="handleUpdateProduct(${product.id})">Sửa</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button></td>
    </tr>
    `;
    tensp[product.id] = product.tensp;
    loaisp[product.id] = product.loaisp;
    anhspedit[product.id] = product.anhsp;
    giasp[product.id] = product.giasp;
    chitiet[product.id] = product.chitiet;
    ngaynhap[product.id] = product.ngaynhap;
    khuyenmai[product.id] = product.khuyenmai;
    
    document.querySelector("#table-products").innerHTML += output;
}

function renderCate(category){
    var htmlCate = `
        <option value="${category.id}">${category.tenloai}</option>
    `;
    document.querySelector("#select-category").innerHTML += htmlCate;
}

function renderCateUpdate(category){
    var htmlCate = `
        <option value="${category.id}">${category.tenloai}</option>
    `;
    document.querySelector("#select-category-edit").innerHTML += htmlCate;
}

function handleUpdateProduct(id){
    editProductId = id;
    $("#myEditModalProduct").modal("show");

    editModalForm.tensp.value = tensp[id];
    editModalForm.loaisp.value = loaisp[id];
    //editModalForm.anhsp.value = anhsp[id];
    editModalForm.giasp.value = giasp[id];
    editModalForm.chitiet.value = chitiet[id];
    editModalForm.ngaynhap.value = ngaynhap[id];
    editModalForm.khuyenmai.value = khuyenmai[id];
    document.querySelector("#imgProduct").innerHTML = `<img src="../image/${anhspedit[id]}" width="100" height="100">`;
}

function updateProduct(){
    var anhsp = editModalForm.anhsp.value;
    var img = anhsp.slice(12);
    // alert(img)
    fetch(urlProducts + "/" + editProductId,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify( 
            {
                tensp: editModalForm.tensp.value,    
                loaisp: editModalForm.loaisp.value,    
                anhsp: img,    
                giasp: editModalForm.giasp.value,    
                chitiet: editModalForm.chitiet.value,    
                ngaynhap: editModalForm.ngaynhap.value,    
                khuyenmai: editModalForm.khuyenmai.value 
            }
        )
    })
    .then(res =>{
        // alert(res);
        res.json();})
    .then(() => location.reload);
}

function deleteProduct(id){
    var options = {
        method: 'DELETE'
    }
    fetch(urlProducts + "/" + id, options)
    .then(res =>res.json())
    .then(() => location.reload);
}

function createProduct(){
    var anhsp = addModalForm.anhsp.value;
    var img = anhsp.slice(12);
    fetch(urlProducts,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                tensp: addModalForm.tensp.value,    
                loaisp: addModalForm.loaisp.value,    
                anhsp: img,    
                giasp: addModalForm.giasp.value,    
                chitiet: addModalForm.chitiet.value,    
                ngaynhap: addModalForm.ngaynhap.value,    
                khuyenmai: addModalForm.khuyenmai.value
            }
        )
    })
        .then(res => res.json())
        .then(data =>{
            const dataArr = [];
            dataArr.push(data);
            renderTable(dataArr);
        })
}