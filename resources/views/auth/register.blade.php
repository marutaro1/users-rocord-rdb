@extends('layouts.app')

@section('content')
<div class="container px-0">
    <div>
        <div class="col-md-8 mt-2 mx-3">
        <h3>新規職員登録</h3>
            <div>
                <div>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="mb-3">
                            <label for="name" class="col-md-4 col-form-label">名前:</label>

                            <div class="col-lg-3 col-4">
                                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

                                @error('name')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="col-md-4 col-form-label">Eメールアドレス:</label>

                            <div class="col-md-5 col-8">
                                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

                                @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="col-md-4 col-form-label">パスワード:</label>

                            <div class="col-md-4 col-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="password-confirm" class="col-md-4 col-form-label">パスワード再入力:</label>

                            <div class="col-md-4 col-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="user_department" class="col-md-4 col-form-label">部署:</label>

                            <div class="col-md-4 col-6">
                                <select id="user_department" class="form-control @error('user_department') is-invalid @enderror" name="user_department" required autocomplete="user_department">
                                    <option value="">選択してください</option>
                                    <option value="caregiver">介護</option>
                                    <option value="nurse">看護</option>
                                    <option value="rehabilitation">リハビリ</option>
                                    <option value=studentSupport">施設管理</option>
                                </select>

                                @error('user_department')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="user_official_position" class="col-md-4 col-form-label">役職:</label>

                            <div class="col-md-4 col-6">
                                <select id="user_official_position" class="form-control @error('user_official_position') is-invalid @enderror" name="user_official_position" required autocomplete="user_official_position">
                                    <option value="">選択してください</option>
                                    <option value="no_position">役職なし</option>
                                    <option value="leader">リーダー</option>
                                    <option value="chief">主任</option>
                                    <option value="chiefclerk">係長</option>
                                    <option value="sectionchief">課長</option>
                                </select>

                                @error('user_official_position')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="mb-0">
                            <div class="col-md-6">
                                <button type="submit" class="btn btn-primary">
                                   登録
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
