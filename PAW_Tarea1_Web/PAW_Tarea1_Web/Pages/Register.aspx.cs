using System;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Services;
using PAW_Tarea1_Web.App_Code.Domain;
using PAW_Tarea1_Web.App_Code.Data;

namespace PAW_Tarea1_Web.Pages
{
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) { }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static object RegisterUser(AppUser incoming)
        {
            // Validaciones mínimas del servidor
            if (incoming == null)
                return new { ok = false, message = "Solicitud inválida." };

            if (string.IsNullOrWhiteSpace(incoming.Email) ||
                string.IsNullOrWhiteSpace(incoming.Username) ||
                string.IsNullOrWhiteSpace(incoming.FullName) ||
                string.IsNullOrWhiteSpace(incoming.PasswordHash) ||
                string.IsNullOrWhiteSpace(incoming.BirthDate.ToString()))
            {
                return new { ok = false, message = "Datos incompletos." };
            }

            // Edad mínima (por si saltan la validación en cliente)
            var age = DateTime.Today.Year - incoming.BirthDate.Year;
            if (incoming.BirthDate > DateTime.Today.AddYears(-age)) age--;
            if (age < 18) return new { ok = false, message = "Debes ser mayor de 18 años." };

            // No duplicidad
            if (InMemoryStore.Users.Any(u => u.Email.Equals(incoming.Email, StringComparison.OrdinalIgnoreCase)))
                return new { ok = false, message = "El correo ya está registrado." };

            if (InMemoryStore.Users.Any(u => u.Username.Equals(incoming.Username, StringComparison.OrdinalIgnoreCase)))
                return new { ok = false, message = "El nombre de usuario ya existe." };

            // (Opcional) aquí podrías hacer hashing: incoming.PasswordHash = Hash(pwd);
            InMemoryStore.Users.Add(incoming);

            return new { ok = true, message = "¡Registro exitoso!" };
        }
    }
}