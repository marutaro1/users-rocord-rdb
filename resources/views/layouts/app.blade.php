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
        <nav class="navbar navbar-expand navbar-light bg-secondary shadow-sm pt-0 pb-1">
            <div class="container">
            @if(Route::currentRouteName() === 'register') 
                <a class="navbar-brand text-ligh btn btn-light mx-1  py-2" href="/factoryusers/{{ Auth::id() }}">  
                    Top
                </a>
            @elseif(Route::currentRouteName() === 'login') 
            <a class="navbar-brand text-white my-1" href="/login">  
                    users-record
                </a>
            @endif
            @if(Route::currentRouteName() !== 'register' && Route::currentRouteName() !== 'login') 
                <router-link class="navbar-brand text-ligh btn btn-light mx-1 py-2 mt-1" to="/factoryusers/{{ Auth::id() }}">Top</router-link>
            @endif

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest
                            @if (Route::has('login'))
                                
                            @endif
                            
                            <!-- @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                            @endif -->
                            @else
                            
                            <li class="nav-item dropdown btn btn-light dropstart mx-1 py-1 mt-1">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }}
                                </a>
                                <div class="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                                
                                    @if(Route::currentRouteName() === 'register') 
                                        <a class="dropdown-item px-0" href="/factoryusers/{{ Auth::id() }}">  
                                        利用者一覧
                                        </a>
                                    @endif
                                    @if(Route::currentRouteName() !== 'register')
                                        <router-link class="dropdown-item px-0" to="/factoryusers/{{ Auth::id() }}">利用者一覧</router-link>
                                        <router-link class="dropdown-item px-0" to="/newuser">新規利用者登録</router-link>
                                        <router-link class="dropdown-item px-0" to="/archives/{{ Auth::id() }}">記録まとめ</router-link>
                                        <router-link class="dropdown-item px-0 " to="/staffdaywork/{{ Auth::id() }}">業務</router-link>
                                        <a class="dropdown-item px-0" href="{{ route('register') }}">{{ __('新規職員登録') }}</a>
                                    @endif
                                    
                                    
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                        @csrf
                                    </form>

                                    <a class="dropdown-item px-0" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
</body>
</html>
