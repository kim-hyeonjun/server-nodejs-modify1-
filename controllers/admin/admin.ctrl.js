const models = require('../../models');


exports.get_products = ( _ , res) => {

    models.Products.findAll({



    }).then((productList)=> {

         res.render('admin/products.html',{message : "안녕하세요 로그인해주세요",productList : productList})

    });


}

















exports.get_login = ( _ , res) => {
    
    models.id_details.findAll(
        { where:{ name:sess.username } }

    ).then((dataList)=> {

         res.render('admin/login.html',{id : sess.username ,dataList : dataList})

    });

}






















exports.post_products = ( req , res ) => {
   
    var reqID = req.body.name;
    var reqPassword = req.body.price;
   

    //아이디  확인
    models.Products.findOne({ where:{ name:reqID } })
        .then(function(data)
        {
            // 해당 ID의 자료가 없는 경우
            if( data == null || data == undefined ) {
                console.log("로그인 자료가 없습니다. ID:" + reqID);
                var data = {success:false, msg:'아이디가 없습니다. 뒤로가기를 눌러주세요'};
                res.json(data);
                return;
            }

            if( data.price != reqPassword ) {
                console.log("로그인 암호가 틀립니다. ID:" + reqID);
                var data = {success:false, msg:'비밀번호가 틀립니다. 뒤로가기를 눌러주세요'};
                res.json(data);

            }else{
                console.log("로그인 성공되었습니다. ID:" + reqID);
                // 세션에 필요한 정보 설정
                console.log(req.body);
                
                sess = req.session;
               
                sess.userid = reqID;

                sess.username = data.name;

                console.log('set session :' + sess);

                console.log(sess.userid);
                sess.save(function(){                   
                    res.redirect('/admin/login');
                });
            }
        })
        .catch(function (err) {
            console.log('로그인 프로세스 오류. : ' + err);
        })
}










exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}
//아이디 생성할때 ㅇㅇ
exports.post_products_write = ( req , res ) => {
    //res.send(req.body);
models.Products.create({
name : req.body.name,
price : req.body.price,
description : req.body.description


}).then(()=>{

    res.redirect('/admin/products');
});

}