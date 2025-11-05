<?php
require_once __DIR__ . '/functions.php';

$logged_in = is_logged_in();
$settings = load_settings();

$cardapio_file = __DIR__ . '/cardapio.html';
if (!is_file($cardapio_file)) {
    renderStaticError('Erro - Cardapio', 'Nao foi possivel localizar o cardapio digital.');
}

$cardapio_html = file_get_contents($cardapio_file);
if ($cardapio_html === false) {
    renderStaticError('Erro - Cardapio', 'Encontramos o arquivo do cardapio, mas nao conseguimos carrega-lo.');
}

$whatsapp_digits = preg_replace('/\D+/', '', $settings['whatsapp_digits'] ?? '');
if ($whatsapp_digits === '') {
    $whatsapp_digits = preg_replace('/\D+/', '', $settings['phone'] ?? '');
}
if ($whatsapp_digits === '') {
    $whatsapp_digits = '5521997599132';
}
$cardapio_html = str_replace('https://wa.me/5521997599132', 'https://wa.me/' . $whatsapp_digits, $cardapio_html);

$php_links = [
    'index.html' => 'index.php',
    'cardapio.html' => 'menu.php',
    'curiosidades.html' => 'curiosidades.php',
    'contact.html' => 'contact.php',
    'admin.html' => 'admin.php',
    'login.html' => 'login.php',
    'register.html' => 'register.php',
];
$cardapio_html = str_replace(array_keys($php_links), array_values($php_links), $cardapio_html);

if ($logged_in) {
    $cardapio_html = str_replace('<a href="login.php">Entrar</a>', '', $cardapio_html);
    $cardapio_html = str_replace('<a href="register.php">Cadastrar</a>', '<a href="logout.php">Sair</a>', $cardapio_html);
} else {
    $cardapio_html = str_replace('<button type="button" class="pal-site-editor" id="pal-open-editor">Editar cardapio</button>', '', $cardapio_html);
}

$config = [
    'assetBaseUrl' => 'uploads/',
];
if ($logged_in) {
    $config['uploadEndpoint'] = 'upload_image.php';
}
$config_script = '<script>window.PALATARIUS_CONFIG = ' . json_encode($config, JSON_UNESCAPED_SLASHES) . ';</script>';
$cardapio_html = str_replace(
    '<script src="assets/js/settings.js" defer></script>',
    '<script src="assets/js/settings.js" defer></script>' . PHP_EOL . '  ' . $config_script,
    $cardapio_html
);

echo $cardapio_html;

function renderStaticError(string $title, string $message): void
{
    echo '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>' . htmlspecialchars($title) . '</title><style>body{font-family:Segoe UI,Arial,sans-serif;background:#0B0B0F;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}div{max-width:420px;text-align:center;}a{color:#FFD60A;text-decoration:none;font-weight:600;}</style></head><body><div><h1>' . htmlspecialchars($title) . '</h1><p>' . htmlspecialchars($message) . '</p><p><a href="index.php">Voltar para a pagina inicial</a></p></div></body></html>';
    exit;
}
