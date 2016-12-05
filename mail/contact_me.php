<?php
// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'www.luisplata@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$subject="Te contactaron!";
$email_subject = "Correo y nombre del remitente: $email_address - $name";
$email_body = "De la pagina de hoja de vida en el servidor, reciviste un correo con el siguiente reporte.\n\n"."Detalles:\n\nName: $name\n\nEmail: $email_address\n\nMessage:\n$message";
mail($to,$email_subject,$email_body.$message);
return true;			
?>