$(function () {
    $('#zc').on('click', function () {
        $('.zc-box').show()
        $('.dl-box').hide()
    })
    $('#dl').on('click', function () {
        $('.dl-box').show()
        $('.zc-box').hide()
    })

    let form = layui.form
    let layer = layui.layer
    form.verify({
         pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            let pwd = $('.zc-box [name=password]').val()
            console.log(pwd || 1);
            if (pwd !== value) {
                return '两次密码不一样'
            }
        }
    })

    $('#form_zc').on('submit', function (e) {
        e.preventDefault()
        const data = { username: $('#form_zc [name=username]').val(), password: $('#form_zc [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            $('#dl').click()
        })
    })
    $('#form_dl').on('submit', function (e) {
        console.log(11)
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res){
                console.log(22)
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token)
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
    


})