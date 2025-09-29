<%@ Page Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="PAW_Tarea1_Web.Pages.Register" %>


<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
  <link href="<%= ResolveUrl("~/Styles/site.css") %>" rel="stylesheet" />
  <script>
    // URL del WebMethod (con .aspx, importante si usas FriendlyUrls)
    window.REG_URL   = '<%= ResolveUrl("~/Pages/Register.aspx/RegisterUser") %>';
    // URL de redirección al finalizar
    window.LOGIN_URL = '<%= ResolveUrl("~/Account/Login.aspx") %>';
  </script>
  <script src="<%= ResolveUrl("~/Scripts/validaciones.js") %>"></script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Aquí va tu formulario de registro -->

        <!-- ScriptManager NO es obligatorio para $.ajax hacia WebMethod,
         pero lo dejamos por si luego usas UpdatePanel/PageMethods -->


    <h2>Crear cuenta</h2>

<div id="frmRegister" role="form">
        <label for="fullName">Nombre completo</label>
        <input id="fullName" name="fullName" type="text" required aria-describedby="eFullName" aria-invalid="false" />

        <label for="email">Correo electrónico</label>
        <input id="email" name="email" type="email" required aria-describedby="eEmail" aria-invalid="false" />

        <label for="phone">Teléfono</label>
        <input id="phone" name="phone" type="tel" aria-describedby="ePhone" aria-invalid="false" />

        <label for="username">Usuario</label>
        <input id="username" name="username" type="text" required aria-describedby="eUsername" aria-invalid="false" />

        <label for="password">Contraseña</label>
        <input id="password" name="password" type="password" required aria-describedby="ePassword" aria-invalid="false" />

        <label for="confirm">Confirmar contraseña</label>
        <input id="confirm" name="confirm" type="password" required aria-describedby="eConfirm" aria-invalid="false" />

        <label for="birth">Fecha de nacimiento</label>
        <input id="birth" name="birth" type="date" required aria-describedby="eBirth" aria-invalid="false" />

        <label class="terms">
            <input id="terms" type="checkbox" required aria-describedby="eTerms" />
            Acepto términos y condiciones
        </label>

        <button id="btnRegister" type="button">Crear cuenta</button>

        <!-- Contenedores de error accesibles -->
        <div id="eFullName" class="err" aria-live="polite"></div>
        <div id="eEmail" class="err" aria-live="polite"></div>
        <div id="ePhone" class="err" aria-live="polite"></div>
        <div id="eUsername" class="err" aria-live="polite"></div>
        <div id="ePassword" class="err" aria-live="polite"></div>
        <div id="eConfirm" class="err" aria-live="polite"></div>
        <div id="eBirth" class="err" aria-live="polite"></div>
        <div id="eTerms" class="err" aria-live="polite"></div>

        <div id="registerResult" class="info" aria-live="polite"></div>
</div>



</asp:Content>
