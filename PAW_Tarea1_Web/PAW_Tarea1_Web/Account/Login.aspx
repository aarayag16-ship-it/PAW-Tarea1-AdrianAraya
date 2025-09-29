<%@ Page Title="Iniciar sesión" Language="C#" MasterPageFile="~/Site.Master"
    AutoEventWireup="true" CodeBehind="Login.aspx.cs"
    Inherits="PAW_Tarea1_Web.Account.Login" %>

<asp:Content ID="Head" ContentPlaceHolderID="HeadContent" runat="server">
  <link href="<%= ResolveUrl("~/Styles/site.css") %>" rel="stylesheet" />
  <style>
    .login-box{max-width:420px;margin:1rem auto;display:grid;gap:.5rem}
    .login-box input{padding:.5rem;border:1px solid #ccc;border-radius:6px}
    .login-actions{display:flex;gap:.5rem;align-items:center}
    .error{color:#b91c1c}
  </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="MainContent" runat="server">
  <h2>Iniciar sesión</h2>

  <!-- NO agregues ScriptManager ni <form> aquí; ya existe en la master -->
  <div class="login-box">
    <label for="txtUser">Usuario</label>
    <asp:TextBox ID="txtUser" runat="server" />

    <label for="txtPassword">Contraseña</label>
    <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" />


<div class="login-actions">
  <asp:Button ID="btnLogin" runat="server" Text="Entrar" OnClick="btnLogin_Click" />
  <asp:HyperLink ID="lnkRegister" runat="server"
                 NavigateUrl="~/Pages/Register.aspx"
                 Text="Crear cuenta" />
</div>

    <asp:Label ID="lblError" runat="server" CssClass="error"></asp:Label>
  </div>
</asp:Content>
