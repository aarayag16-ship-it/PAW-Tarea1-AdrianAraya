using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PAW_Tarea1_Web.App_Code.Domain
{
    [Serializable]
    public class Product
    {
        public int Id { get; set; }          // Identificador
        public string Name { get; set; }     // Nombre
        public string Description { get; set; } // Descripción breve
    }
}