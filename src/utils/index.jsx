
//对象判空

export const objectIsNull=(val )=>{
    if (val == undefined || val == null || val == "" || val == ''
        || val == "undefined" || val == "null" || val == "NULL") {
        return true+"";
    }
    return false+"";

}

export function getNowFormatDate() {//获取当前时间
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    let strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    let hours=date.getHours()<10?"0" + date.getHours():date.getHours();
    let minutes= date.getMinutes()<10?"0" + date.getMinutes():date.getMinutes();
    let seconds=date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    let currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
        + " "  +  hours  + seperator2  + minutes
        + seperator2 + seconds;
    return currentdate;
}


export function get_thousand_num(num) {
    return (num || 0).toString().replace(/\d+/, function (n) {
        var len = n.length;
        if (len % 3 === 0) {
            return n.replace(/(\d{3})/g, ',$1').slice(1);
        } else {
            return n.slice(0, len % 3) + n.slice(len % 3).replace(/(\d{3})/g, ',$1');
        }
    });
}


export const fmoney=({s, n})=>
{
    n = n > 0 && n <=20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    let t = "";
    for(let i = 0; i < l.length; i ++ )
    {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
}



// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};