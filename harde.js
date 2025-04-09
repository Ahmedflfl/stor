// مصفوفة لتخزين المنتجات في السلة
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// تحديث واجهة المستخدم للسلة
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); // حساب العدد الكلي للمنتجات
  cartCountElement.textContent = totalItems; // تحديث العدد بناءً على الكمية
}

// دالة لإضافة المنتجات إلى السلة
function addToCart(name, price) {
  const isProductInCart = cart.some(item => item.name === name); // شوف لو المنتج موجود في السلة

  if (isProductInCart) {
    // إذا كان المنتج موجودًا في السلة
    Toastify({
      text: "تم الإضافة بالفعل", // نص الرسالة
      duration: 3000, // مدة ظهور الرسالة (3 ثواني)
      close: true, // عرض زر إغلاق
      gravity: "top", // الرسالة تظهر من أعلى
      position: "right", // الرسالة تظهر من اليمين
      backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)", // لون الخلفية
      stopOnFocus: true, // الرسالة مش بتختفي لو المستخدم مرر الماوس عليها
    }).showToast();
  } else {
    // إذا لم يكن المنتج موجودًا في السلة
    cart.push({ name, price, quantity: 1 }); // إضافة المنتج إلى السلة
    localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة في الـ Local Storage
    updateCartCount(); // تحديث عدد العناصر في السلة
  
    Toastify({
      text: "تمت إضافة المنتج إلى السلة", // نص الرسالة
      duration: 3000, // مدة ظهور الرسالة (3 ثواني)
      close: true, // عرض زر إغلاق
      gravity: "top", // الرسالة تظهر من أعلى
      position: "right", // الرسالة تظهر من اليمين
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // لون الخلفية
      stopOnFocus: true, // الرسالة مش بتختفي لو المستخدم مرر الماوس عليها
    }).showToast();
  }
}

// ربط الأحداث بكل الأزرار
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name"); // جلب اسم المنتج
    const price = button.getAttribute("data-price"); // جلب السعر
    addToCart(name, price); // إضافة المنتج إلى السلة
  });
});

// تحديث عدد المنتجات في السلة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});




// زر التفصيل
document.addEventListener("DOMContentLoaded", function () {
  let detailButtons = document.querySelectorAll(".btn.details");

  // إنشاء نافذة التفاصيل مرة واحدة فقط
  let detailsDiv = document.createElement("div");
  detailsDiv.classList.add("product-details");
  document.body.appendChild(detailsDiv);

  detailButtons.forEach(button => {
      button.addEventListener("click", function () {
          // العثور على العنصر الأب الذي يحتوي على بيانات المنتج
          let productDiv = this.closest(".category");

          // استخراج البيانات من العنصر
          let productName = productDiv.getAttribute("data-name");
          let productDescription = productDiv.getAttribute("data-description");
          let productImage = productDiv.querySelector("img").getAttribute("src");
          let productPrice = productDiv.querySelector("h5").textContent;
          let productRating = productDiv.getAttribute("data-rating");

          // تحويل التقييم الرقمي إلى نجوم
          let stars = "⭐".repeat(productRating);

          // تحديث محتوى نافذة التفاصيل
          detailsDiv.innerHTML = `
              <button class="close-btn">إغلاق</button>
              <h5>${productName}</h5>
              <img src="${productImage}" alt="${productName}" style="width: 100%; border-radius: 10px;">
              <p>${productDescription}</p>
              <h5 class="text-danger">${productPrice}</h5>
              <div class="star-rating">${stars}</div>
                  
            
          `;

          // إظهار النافذة من الجانب
          detailsDiv.classList.add("show");

          // زر الإغلاق داخل النافذة
          detailsDiv.querySelector(".close-btn").addEventListener("click", function () {
              detailsDiv.classList.remove("show");
          });
      });
  });

  // إغلاق النافذة عند الضغط خارجها
  document.addEventListener("click", function (event) {
      // التأكد من أن النقر لم يكن داخل نافذة التفاصيل أو زر "تفاصيل المنتج"
      if (!detailsDiv.contains(event.target) && !event.target.classList.contains("details")) {
          detailsDiv.classList.remove("show");
      }
  });
});






// ايكون المستخدم
document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.getElementById("user-icon");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const userName = document.getElementById("user-name");
  const logoutBtn = document.getElementById("logout-btn");

  // جلب بيانات المستخدم من localStorage
  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  if (storedUsers.length > 0) {
      userName.textContent = storedUsers[storedUsers.length - 1].name; // عرض آخر مستخدم مسجل
  } else {
      userName.textContent = "زائر";
  }

  // إظهار / إخفاء القائمة عند النقر على أيقونة المستخدم
  userIcon.addEventListener("click", () => {
      dropdownMenu.parentElement.classList.toggle("active");
  });

  // تسجيل الخروج
  logoutBtn.addEventListener("click", () => {
      // عرض رسالة تأكيد باستخدام SweetAlert2
      Swal.fire({
          title: 'هل أنت متأكد؟',
          text: 'هل تريد تسجيل الخروج؟',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'نعم، سجل الخروج',
          cancelButtonText: 'إلغاء'
      }).then((result) => {
          if (result.isConfirmed) {
              // تحويل المستخدم إلى صفحة تسجيل الدخول بدون حذف البيانات
              window.location.href = "./index.html";
          }
      });
  });
});








 
