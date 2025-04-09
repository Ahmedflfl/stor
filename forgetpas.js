// التعامل مع الحدث عند إرسال النموذج
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للنموذج

    // الحصول على البريد الإلكتروني أو اسم المستخدم المدخل
    const emailOrUsername = document.getElementById('email').value;

    // جلب المستخدمين المخزنين في localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // البحث عن المستخدم في البيانات المخزنة
    const user = storedUsers.find(user => user.email === emailOrUsername || user.name === emailOrUsername);

    if (user) {
        // إذا تم العثور على المستخدم، عرض كلمة المرور بلون أخضر باستخدام SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'تم العثور على المستخدم',
            text: `كلمة المرور الخاصة بك هي: ${user.password}`,
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#3085d6',
        });
    } else {
        // إذا لم يتم العثور على المستخدم، عرض رسالة خطأ بلون أحمر باستخدام SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'البريد الإلكتروني أو اسم المستخدم غير موجود.',
            confirmButtonText: 'حسنًا',
            confirmButtonColor: '#d33',
        });
    }
})