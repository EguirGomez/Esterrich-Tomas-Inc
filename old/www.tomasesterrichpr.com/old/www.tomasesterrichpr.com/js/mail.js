function ValidateForm(a){var b=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,c=document.getElementById(a).email.value,d=document.getElementById(a).fullname.value;return 0==b.test(c)?(alert("Por favor ingrese un email correcto."),!1):!(d=d.length<=2)||(alert("Por favor ingrese su nombre correcto."),!1)}function handleHttpResponse(){4==http.readyState&&200==http.status&&http.responseText.indexOf("invalid")==-1&&(results=http.responseText,document.getElementById("formulario")?document.getElementById("formulario").innerHTML=results:alert("Gracias por contactarnos, contestaremos lo antes posible."),enProceso=!1)}function GetInputsValues(a){var b,c,d,e,f="";for(b=document.getElementById(a),c=b.getElementsByTagName("input"),e=b.getElementsByTagName("textarea"),d=0;d<c.length;++d)"text"==c[d].type&&(f+=c[d].id+"="+c[d].value,f+="&");return e.length>0&&(f+="Comentarios="+e[0].value),f+="&id="+a}function ResetForm(a){var b,c,d;for(b=document.getElementById(a),c=b.getElementsByTagName("input"),d=b.getElementsByTagName("textarea"),index=0;index<c.length;++index)"text"==c[index].type&&(c[index].value="");for(idx=0;idx<d.length;++idx)d[idx].value=""}function SendEmail(a){if(ValidateForm(a)&&!enProceso&&http){var b="";b=GetInputsValues(a);var c=a+".asp?"+b;http.open("GET",encodeURI(c),!0),http.onreadystatechange=handleHttpResponse,enProceso=!0,http.send(null),ResetForm(a)}}function getHTTPObject(){var a;if(!a&&"undefined"!=typeof XMLHttpRequest)try{a=new XMLHttpRequest}catch(b){a=!1}return a}var enProceso=!1,http=getHTTPObject();