$(function(){
    let form = layui.form

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
       samepwd: function (value) {
           if (value === $('[name=oldPwd]').val()) {
               return '新旧密码不能相同！'
           }
       },
       repwd: function (value) {
           if (value !== $('[name=newPwd]').val()) {
               return '两次密码不一致！'
           }
       }
   })


   $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/updatepwd',
        data:$(this).serialize(),
        success(res){
            if(res.status !== 0){
                return layer.msg('更新密码失败！')
            }
            layer.msg('更新密码成功！')
            $('.layui-form')[0].reset()
        }
    })
})

// $('.layui-form').on('submit',function (e) {
//     e.preventDefault()
//     $.ajax({
//         method:'POST',
//         url:'/my/updatepwd',
//         data: form.val('pwdForm'),
//         success(res){
//             if(res.status!==0) return layer.msg('修改密码失败')
//             layer.msg('修改密码成功')
//         }
//     })
// })
})