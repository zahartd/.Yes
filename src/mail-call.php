<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$phone = $_POST['user_phone'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->SMTPDebug  = 3;
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'zturulin@bk.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '2590t2590T'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('zturulin@bk.ru'); // от кого будет уходить письмо?
$mail->addAddress('zahartd22@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка на консультацию';
$mail->Body    = "Кто-то оставил заявку на звонок, его телефон" .$phone;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
    echo "Mailer Error: " . $mailer->ErrorInfo;
} else {
    header('location: thank-you.html');
}
?>