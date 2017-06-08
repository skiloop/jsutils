
function js_sort(beautified_js)
{
    var lines=beautified_js.split('\n');
    // result set
    var rs={'command':'','func':[],'cur':0,'out':''};
    var tmp;
    var state=0;//0 start, 1 command, 2 function
    function rs_add_part(){
        switch(state){
            case 1:rs.command+='\n'+tmp;break;
            case 2:rs.func[rs.cur++]=tmp;break;
        }
    }

    for(var i=0;i<lines.length;i++){
        if(lines[i].match(/^function/)!=null){
            rs_add_part();
            tmp=lines[i];
            state=2;
        }else if(null!=lines[i].match(/^\s*?$/)){
        }else if(null!=lines[i].match(/^[\s\}]/)){
            tmp+='\n'+lines[i];
            if(null!=lines[i].match(/^\}\s*?\(/))state=1;
        }else{
            rs_add_part();
            state=1;
            tmp=lines[i];
        }

    }
    rs_add_part();
    rs.out=rs.command;
    rs.func=rs.func.sort(function(a,b){return a.length>=b.length;});
    for(var i=0;i<rs.func.length;i++){
        rs.out+='\n'+rs.func[i];
    }
    return rs.out;
}
