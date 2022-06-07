<?php

if(isset($_REQUEST["submit"])) {
    $name = $_REQUEST["name"];
    $email = $_REQUEST["email"];
    $message = $_REQUEST["message"];

    if(!empty($name) && !empty($email) && !empty($message)) {
        $to = "colin.lienard87@orange.fr";
        $subject = "Message envoyé par " . $name . ".";
        $body = "Nom : " . $name . "\nAdresse mail : " . $email . "\n\n" . $message;

        $mail = mail($to, $subject, $body);

        if($mail == true) {
            header("Location: /?mailsend=yes#section-5");
            exit;
        }
        else if($mail == false)
            header("Location: /?mailsend=problem#section-5");
    }

    else
        header("Location: /?mailsend=no#section-5");
}

?>