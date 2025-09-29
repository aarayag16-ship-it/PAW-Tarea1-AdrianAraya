// Scripts/validaciones.js
// Requiere jQuery cargado antes de este archivo.

// Scripts/validaciones.js
// Requiere jQuery cargado en Site.Master antes del HeadContent.
// La página Register.aspx define window.REG_URL y window.LOGIN_URL.

(function () {
    "use strict";

    console.log("validaciones.js cargado");

    // --- Regex básicas (opcionales, puedes ajustar)
    var RE_NOMBRE = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,}$/;
    var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var RE_TEL = /^\+?\d{8,15}$/;

    // --- Helpers de UI
    function setErr($i, $e, msg) { $i.addClass("invalid").removeClass("ok"); $e.text(msg); }
    function clearErr($i, $e) { $i.removeClass("invalid").addClass("ok"); $e.text(""); }

    // --- Validaciones de campos
    function vNombre() {
        var $i = $("#fullName"), $e = $("#eFullName");
        var v = ($i.val() || "").trim();
        if (!RE_NOMBRE.test(v)) { setErr($i, $e, "Nombre: mínimo 3 letras, solo texto/espacios."); return false; }
        clearErr($i, $e); return true;
    }

    function vEmail() {
        var $i = $("#email"), $e = $("#eEmail");
        var v = ($i.val() || "").trim();
        if (!RE_EMAIL.test(v)) { setErr($i, $e, "Correo inválido."); return false; }
        clearErr($i, $e); return true;
    }

    function vTel() {
        var $i = $("#phone"), $e = $("#ePhone");
        var v = ($i.val() || "").trim();
        if (v && !RE_TEL.test(v)) { setErr($i, $e, "Teléfono: 8–15 dígitos (opcional +)."); return false; }
        clearErr($i, $e); return true;
    }

    function vUser() {
        var $i = $("#username"), $e = $("#eUsername");
        var v = ($i.val() || "").trim();
        if (v.length < 4) { setErr($i, $e, "Usuario: mínimo 4 caracteres."); return false; }
        clearErr($i, $e); return true;
    }

    function vPwd() {
        var $i = $("#password"), $e = $("#ePassword");
        var v = ($i.val() || "");
        if (v.length < 8) { setErr($i, $e, "Contraseña: mínimo 8 caracteres."); return false; }
        clearErr($i, $e); return true;
    }

    function vConfirm() {
        var $i = $("#confirm"), $e = $("#eConfirm");
        var p = $("#password").val() || "";
        var c = $i.val() || "";
        if (p !== c) { setErr($i, $e, "La confirmación no coincide."); return false; }
        clearErr($i, $e); return true;
    }

    function vBirth() {
        var $i = $("#birth"), $e = $("#eBirth");
        var v = ($i.val() || "").trim();
        if (!v) { setErr($i, $e, "Fecha de nacimiento requerida."); return false; }
        // mínima lógica de 18 años
        try {
            var birth = new Date(v + "T00:00:00");
            var hoy = new Date();
            var a18 = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
            if (birth > a18) { setErr($i, $e, "Debes tener al menos 18 años."); return false; }
        } catch (e) {
            setErr($i, $e, "Fecha inválida."); return false;
        }
        clearErr($i, $e); return true;
    }

    function vTerms() {
        var $i = $("#terms"), $e = $("#eTerms");
        if (!$i.is(":checked")) { setErr($i, $e, "Debes aceptar los términos."); return false; }
        clearErr($i, $e); return true;
    }

    function formEsValido() {
        var ok = true;
        ok = vNombre() && ok;
        ok = vEmail() && ok;
        ok = vTel() && ok;
        ok = vUser() && ok;
        ok = vPwd() && ok;
        ok = vConfirm() && ok;
        ok = vBirth() && ok;
        ok = vTerms() && ok;
        return ok;
    }

    // --- Enlace de eventos y submit AJAX
    $(function () {
        // Validación en tiempo real
        $("#fullName").on("blur keyup", vNombre);
        $("#email").on("blur keyup", vEmail);
        $("#phone").on("blur keyup", vTel);
        $("#username").on("blur keyup", vUser);
        $("#password").on("blur keyup", vPwd);
        $("#confirm").on("blur keyup", vConfirm);
        $("#birth").on("blur change", vBirth);
        $("#terms").on("change", vTerms);

        // Click del botón Crear cuenta
        $("#btnRegister").on("click", function () {
            var $msg = $("#registerResult").removeClass("flash-success flash-error").hide();

            if (!formEsValido()) {
                $msg.addClass("flash-error").text("Corrige los errores del formulario.").fadeIn();
                return;
            }

            var payload = {
                FullName: $("#fullName").val().trim(),
                Email: $("#email").val().trim(),
                Phone: $("#phone").val().trim(),
                Username: $("#username").val().trim(),
                PasswordHash: $("#password").val(),
                BirthDate: $("#birth").val(),
                AcceptedTerms: $("#terms").is(":checked"),
                Address: ""
            };

            var url = (window.REG_URL && String(window.REG_URL)) || "Pages/Register.aspx/RegisterUser";

            $.ajax({
                url: url,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ incoming: payload }),
                dataType: "json"
            }).done(function (res) {
                var r = res && res.d;
                if (r && r.ok) {
                    $msg.addClass("flash-success").text(r.message || "¡Registro exitoso!").fadeIn();
                    setTimeout(function () {
                        var next = (window.LOGIN_URL && String(window.LOGIN_URL)) || "/Account/Login.aspx";
                        window.location.href = next;
                    }, 1000);
                } else {
                    $msg.addClass("flash-error").text((r && r.message) || "No fue posible registrar.").fadeIn();
                }
            }).fail(function (xhr) {
                $msg.addClass("flash-error")
                    .text("Error del servidor: " + (xhr.status || "") + " " + (xhr.statusText || ""))
                    .fadeIn();
            });
        });
    });

})();
