var language;

function get_Language()
{
    (localStorage.getItem('language') == null) ? set_Language('en') : false;
    $.ajax({
        url: '/lang/' + localStorage.getItem('language') + '.json',
        dataType: 'json', async: false, dataType: 'json',
        success: function (lang) { language = lang }
    });
}

function set_Language(lang) {
    localStorage.setItem('language', lang);
}

function load_Language()
{
    $(document).ready(get_Language());
    $(document).ready(function(){
        // $('header div#header-btn-about h1').text(language.header.about)
        // $('header div#header-btn-start h1').text(language.header.start)
        // $('header div#header-btn-projects h1').text(language.header.projects)
        // $('.intro h1').text(language.intro.title)
        // $('.intro h2').text(language.intro.subtitle)
    })
}