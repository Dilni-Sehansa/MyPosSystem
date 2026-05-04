function expandBox() {
    const container = document.getElementById('login-container');
    const wrapper = document.getElementById('main-content-border');
    if (!container.classList.contains('expanded')) {
        container.classList.add('expanded');
        document.getElementById('start-label').style.display = 'none';
        setTimeout(() => {
            wrapper.style.display = 'flex';
            wrapper.style.opacity = '1';
        }, 600);
    }
}

$(document).ready(function () {
    $('#login-btn').click(function (e) {
        e.preventDefault();
        let username = $('#user-input').val();
        let password = $('#pass-input').val();

        if (username === 'admin' && password === '1234') {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                $('#Login-content').hide();
                $('#main-app').show();
            });
        } else {
            Swal.fire("Error", "Invalid Username or Password!", "error");
        }
    });

});