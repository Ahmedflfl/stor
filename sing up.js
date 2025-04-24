// تحديد عناصر النموذج
const form = document.querySelector('.signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

// التعامل مع الحدث عند إرسال النموذج
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (passwordInput.value !== confirmPasswordInput.value) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'كلمة المرور وتأكيدها غير متطابقين. يرجى التأكد.',
            confirmButtonText: 'حسناً'
        });
        return;
    }

    const userData = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    };

    let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // ✅ تخزين المستخدم الحالي
    localStorage.setItem('currentUser', JSON.stringify(userData));

    form.reset();

    Swal.fire({
        icon: 'success',
        title: 'تم التسجيل بنجاح!',
        text: 'تم حفظ بياناتك بنجاح.',
        showConfirmButton: false,
        timer: 1500
    });

    Toastify({
        text: `مرحبًا ${userData.name}!`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();

    setTimeout(() => {
        window.location.href = './home.html';
    }, 2000);
});
