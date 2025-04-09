// تحديد عناصر النموذج
const form = document.querySelector('.signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// التعامل مع الحدث عند إرسال النموذج
form.addEventListener('submit', (e) => {
    e.preventDefault(); // منع الإرسال الافتراضي للنموذج

    // التحقق من تطابق كلمة المرور مع تأكيدها
    if (passwordInput.value !== confirmPasswordInput.value) {
        Swal.fire({
            icon: 'error', // أيقونة الخطأ
            title: 'خطأ',
            text: 'كلمة المرور وتأكيدها غير متطابقين. يرجى التأكد.',
            confirmButtonText: 'حسناً'
        });
        return; // إيقاف الإجراء
    }

    // جلب البيانات المدخلة
    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    // الحصول على البيانات الحالية المخزنة في localStorage
    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // إضافة البيانات الجديدة
    storedUsers.push(userData);

    // تخزين البيانات في localStorage
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // إعادة تعيين الحقول بعد الحفظ
    form.reset();

    // عرض رسالة تأكيد باستخدام SweetAlert2
    Swal.fire({
        icon: 'success', // أيقونة النجاح
        title: 'تم التسجيل بنجاح!',
        text: 'تم حفظ بياناتك بنجاح.',
        showConfirmButton: false,
        timer: 1500 // إغلاق التنبيه تلقائيًا بعد 1.5 ثانية
    });

    // عرض رسالة ترحيب باستخدام Toastify
    Toastify({
        text: `مرحبًا ${userData.name}!`, // رسالة الترحيب مع اسم المستخدم
        duration: 3000, // مدة ظهور الرسالة (3 ثوانٍ)
        close: true, // إظهار زر الإغلاق
        gravity: "top", // موقع الرسالة (أعلى الصفحة)
        position: "center", // محاذاة الرسالة (في المنتصف)
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // لون الخلفية
        stopOnFocus: true, // إيقاف الإغلاق التلقائي عند التركيز على الرسالة
    }).showToast();

    // توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية
    setTimeout(() => {
        window.location.href = './home.html';
    }, 2000);
});

// استرجاع وعرض البيانات من localStorage (اختياري)
document.addEventListener('DOMContentLoaded', () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    console.log('المستخدمون المخزنون:', storedUsers);
});