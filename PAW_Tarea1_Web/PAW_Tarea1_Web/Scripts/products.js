// Scripts/products.js
// Requiere jQuery ya cargado en Site.Master







(function () {
    const $q = $("#q");
    const $ul = $("#suggestions");
    const $no = $("#noResults");

    // Leer URL del WebMethod inyectada desde la página (ver paso 2)
    const searchUrl = (window.SEARCH_URL && String(window.SEARCH_URL)) || "Pages/Products.aspx/Search";


    // --- utilidades
    let tHandle = null;
    function debounce(fn, wait) {
        return function (...args) {
            clearTimeout(tHandle);
            tHandle = setTimeout(() => fn.apply(this, args), wait);
        };
    }


    (function () {
        "use strict";

        // Debounce sencillo para no disparar tantas llamadas
        var tId = null;
        function debounce(fn, ms) { return function () { clearTimeout(tId); var args = arguments; tId = setTimeout(function () { fn.apply(null, args); }, ms); }; }



    function limpiar() {
        $ul.empty();
        $no.text("");
    }

    function render(items) {
        var $ul = $("#suggestions");
        var $msg = $("#noResults");
        $ul.empty();
        if (!items || items.length === 0) {
            $msg.text("No se encontraron productos");
            return;
        }
        $msg.text("");
        items.forEach(function (n) {
            $ul.append('<li class="item" tabindex="0">' + n + '</li>');
        });
    }

    function buscar(term) {
        // Seguridad: checar que tengamos URL
        var url = (window.SEARCH_URL && String(window.SEARCH_URL)) || "Pages/Products.aspx/Search";

        $.ajax({
            url: url,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ term: term }),
            dataType: "json"
        }).done(function (res) {
            // PageMethods devuelven { d: [...] }
            var items = (res && res.d) || [];
            render(items);
        }).fail(function (xhr) {
            console.error("Search fail", xhr.status, xhr.statusText);
            $("#noResults").text("Error: " + (xhr.status || "") + " " + (xhr.statusText || ""));
        });
    }

        $(function () {
            console.log("products.js cargado");

            $("#q").on("keyup blur", debounce(function () {
                var t = ($("#q").val() || "").trim();
                if (t.length < 2) {
                    $("#suggestions").empty();
                    $("#noResults").text("");
                    return;
                }
                buscar(t);
            }, 200));

            // Click en sugerencia
            $("#suggestions").on("click keypress", ".item", function (e) {
                if (e.type === "click" || (e.type === "keypress" && (e.key === "Enter" || e.keyCode === 13))) {
                    $("#q").val($(this).text());
                    // Aquí puedes redirigir a detalle si quieres:
                    // window.location.href = "Products.aspx?search=" + encodeURIComponent($(this).text());
                }
            });
        });
    })();



    // --- eventos
    $q.on("keyup", debounce(function () {
        buscar($q.val().trim());
    }, 180));

    $q.on("blur", function () {
        // si quieres no limpiar, deja vacío
        // setTimeout(() => limpiar(), 150);
    });

    $ul.on("click", ".item", function () {
        const txt = $(this).text();
        $q.val(txt);
        window.location.href = "Products.aspx?search=" + encodeURIComponent(txt);
    });

    // accesibilidad simple con teclado
    $q.on("keydown", function (e) {
        const items = $ul.find(".item");
        if (!items.length) return;

        const focused = items.index(items.filter(":focus"));
        if (e.key === "ArrowDown") {
            e.preventDefault();
            items.eq(focused < items.length - 1 ? focused + 1 : 0).focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            items.eq(focused > 0 ? focused - 1 : items.length - 1).focus();
        } else if (e.key === "Enter") {
            const idx = focused >= 0 ? focused : 0;
            const txt = items.eq(idx).text();
            if (txt) {
                $q.val(txt);
                window.location.href = "Products.aspx?search=" + encodeURIComponent(txt);
            }
        }
    });

    console.log("products.js cargado");
})();
