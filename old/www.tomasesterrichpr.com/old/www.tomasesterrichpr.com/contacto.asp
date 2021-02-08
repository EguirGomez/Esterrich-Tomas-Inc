<%
' Autor:       Noel R�a Matos
' Date:        20/02/2012
' Description: Script que envia correos a los clientes de webhostings a trav�s de sus formularios de contacto.
'              Revisar comentarios marcados con *PARAMETRO, estos par�metros deben ser seteados para cada cliente / server.

Const cdoSendUsingPickup = 1 'Enviar usando el SMTP local.
Const cdoSendUsingPort = 2 'Enviar email usando la red. (SMTP over the network).

Const cdoAnonymous = 0 'Do not authenticate
Const cdoBasic = 1 'basic (clear-text) authentication
Const cdoNTLM = 2 'NTLM

dim htmlBody

'*PARAMETRO: NOMBRE DEL CLIENTE
Const nombreNegocio = "Esterrich Tomas Inc"

'*PARAMETRO: DESTINATARIOS SEPARADOS POR ; (PUNTO Y COMA)
Const destinatario = "info@tomasesterrichinc.com; teinc341@gmail.com"

if URLDecode(Request.QueryString("email")) <> "" then
    emailfrom = URLDecode(Request.QueryString("email"))
else
    emailfrom = ""
end if
'Response.Write(Request.QueryString["email"])


Set objMessage = CreateObject("CDO.Message")
objMessage.Subject = Request.QueryString("email") + request.querystring("id") +" Message sent through "+  ":" + nombreNegocio
objMessage.From = "apoyotecnicodigital@axesa.com"
objMessage.To = destinatario
objMessage.HTMLBody  = "<div>"+SetHtmlBody()+"<div>"

'==This section provides the configuration information for the remote SMTP server.

objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendusing") = 2

'Name or IP of Remote SMTP Server
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpserver") = "smtp.office365.com"

'Type of authentication, NONE, Basic (Base64 encoded), NTLM
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpauthenticate") = cdoBasic

'Your UserID on the SMTP server
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendusername") = "apoyotecnicodigital@axesa.com"

'Your password on the SMTP server
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/sendpassword") = "Axesa@2019"

'Server port (typically 25)
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpserverport") = 25

'Use SSL for the connection (False or True)
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpusessl") = True

'Connection Timeout in seconds (the maximum time CDO will try to establish a connection to the SMTP server)
objMessage.Configuration.Fields.Item _
("http://schemas.microsoft.com/cdo/configuration/smtpconnectiontimeout") = 60

objMessage.Configuration.Fields.Update

'==End remote SMTP server configuration section==

objMessage.Send

if err<>0 then

Response.Write(err.Number&"<br />")
Response.Write(err.Description&"<br />")
Response.Write(err.Source&"<br />")
Response.Write("<br />El servicio de correo no esta disponible, trate mas tarde.<br/>")
else
response.write "Gracias por contactarnos, contestaremos lo antes posible."
end if


'==FIN DE LA CONFIGURACION==


'objMessage.Send
'Esto es para traducir los nombres de los campos
function SetHtmlBody()
     dim campo,valor

     For Each Key in Request.QueryString
        campo = Key
        valor = URLDecode(Request.QueryString(Key))

        if campo = "fullname" then
            campo = "Nombre Completo"
        end if

        if campo = "email" then
            campo = "Correo electronico"
        end if

        if campo = "phone" then
            campo = "Telefono"
        end if

        if Key = "cellular" then
            Key = "Movil"
        end if

        if Key = "companyname" then
            Key = "Nombre De Compa��a"
        end if
        if campo = "Message" then
            campo = "Mensaje"
        end if

        if Key = "" then
            Key = ""
        end if

        dim contenthtml
        contenthtml = contenthtml + "<span>"+ campo + ": " + valor + "</span>"
        contenthtml = contenthtml + "<br/>"

        SetHtmlBody = contenthtml
     Next
end function

Function URLDecode(str)
    str = Replace(str, "+", " ")
    For i = 1 To Len(str)
        sT = Mid(str, i, 1)
        If sT = "%" Then
            If i+2 < Len(str) Then
                sR = sR & _
                    Chr(CLng("&H" & Mid(str, i+1, 2)))
                i = i+2
            End If
        Else
            sR = sR & sT
        End If
    Next
    URLDecode = sR
End Function

%>