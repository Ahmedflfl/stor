// تحديد عناصر النموذج
const loginForm = document.querySelector('form');
const usernameInput = document.querySelector('input[name="username"]');
const passwordInput = document.querySelector('input[name="password"]');

// التعامل مع الحدث عند محاولة تسجيل الدخول
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للنموذج

    // جلب القيم المدخلة
    const enteredUsername = usernameInput.value.trim(); // إزالة المسافات الزائدة
    const enteredPassword = passwordInput.value.trim();

    // بيانات الأدمن الثابتة
    const adminUsername = "صابر محمد فلفل";
    const adminPassword = "123456";

    // استرجاع البيانات المخزنة في localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // التحقق إذا كان المستخدم هو الأدمن
    if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
        Swal.fire({
            icon: 'success',
            title: 'مرحبًا مشرف النظام!',
            showConfirmButton: false,
            timer: 1500
        });

        // تخزين بيانات الأدمن في الجلسة
        sessionStorage.setItem('loggedInUser', adminUsername);
        sessionStorage.setItem('userRole', 'admin');

        // توجيه الأدمن إلى لوحة التحكم
        setTimeout(() => {
            window.location.href = './admin-dashboard.html';
        }, 1500);

        return; // الخروج من الدالة
    }

    // التحقق من وجود مستخدم بنفس البيانات
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

        // تخزين بيانات المستخدم في الجلسة
        sessionStorage.setItem('loggedInUser', enteredUsername);
        sessionStorage.setItem('userRole', 'user');

        // توجيه المستخدم العادي إلى الصفحة الرئيسية
        setTimeout(() => {
            window.location.href = './home.html';
        }, 1500);
    } else {
        // إذا كانت البيانات غير صحيحة
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
        });
    }

    // إعادة تعيين الحقول
    loginForm.reset();
});
