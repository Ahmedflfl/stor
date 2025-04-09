document.addEventListener("DOMContentLoaded", function () {
    const ordersTableBody = document.getElementById("orders-table-body");

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    function displayOrders() {
        ordersTableBody.innerHTML = "";

        orders.forEach((order, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${order.customerName}</td>
                <td>${order.customerAddress}</td>
                <td>${order.customerPhone}</td>
                <td>${order.paymentMethod}</td>
                <td>${order.walletNumber || "غير متاح"}</td>
                <td>${order.total} ج.م</td>
                <td><span class="status">${order.status}</span></td>
                <td>${formatProducts(order.cart)}</td>
                <td><button class="delete-btn" data-index="${index}">🗑 حذف</button></td>
            `;

            ordersTableBody.appendChild(row);

            // ربط زر الحذف
            row.querySelector(".delete-btn").addEventListener("click", function () {
                row.remove();
                removeOrderFromLocalStorage(index);
            });
        });
    }

    // تحويل المنتجات إلى قائمة HTML منسقة
    function formatProducts(products) {
        return `
            <ul class="product-list">
                ${products.map(item => `<li>${item.name} × ${item.quantity} - ${item.price} ج.م</li>`).join("")}
            </ul>
        `;
    }

    // حذف الطلب من LocalStorage
    function removeOrderFromLocalStorage(index) {
        let orders = JSON.parse(localStorage.getItem("orders")) || [];
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
    }

    displayOrders();
});
