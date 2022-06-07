<?php

if(isset($_REQUEST["submit"])) {
    $name = $_REQUEST["name"];
    $email = $_REQUEST["email"];
    $message = $_REQUEST["message"];

    if(!empty($name) && !empty($email) && !empty($message) && $name != "Henrylip") {
        $to = "colin.lienard87@orange.fr";
        $subject = "Message envoyé par " . $name . ".";
        $body = "Nom : " . $name . "\nAdresse mail : " . $email . "\n\n" . $message;

        $mail = mail($to, $subject, $body);

        if($mail == true) {
            header("Location: /?mailsend=yes");
            exit;
        }
        else if($mail == false)
            header("Location: /?mailsend=no");
    }
}

?>