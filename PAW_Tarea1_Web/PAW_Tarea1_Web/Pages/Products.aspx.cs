using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;

using PAW_Tarea1_Web.App_Code.Data;

namespace PAW_Tarea1_Web.Pages
{
    public partial class Products : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e) { }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public static List<string> Search(string term)
        {
            if (string.IsNullOrWhiteSpace(term) || term.Trim().Length < 2)
                return new List<string>();

            term = term.Trim();

            // Buscar por nombre (case-insensitive) y devolver hasta 10 nombres
            return InMemoryStore.Products
                .Where(p => p.Name.IndexOf(term, StringComparison.OrdinalIgnoreCase) >= 0)
                .Select(p => p.Name)
                .Take(10)
                .ToList();
        }
    }
}