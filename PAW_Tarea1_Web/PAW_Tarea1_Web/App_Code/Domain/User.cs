using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PAW_Tarea1_Web.App_Code.Domain
{
    [Serializable]
    public class User
    {
        public string FullName { get; set; }      // Nombre completo
        public string Email { get; set; }         // Correo (único)
        public string Phone { get; set; }         // Teléfono
        public string Username { get; set; }      // Usuario (único)
        public string PasswordHash { get; set; }  // Guardar la contraseña tal cual mientras desarrollas
        public DateTime BirthDate { get; set; }   // Fecha de nacimiento
        public bool AcceptedTerms { get; set; }   // Aceptación de T&C
        public string Address { get; set; }       // Dirección (para Perfil)


    }
}