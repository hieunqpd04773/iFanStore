var orderApi = "http://localhost:3000/order";
var khachhangOrder = [];trangthaiOrder = [];ngaymuaOrder = [];totalOrder = [];
var idUpdateOrder;

function start(){
    getDataOrder()
}

start()

function getDataOrder(){
    fetch(orderApi)
        .then(res => res.json())
        .then(data => {
            data.forEach(order => {
                renderDataOrder(order);
            });
        })
}

function handleUpdateOrder(id){
    idUpdateOrder = id;
    var formUpdateOrder = document.querySelector("#form-update-order");
    $("#myEditOrder").modal("show");
    formUpdateOrder.idhoadon.value = idUpdateOrder
    formUpdateOrder.trangthai.value = trangthaiOrder[id]
}

function updateOrder(){
    var formUpdateOrder = document.querySelector("#form-update-order");
    fetch(orderApi + "/" + idUpdateOrder,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'          
        },
        body: JSON.stringify( 
            {
                idkhachhang: khachhangOrder[idUpdateOrder],    
                total: totalOrder[idUpdateOrder],    
                ngaymua: ngaymuaOrder[idUpdateOrder],
                trangthai: formUpdateOrder.trangthai.value
            }
        )
    })
    .then(res =>{
        res.json();})
    .then(() => location.reload);
}

function handleDetailOrder(id){

}

function renderDataOrder(order){
    var orderTrangThai;
    if(order.trangthai == 0){
        orderTrangThai = "Chưa xác nhận";
    }
    else if(order.trangthai == 1){
        orderTrangThai = "Đang giao hàng";
    }
    else if(order.trangthai == 2){
        orderTrangThai = "Thất Bại";
    }
    else{
        orderTrangThai = "Thành Công";
    }

    var output = `
    <tr>
        <td>${order.id}</td>
        <td>${order.idkhachhang}</td>
        <td>${order.total}</td>
        <td>${order.ngaymua}</td>
        <td>${orderTrangThai}</td>
        <td><button class="btn btn-primary" onclick="handleUpdateOrder(${order.id})">Sửa Trang Thái</button></td>
        <td><button class="btn btn-success" onclick="handleDetailOrder(${order.id})">Chi Tiết</button></td>
    </tr>
    `;
    khachhangOrder[order.id] = order.idkhachhang;
    trangthaiOrder[order.id] = order.trangthai;
    ngaymuaOrder[order.id] = order.ngaymua;
    totalOrder[order.id] = order.total;

    document.querySelector("#table-order").innerHTML += output;
}
