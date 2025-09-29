using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Security;

// AJUSTA estos 'using' a tus namespaces reales:
using PAW_Tarea1_Web.App_Code.Data;    // InMemoryStore
using PAW_Tarea1_Web.App_Code.Domain;  // AppUser

namespace PAW_Tarea1_Web.Account
{
    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e) { }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            var userName = (txtUser.Text ?? "").Trim();
            var pwd = txtPassword.Text ?? "";

            var user = InMemoryStore.Users
                .FirstOrDefault(u => u.Username.Equals(userName, StringComparison.OrdinalIgnoreCase));

            // Valida contraseña: si guardaste la "PasswordHash" como texto plano por ahora:
            var passwordOk = user != null && string.Equals(user.PasswordHash, pwd, StringComparison.Ordinal);

            if (user != null && passwordOk)
            {
                // Crea cookie de autenticación (no persistente)
                FormsAuthentication.SetAuthCookie(user.Username, false);

                // Guarda el usuario en Session (para acceder a sus datos)
                Session["user"] = user;

                // Soporta ReturnUrl (vuelve a la página protegida a la que intentó entrar)
                var returnUrl = Request.QueryString["ReturnUrl"];
                if (!string.IsNullOrEmpty(returnUrl) && UrlIsLocalToHost(returnUrl))
                {
                    Response.Redirect(returnUrl, endResponse: true);
                }
                else
                {
                    Response.Redirect("~/Default.aspx", endResponse: true);
                }
            }
            else
            {
                lblError.Text = "Credenciales inválidas.";
            }
        }

        // Seguridad mínima para ReturnUrl (evita open redirect)
        private bool UrlIsLocalToHost(string url)
        {
            if (string.IsNullOrEmpty(url)) return false;
            // Local si empieza con "/" y no con "//" o "/\"
            return (url[0] == '/' && (url.Length == 1 || (url[1] != '/' && url[1] != '\\')))
                   || (url.Length > 1 && url[0] == '~' && url[1] == '/');
        }
    }
}
