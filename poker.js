$(function () {
    // let  poke = [{color:'',number:1}];
    let  poke =[];
    let colorArr = ['s','h','d','c'];
    let  flag ={};
    let box = $('.box')
    // for (let i=0;i<52;i++){
    //     let index =Math.floor(Math.random()* colorArr.length);
    //      let  color = colorArr[index];
    //      let  number = Math.round(Math.random()*12+1);
    //      // poke.push({color,number})
    //
    //     while (flag[color+'_'+number]){
    //         index =Math.floor(Math.random()* colorArr.length)
    //           color = colorArr[index];
    //           number = Math.round(Math.random()*12+1);
    //     }
    //     poke.push({color,number});
    //     flag[color+'_'+number]=true;
    // }
    // console.log(poke);
    while (poke.length<52) {
        let index = Math.floor(Math.random() * colorArr.length);
        let color = colorArr[index];
        let number = Math.round(Math.random() * 12 + 1);
        if (!flag[color + '_' + number]) {
            poke.push({color, number});
            flag[color + '_' + number] = true;
        }
    }
    console.log(poke);
    // 发牌
    // （i，j）
    //top i*100
    // left 350-50*i+100*j
    // $('<div>').addClass('box')
    //     .css({backgroundImage:'url(1.mp4)'})
    // console.log(1);
    let index =-1;
    for (let i=0; i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj= poke[index]
            let  lefts =350-50*i+100*j,tops=10+50*i
            $('<div>').addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                // .html('')
                .appendTo('.box')
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*100)
                .animate({left:lefts,top:tops,opacity:1})
        }
    }
    for (;index<52;index++){
        let obj= poke[index]
        $('<div>')
            .addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            // .html('')
            .appendTo('.box')
            .data('number',obj.number)
            .attr('id',-2+'_'-2)
            // .delay(index*10)
            .animate({left:20,top:450,opacity:1})
    }let first = null
    box.on('click','.poke',function () {
        let  _this =$(this);
        let [i,j] = _this.attr('id').split('_')

        //string ->强制类型转换Number(i) parseInt
        //隐式类型转换
        let  id1 = i*1+1+'_'+j,id2=i*1+1+'_'+(j*1+1)
        console.log(i, j);
        console.log(id1, id2);
        console.log($('#' + id1).length);
        console.log($('#' + id2).length);
        if ($('#'+id1).length|| $('#'+id2).length){
            // id1=0;
            // id2=0
            return
        }
        if (_this.hasClass('active')){
            $(this).removeClass('active').animate(({top: '+=30px'}))
        } else {
            $(this).addClass('active').animate(({top: '-=30px'}))
        }
        if (!first){
            first = _this
        }
        else {
            let  number1 =first.data('number')
            let  number2 =_this.data('number')
            if (number1+number2===14){$('.active').animate({top: 0,left:710,opacity:0},function () {
                $(_this).remove()
            })}else {
                $('.active').animate({top: '+=30px'},function () {
                    $(this).removeClass('active')
                })
            }
            // first.data('number') _this.data('number');
            first = null
        }
    })
    let  n =0
    $('.right').on('click',function () {
        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            console.log(11);
            $(this).removeClass('left').addClass('right1')
        })

    })

    $('.leftbtn').on('click',function () {

        $('.right1').first().animate({left:20},function () {
            // console.log(11);
            $(this).removeClass('right1').addClass('left').css('zIndex',0)
        })

    })
})