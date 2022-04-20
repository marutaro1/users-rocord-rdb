<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        
        <nav class="navbar navbar-expand-md navbar-light bg-secondary shadow-sm pb-1 pt-0 ">
            <div class="container">
             
                <a class="navbar-brand my-1 text-white" href="{{ route('login') }}">
                   users-record
                </a>
                </div>
            </div>
        </nav>
        <div class="mt-5">
        <div class="text-center">    
            <img src="{{ asset('img/users-record-logo.png') }}">
        </div>    
            <h1 class="text-center">Users-Record</h1>
            <div class="text-center mt-4">
                <button class="btn btn-primary col-5 col-lg-2 p-0">
                    <a class="nav-link text-white display-6" href="{{ route('login') }}">Login</a>
                </button>
            </div>
        </div>

        <main class="py-4">
            
            @yield('content')
        </main>
    </div>
</body>
</html>
