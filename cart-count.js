    // جلب السلة من الـ Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // عناصر DOM
    const cartTableBody = document.querySelector('#cart-table tbody');
    const totalAmountElement = document.getElementById('total-amount');
    const orderForm = document.getElementById('order-form');
    const walletNumberContainer = document.getElementById('wallet-number-container');
    const walletNumberInput = document.getElementById('wallet-number');
    const companyWalletNumbers = document.getElementById('company-wallet-numbers');
    const uploadImageContainer = document.getElementById('upload-image-container');
    const uploadImageInput = document.getElementById('upload-image');

    // دالة لعرض حقل رقم المحفظة وأرقام الشركة
    function showWalletNumber(paymentMethod) {
        const shouldShow = ["فودافون كاش", "أورنج كاش", "اتصالات كاش"].includes(paymentMethod);
        walletNumberContainer.style.display = shouldShow ? 'block' : 'none';
        companyWalletNumbers.style.display = shouldShow ? 'block' : 'none';
        uploadImageContainer.style.display = shouldShow ? 'block' : 'none';
        walletNumberInput.required = shouldShow;
        uploadImageInput.required = shouldShow;
    }

    // دالة لحساب المجموع الكلي
    function calculateTotal() {
        let total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalAmountElement.textContent = total;
    }

    // دالة لعرض المنتجات في الجدول
    function displayCartItems() {
        cartTableBody.innerHTML = cart.length === 0 
            ? '<tr><td colspan="4">السلة فارغة</td></tr>' 
            : cart.map((item, index) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.price} جنيه</td>
                    <td>
                        <button class="quantity-btn" onclick="decreaseQuantity(${index})">-</button>
                        ${item.quantity}
                        <button class="quantity-btn" onclick="increaseQuantity(${index})">+</button>
                    </td>
                    <td><button class="delete-btn" onclick="deleteItem(${index})">حذف</button></td>
                </tr>
            `).join("");
        calculateTotal();
    }

    // دالة لزيادة وتقليل الكمية
    function increaseQuantity(index) {
        cart[index].quantity += 1;
        updateCart();
    }
    function decreaseQuantity(index) {
        cart[index].quantity > 1 ? cart[index].quantity -= 1 : cart.splice(index, 1);
        updateCart();
    }

    // دالة لحذف منتج من السلة
    function deleteItem(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // تحديث وحفظ السلة
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }


    // نضيف المنتجات إلى الطلب ليتم تخزينها مع باقي البيانات:
    async function saveOrderDetails(event) {
        event.preventDefault();
    
        const customerName = document.getElementById('customer-name').value;
        const customerAddress = document.getElementById('customer-address').value;
        const customerPhone = document.getElementById('customer-phone').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const walletNumber = document.getElementById('wallet-number').value;
        const imageFile = document.getElementById('upload-image').files[0];
    
        let imageBase64 = null;
        if (paymentMethod !== "عند الاستلام" && imageFile) {
            imageBase64 = await getBase64(imageFile);
        }
    
        // حساب السعر الإجمالي
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
        const orderDetails = {
            customerName,
            customerAddress,
            customerPhone,
            paymentMethod,
            walletNumber,
            imageBase64,
            cart, // حفظ المنتجات مع الطلب
            total,
            status: "قيد الانتظار"
        };
    
        // استرجاع الطلبات من localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
    
        // إضافة الطلب الجديد
        orders.push(orderDetails);
    
        // تحديث LocalStorage
        localStorage.setItem('orders', JSON.stringify(orders));
    
        // إرسال الطلب مباشرة إلى صفحة الطلبات
        sendOrderToOrdersPage(orderDetails);
    
        // إظهار رسالة نجاح
        showToast(`تم إرسال الطلب بنجاح! ${calculateDeliveryTime(customerAddress)}`);
    
        // إفراغ السلة بعد الإرسال
        localStorage.removeItem('cart');
        cart = [];
        displayCartItems();
    
        // إخفاء الفورم
        document.getElementById('order-form').style.display = 'none';
    }
    
    // إرسال الطلب مباشرة إلى صفحة الطلبات
    function sendOrderToOrdersPage(order) {
        const ordersTableBody = document.getElementById("orders-table-body");
        if (ordersTableBody) {
            addOrderToTable(order);
        }
    }

    // --

    // دالة لعرض فورم إرسال الطلب
    function showOrderForm() {
        cart.length === 0 
            ? showToast("السلة فارغة. أضف منتجات قبل إرسال الطلب.", "red") 
            : (orderForm.style.display = 'block');
    }

    // دالة لتحويل الصورة لـ Base64
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // دالة لإظهار التوست
    function showToast(message, bgColor = "#28a745") {
        Toastify({
            text: message,
            duration: 4000,
            gravity: "top",
            position: "center",
            style: { background: bgColor, color: "white", padding: "10px" }
        }).showToast();
    }

    // دالة لحساب مدة التوصيل
    function calculateDeliveryTime(address) {
        return (address.includes("القاهرة") || address.includes("الجيزة")) 
            ? "سيتم التوصيل خلال 2 إلى 3 أيام." 
            : "سيتم التوصيل خلال 8 إلى 10 يومًا.";
    }

// دالة لحفظ تفاصيل الطلب
async function saveOrderDetails(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerAddress = document.getElementById('customer-address').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const walletNumber = walletNumberInput.value;
    const imageFile = uploadImageInput.files[0];

    let imageBase64 = null;
    if (paymentMethod !== "عند الاستلام" && imageFile) {
        imageBase64 = await getBase64(imageFile);
    }

    // حساب السعر الإجمالي
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const orderDetails = {
        customerName,
        customerAddress,
        customerPhone,
        paymentMethod,
        walletNumber,
        imageBase64,
        cart, // حفظ المنتجات في الطلب
        total, // السعر الإجمالي
        status: "قيد الانتظار"
    };

    // استرجاع الطلبات الحالية من localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // إضافة الطلب الجديد إلى المصفوفة
    orders.push(orderDetails);

    // حفظ الطلبات المحدثة في localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // عرض رسالة نجاح
    showToast(`تم إرسال الطلب بنجاح! ${calculateDeliveryTime(customerAddress)}`);

    // حذف السلة بعد إرسال الطلب
    localStorage.removeItem('cart');
    cart = []; // إفراغ السلة
    displayCartItems(); // تحديث عرض السلة

    // إخفاء الفورم بعد إرسال الطلب
    orderForm.style.display = 'none';
}

// دالة لتحويل الصورة إلى Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// دالة لحساب وقت التوصيل
function calculateDeliveryTime(address) {
    return (address.includes("القاهرة") || address.includes("الجيزة")) 
        ? "سيتم التوصيل خلال 2 إلى 3 أيام." 
        : "سيتم التوصيل خلال 8 إلى 15 يومًا.";
}

// دالة لإظهار التوست
function showToast(message, bgColor = "#28a745") {
    Toastify({
        text: message,
        duration: 4000,
        gravity: "top",
        position: "center",
        style: { background: bgColor, color: "white", padding: "10px" }
    }).showToast();
}

// ربط الفورم بدالة الحفظ
document.getElementById('order-details-form').addEventListener('submit', saveOrderDetails);

// عرض المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayCartItems);