// Scripts/profile.js
// Requiere jQuery cargado (está en Site.Master antes del HeadContent)

(function () {
    const reNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/;
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const reTel = /^\+?\d{8,15}$/;

    function setError($i, $e, msg) { $i.addClass("invalid").removeClass("ok"); $e.text(msg); }
    function clearErr($i, $e) { $i.removeClass("invalid").addClass("ok"); $e.text(""); }

    function vNombre() {
        const $i = $("#fullName"), $e = $("#eFullName"); const v = $i.val().trim();
        if (!reNombre.test(v)) { setError($i, $e, "Nombre: mínimo 3 letras, solo texto/espacios."); return false; }
        clearErr($i, $e); return true;
    }

    function vEmail() {
        const $i = $("#email"), $e = $("#eEmail"); const v = $i.val().trim();
        if (!reEmail.test(v)) { setError($i, $e, "Correo inválido."); return false; }
        clearErr($i, $e); return true;
    }

    function vTel() {
        const $i = $("#phone"), $e = $("#ePhone"); const v = $i.val().trim();
        if (v && !reTel.test(v)) { setError($i, $e, "Teléfono: 8–15 dígitos (opcional +)."); return false; }
        clearErr($i, $e); return true;
    }

    window.perfilValido = function () {
        return [vNombre(), vEmail(), vTel()].every(Boolean);
    };

    $(function () {
        $("#fullName").on("blur keyup", vNombre);
        $("#email").on("blur keyup", vEmail);
        $("#phone").on("blur keyup", vTel);

        $("#btnSaveProfile").on("click", function (e) {
            e.preventDefault();
            const box = $("#profileMsg").removeClass("flash-success flash-error").hide();

            if (!perfilValido()) return;

            const payload = {
                FullName: $("#fullName").val().trim(),
                Email: $("#email").val().trim(),
                Phone: $("#phone").val().trim(),
                Address: $("#address").val().trim()
            };

            $.ajax({
                url: "Profile.aspx/UpdateProfile",
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ updated: payload }),
                dataType: "json"
            }).done(function (res) {
                const r = res && res.d;
                if (r && r.ok) {
                    box.addClass("flash-success").text(r.message || "Guardado.").fadeIn();
                    setTimeout(() => box.fadeOut(), 2500);
                } else {
                    box.addClass("flash-error").text((r && r.message) || "No fue posible actualizar.").fadeIn();
                }
            }).fail(function (xhr) {
                box.addClass("flash-error").text("Error del servidor: " + (xhr.status || "") + " " + (xhr.statusText || "")).fadeIn();
            });
        });
    });
})();
