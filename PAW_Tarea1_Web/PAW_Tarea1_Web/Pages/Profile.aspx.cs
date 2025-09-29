using System;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.Services;
using System.Web.Script.Services;

// Ajusta estos using a TU namespace real
using PAW_Tarea1_Web.App_Code.Domain; // AppUser
using PAW_Tarea1_Web.App_Code.Data;   // InMemoryStore

namespace PAW_Tarea1_Web.Pages
{
    public partial class Profile : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Debe estar protegido por Web.config; si no hay sesión, redirige a Login
            var user = Session["user"] as AppUser;
            if (user == null)
            {
                Response.Redirect("~/Account/Login.aspx?ReturnUrl=" + Server.UrlEncode(Request.RawUrl));
                return;
            }

            if (!IsPostBack)
            {
                // Precargar campos
                fullName.Text = user.FullName ?? "";
                email.Text = user.Email ?? "";
                phone.Text = user.Phone ?? "";
                address.Text = user.Address ?? "";
            }
        }

        [WebMethod(EnableSession = true)]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object UpdateProfile(AppUser updated)
        {
            var current = HttpContext.Current.Session["user"] as AppUser;
            if (current == null)
                return new { ok = false, message = "Sesión expirada. Vuelve a iniciar sesión." };

            if (updated == null || string.IsNullOrWhiteSpace(updated.Email))
                return new { ok = false, message = "Email requerido." };

            // (Opcional) Validar duplicidad si cambia el email:
            if (!current.Email.Equals(updated.Email, StringComparison.OrdinalIgnoreCase))
            {
                bool emailTomado = InMemoryStore.Users
                    .Any(u => !u.Username.Equals(current.Username, StringComparison.OrdinalIgnoreCase)
                           && u.Email.Equals(updated.Email, StringComparison.OrdinalIgnoreCase));
                if (emailTomado)
                    return new { ok = false, message = "El correo ya está en uso por otro usuario." };
            }

            // Actualizar objeto en sesión
            current.FullName = updated.FullName ?? current.FullName;
            current.Phone = updated.Phone ?? current.Phone;
            current.Email = updated.Email ?? current.Email;
            current.Address = updated.Address ?? current.Address;

            // Actualizar también en el almacén (mismo usuario por Username)
            var repoUser = InMemoryStore.Users
                .FirstOrDefault(u => u.Username.Equals(current.Username, StringComparison.OrdinalIgnoreCase));
            if (repoUser != null)
            {
                repoUser.FullName = current.FullName;
                repoUser.Phone = current.Phone;
                repoUser.Email = current.Email;
                repoUser.Address = current.Address;
            }

            return new { ok = true, message = "¡Tus datos han sido actualizados correctamente!" };
        }
    }
}
