<%@ Page Title="Productos" Language="C#" MasterPageFile="~/Site.Master"
    AutoEventWireup="true" CodeBehind="Products.aspx.cs"
    Inherits="PAW_Tarea1_Web.Pages.Products" %>

<asp:Content ID="HeadContent" ContentPlaceHolderID="HeadContent" runat="server">
  <link href="<%= ResolveUrl("~/Styles/site.css") %>" rel="stylesheet" />
    
    <script>
      window.SEARCH_URL = '<%= ResolveUrl("~/Pages/Products.aspx/Search") %>';
  </script>
    <script src="<%= ResolveUrl("~/Scripts/products.js") %>"></script>
</asp:Content>

<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
  <h2>Búsqueda de productos</h2>
  <div id="productSearch" role="search">
    <input id="q" type="text" placeholder="Busca un producto..." autocomplete="off" />
    <ul id="suggestions" class="dropdown"></ul>
    <div id="noResults" class="muted" aria-live="polite"></div>
  </div>
</asp:Content>

