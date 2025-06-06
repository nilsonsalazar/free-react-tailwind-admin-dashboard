<!DOCTYPE html>
<html>
<head>
    <title>Cuenta aprobada</title>
</head>
<body>
    <h1>¡Buenas noticias, {{ $user->name }}!</h1>
    <p>Tu cuenta ha sido aprobada por el administrador.</p>
    <p>Ahora puedes iniciar sesión y comenzar a usar nuestra plataforma.</p>
    
    <a href="{{ $loginUrl }}">Iniciar sesión ahora</a>
    
    <p>O copia esta URL en tu navegador:</p>
    <p>{{ $loginUrl }}</p>
</body>
</html>