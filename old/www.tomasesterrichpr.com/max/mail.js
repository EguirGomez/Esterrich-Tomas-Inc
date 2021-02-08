// JavaScript Document



    

    function ValidateForm(id) {

        //document.getElementById(id).email.value

        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        var email = document.getElementById(id).email.value;

        var fullname = document.getElementById(id).fullname.value;

        if (reg.test(email) == false) { alert('Por favor ingrese un email correcto.'); return false; }

        if (fullname = '' || fullname.length <= 2) {alert('Por favor ingrese su nombre correcto.');  return false; }



        return true;

    }



    function handleHttpResponse() {

        if (http.readyState == 4) {

            if (http.status == 200) {

                if (http.responseText.indexOf('invalid') == -1) {

                    results = http.responseText;



                    if (document.getElementById("formulario"))

                        document.getElementById("formulario").innerHTML = results;

                    else

                        alert('Gracias por contactarnos, contestaremos lo antes posible.');

                        

                    enProceso = false;

                }

            }

        }

    }



    function GetInputsValues(id) {

        var container, inputs, index,comments;

        var querystring = "";



        container = document.getElementById(id);

        inputs = container.getElementsByTagName('input');
        comments = container.getElementsByTagName('textarea');

        for (index = 0; index < inputs.length; ++index) {

            if(inputs[index].type == 'text')

            {

                querystring += inputs[index].id + '=' + inputs[index].value;

                querystring += "&";

            }

        }

        if (comments.length > 0)
            querystring += 'Comentarios=' + comments[0].value;

        querystring += "&id=" + id;

        return querystring;

    

    }

    function ResetForm(id) 
    {
        var container, inputs,txtAreas;
        
        container = document.getElementById(id);

        inputs = container.getElementsByTagName('input');
        txtAreas = container.getElementsByTagName('textarea');

        for (index = 0; index < inputs.length; ++index) 
        {
            if (inputs[index].type == 'text')  
                inputs[index].value ='';
        }

        for (idx = 0; idx < txtAreas.length; ++idx) {
            //if (inputs[index].type == 'text')
            txtAreas[idx].value = '';
        }
    }


    function SendEmail(id) {

        //alert(document.getElementById(id).email.value);

        if (ValidateForm(id)) 
        {

            if (!enProceso && http) {

                var querystring = "";

                querystring = GetInputsValues(id);

                var url = id + ".asp?" + querystring;

                http.open("GET", encodeURI(url), true);

                http.onreadystatechange = handleHttpResponse;

                enProceso = true;

                http.send(null);

                ResetForm(id);

            }

        }

    }



    function getHTTPObject() {

        var xmlhttp;



        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {

            try {

                xmlhttp = new XMLHttpRequest();

            } catch (e) { xmlhttp = false; }

        }

        return xmlhttp;

    }

    var enProceso = false;

    var http = getHTTPObject(); 
    
