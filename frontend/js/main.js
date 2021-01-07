showLoggedInButtons = () => {
    $('#login-btn').hide()
    $('#register-btn').hide()
    $('#logout-btn').show()
    $('#admin-btn').show()
    $('#user-info').html(`
    <hr>
    <h4><i class="fal fa-user"></i> خوش آمدید
    ${window.localStorage.email}
    </h4>
    `)
}

showLoggedOutButtons = () => {
    $('#login-btn').show()
    $('#register-btn').show()
    $('#logout-btn').hide()
    $('#admin-btn').hide()
    $('#user-info').html('')
}

// getUserInfo

jQuery(document).ready(function ($) {
    const $sidebar = $("#sidebar");
    const $menuToggleBtn = $("#toggle-menu-btn");

    $menuToggleBtn.on('click', function () {
        $sidebar.trigger('menu:toggle');
        $menuToggleBtn.toggleClass('fa-times', 'fa-bars');
    });

    $sidebar.on('menu:toggle', function () {
        if ($menuToggleBtn.hasClass('fa-times')) {
            $sidebar.trigger('menu:close');
        } else {
            $sidebar.trigger('menu:open');
        }
    }).on('menu:open', function () {
        $sidebar.addClass('open-sidebar');
    }).on('menu:close', function () {
        $sidebar.removeClass('open-sidebar');
    });

    if (window.localStorage.token === undefined) {
        showLoggedOutButtons()
    } else {
        showLoggedInButtons()
    }
});

// Modal
function openModal(state) {
    $(`#${state}-tab-btn`).click()
    document.getElementById('modal').classList.add('active-modal');
}
function closeModal() {
    document.getElementById('modal').classList.remove('active-modal');
    $('#dismiss-alert').click()
}

showLoginAlert = (message, style='danger') => {
    $('#alert-zone').html(`
        <div id="login-alert" class="alert alert-${style} alert-dismissible fade show mx-auto" style="display:none;" role="alert">
            <button id="dismiss-alert" type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            ${message}
        </div>
    `);

    $('#login-alert').slideDown("fast");
}

openAdmin = () => {
    window.location.href = '/admin/'
}

logout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('email')
    showLoggedOutButtons()
}

loginDone = (email, response) => {
    window.localStorage.token = response.token
    window.localStorage.email = email
    showLoginAlert('Login successful', 'success')
    showLoggedInButtons()
    closeModal()
}

login = () => {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let email = $('#login-email-input').val();
    let password = $('#login-password-input').val();

    if (email == '') {
        showLoginAlert('لطفا ایمیل خود را وارد کنید!')
        return;
    }

    if (!emailReg.test(email)) {
        showLoginAlert('لطفا یک ایمیل متعبر وارد کنید!')
        return;
    }

    if (password == '') {
        showLoginAlert('لطفا رمز عبور خود را وارد کنید!')
        return;
    }

    $('#dismiss-alert').click();

    $.ajax({
        method: 'POST',
        url: '/api/signin/',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password
        })
    })
        .done(response => loginDone(email, response))
        .fail(response => {showLoginAlert(response.responseJSON.message)})
}

registerDone = (response) => {
    $('#login-tab-btn').click()
    showLoginAlert(response.message, 'success')
}

register = () => {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    let email = $('#register-email-input').val();
    let password = $('#register-password-input').val();
    let repeatPassword = $('#register-repeat-password-input').val();
    let acceptRules = $('#register-accept-rules').prop('checked');
    
    if (email == '') {
        showLoginAlert('لطفا ایمیل خود را وارد کنید!')
        return;
    }

    if (!emailReg.test(email)) {
        showLoginAlert('لطفا یک ایمیل متعبر وارد کنید!')
        return;
    }

    if (password == '') {
        showLoginAlert('لطفا رمز عبور خود را وارد کنید!')
        return;
    }

    if (password != repeatPassword) {
        showLoginAlert('رمز عبور و تکرار آن مطابقت ندارند!')
        return;
    }

    if (!acceptRules) {
        showLoginAlert('برای عضویت، قوانین و شرایط را بپذیرید!')
        return;
    }

    $('#dismiss-alert').click();

    $.ajax({
        method: 'POST',
        url: '/api/signup/',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password
        })
    })
        .done(response => registerDone(response))
        .fail(response => showLoginAlert(response.responseJSON.message))
}
