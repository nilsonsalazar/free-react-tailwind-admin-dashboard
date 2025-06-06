<!DOCTYPE html>
<html>
<head>
    <title>Nuevo usuario pendiente</title>
</head>
<body>
    <h1>Nuevo usuario registrado</h1>
    <p>Nombre: {{ $user->name }}</p>
    <p>Email: {{ $user->email }}</p>
    <p>Fecha de registro: {{ $user->created_at->format('d/m/Y H:i') }}</p>
    
    <a href="{{ $approvalUrl }}">Aprobar este usuario</a>
    
    <p>O copia esta URL en tu navegador:</p>
    <p>{{ $approvalUrl }}</p>
</body>
</html>