<?php
// Replace contact@example.com with your real receiving email address
$receiving_email_address = 'deb.limad@gmail.com';

// Verifica se o formulário foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se os campos do formulário foram definidos
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
        // Carrega a biblioteca de formulário de e-mail
        $php_email_form = '../assets/vendor/php-email-form/php-email-form.php';
        if (file_exists($php_email_form)) {
            include($php_email_form);

            // Cria uma instância do formulário de e-mail PHP
            $contact = new PHP_Email_Form;
            $contact->ajax = true;

            // Define os destinatários e detalhes do e-mail
            $contact->to = $receiving_email_address;
            $contact->from_name = $_REQUEST['name'];
            $contact->from_email = $_REQUEST['email'];
            $contact->subject = $_REQUEST['subject'];

            // Descomente para configurar o SMTP, se necessário
            /*
            $contact->smtp = array(
                'host' => 'example.com',
                'username' => 'example',
                'password' => 'pass',
                'port' => '587'
            );
            */

            // Adiciona as mensagens ao e-mail
            $contact->add_message($_POST['name'], 'From');
            $contact->add_message($_POST['email'], 'Email');
            $contact->add_message($_POST['message'], 'Message', 10);

            // Envia o e-mail e exibe o resultado
            echo $contact->send();
        } else {
            echo 'Unable to load the "PHP Email Form" Library!';
        }
    } else {
        echo 'Incomplete form data!';
    }
} else {
    echo 'Form submission method not allowed!';
}
?>
