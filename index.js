// تحديد عناصر النموذج
const loginForm = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// زر الدخول كزائر
const guestLink = document.querySelector('a[href="./home.html"]:not([rel])'); // تحديد رابط الزائر تحديدًا

// التعامل مع الحدث عند محاولة تسجيل الدخول
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للنموذج

    // جلب القيم المدخلة
    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // بيانات الأدمن الثابتة
    const adminUsername = "صابر محمد فلفل";
    const adminPassword = "123456";

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
        Swal.fire({
            icon: 'success',
            title: 'مرحبًا مشرف النظام!',
            showConfirmButton: false,
            timer: 1500
        });

        // تخزين بيانات الأدمن كمستخدم حالي
        localStorage.setItem('currentUser', JSON.stringify({ name: adminUsername, role: 'admin' }));

        setTimeout(() => {
            window.location.href = './admin-dashboard.html';
        }, 1500);

        return;
    }

    const userFound = storedUsers.find(user => 
        user.name === enteredUsername && user.password === enteredPassword
    );

    if (userFound) {
        Swal.fire({
            icon: 'success',
            title: 'تم تسجيل الدخول بنجاح!',
            showConfirmButton: false,
            timer: 1500
        });

        localStorage.setItem('currentUser', JSON.stringify(userFound));

        setTimeout(() => {
            window.location.href = './home.html';
        }, 1500);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
        });
    }

    loginForm.reset();
});

// التعامل مع الدخول كزائر
guestLink.addEventListener('click', (e) => {
    e.preventDefault(); // منع الانتقال المباشر
    localStorage.setItem('currentUser', JSON.stringify({ name: "زائر", role: "guest" }));
    window.location.href = './home.html';
});
