<%@ Page Title="Mi perfil" Language="C#" MasterPageFile="~/Site.Master"
    AutoEventWireup="true" CodeBehind="Profile.aspx.cs"
    Inherits="PAW_Tarea1_Web.Pages.Profile" %>

<asp:Content ID="Head" ContentPlaceHolderID="HeadContent" runat="server">
  <link href="<%= ResolveUrl("~/Styles/site.css") %>" rel="stylesheet" />
  <script src="<%= ResolveUrl("~/Scripts/profile.js") %>"></script>
  <style>
    .form-grid{max-width:560px;display:grid;gap:.5rem}
    .form-grid input, .form-grid textarea{padding:.5rem;border:1px solid #ccc;border-radius:6px}
    #profileMsg{margin-top:.5rem;display:none}
  </style>
</asp:Content>

<asp:Content ID="Main" ContentPlaceHolderID="MainContent" runat="server">
  <h2>Mi perfil</h2>
  <!-- Importante: NO usar <form> aquí; el form está en la master -->
  <div class="form-grid" id="profileForm">
    <label for="fullName">Nombre completo</label>
    <asp:TextBox ID="fullName" runat="server" ClientIDMode="Static" />

    <label for="email">Correo electrónico</label>
    <asp:TextBox ID="email" runat="server" ClientIDMode="Static" />

    <label for="phone">Teléfono</label>
    <asp:TextBox ID="phone" runat="server" ClientIDMode="Static" />

    <label for="address">Dirección</label>
    <asp:TextBox ID="address" runat="server" ClientIDMode="Static" TextMode="MultiLine" Rows="3" />

    <button id="btnSaveProfile" type="button">Guardar cambios</button>

    <div id="eFullName" class="err" aria-live="polite"></div>
    <div id="eEmail" class="err" aria-live="polite"></div>
    <div id="ePhone" class="err" aria-live="polite"></div>

    <div id="profileMsg" class="flash-success"></div>
  </div>
</asp:Content>
