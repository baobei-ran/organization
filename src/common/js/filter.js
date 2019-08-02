import vue from 'vue'
import moment from 'moment/moment';
vue.filter('money', function(val) { // 千分位金钱转换加逗号
    val = val.toString().replace(/\$|\,/g,'');
    if(isNaN(val)) {
      val = "0";  
    } 
    var sign = (val == (val = Math.abs(val)));
    val = Math.floor(val*100+0.50000000001);
    var cents = val%100;
    val = Math.floor(val/100).toString();
    if(cents<10) {
       cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length-(1+i))/3); i++) {
        val = val.substring(0,val.length-(4*i+3))+',' + val.substring(val.length-(4*i+3));
    }

    return (((sign)?'':'-') + val + '.' + cents);
})

vue.filter('moment', function (value, formatString) {
    if (!value) {
      return ''
    }
    formatString = formatString || 'YYYY-MM-DD HH:mm';
    return moment.unix(value).format(formatString); // 这是时间戳转时间
});

vue.directive('enterNumber2', { // 输入金额的限制
    inserted: function (el) {
      el.addEventListener("keypress",function(e){
        e = e || window.event;
        let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
        let re = /\d/;
        if(charcode == 46){
          if(el.value.includes('.')){
            e.preventDefault();
          }
          return;
        }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
          if(e.preventDefault){
            e.preventDefault();
          }else{
              e.returnValue = false;
          }
        }
      });
    }
  });
