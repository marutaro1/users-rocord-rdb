@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        
        <router-view v-bind:auth_id = "{{Auth::id()}}"></router-view>
    </div>
    
</div>
@endsection
