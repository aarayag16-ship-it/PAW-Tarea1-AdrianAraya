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

    function limpiar() {
        $ul.empty();
        $no.text("");
    }

    function render(items) {
        $ul.empty();
        if (!items || !items.length) {
            $no.text("No se encontraron productos");
            return;
        }
        $no.text("");
        items.forEach((n) => {
            $("<li>")
                .addClass("item")
                .attr("role", "option")
                .attr("tabindex", "-1")
                .text(n)
                .appendTo($ul);
        });
    }

    // --- llamada al WebMethod (AQUÍ se usa `term`)
    function buscar(term) {
        if (!term || term.length < 2) { limpiar(); return; }

        $.ajax({
            url: searchUrl,                               // <- URL absoluta/resuelta
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ term: term }),         // <- usar la variable recibida
            dataType: "json"
        }).done(function (res) {
            const items = (res && res.d) || [];
            render(items);
        }).fail(function (xhr) {
            limpiar();
            console.error("Error en búsqueda:", xhr.status, xhr.statusText, "URL:", searchUrl);
        });
    }

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
