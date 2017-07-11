@extends('master')

@section('title','Last 5 Recipes - Il mio frigo')

@section('content')
    <div id="img_ricette" >

    </div>

    <div id="description" >

    </div>

    <script type="text/javascript">
        $.get( "/api/recipes/4", function( data ) {
            var cdiv = $('#description');
            var h1 = $('<h1 />')
                .text(data.recipes[3].name_recipe)
                .appendTo(cdiv);
            var l = $('<li />')
                .text(data.recipes[3].difficulty)
                .appendTo(cdiv);
            var p = $('<p />')
                .text(data.recipes[3].description)
                .appendTo(l);
        });
    </script>
@endsection
