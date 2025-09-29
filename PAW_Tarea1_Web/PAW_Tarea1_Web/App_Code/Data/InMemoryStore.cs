using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PAW_Tarea1_Web.App_Code.Domain;

namespace PAW_Tarea1_Web.App_Code.Data
{
    /// <summary>
    /// "Persistencia" en memoria para la Tarea 1.
    /// OJO: esto NO es thread-safe ni persistente: se reinicia al reciclar el AppPool.
    /// </summary>
    public static class InMemoryStore
    {
        // Usuarios registrados en la app
        public static readonly List<AppUser> Users = new List<AppUser>();

        // Catálogo simple de productos para la búsqueda
        public static readonly List<Product> Products;

        // Inicialización estática (semilla)
        static InMemoryStore()
        {
            Products = new List<Product>
            {
                new Product { Id = 1,  Name = "Laptop Pro 14",            Description = "Ultrabook 14\" para trabajo y estudio" },
                new Product { Id = 2,  Name = "Laptop Gamer 15",          Description = "Gráficos dedicados, alto rendimiento" },
                new Product { Id = 3,  Name = "Mouse Inalámbrico",        Description = "2.4GHz, cómodo y portable" },
                new Product { Id = 4,  Name = "Teclado Mecánico",         Description = "Switches táctiles, retroiluminado" },
                new Product { Id = 5,  Name = "Monitor 27 4K",            Description = "IPS, alto brillo, color preciso" },
                new Product { Id = 6,  Name = "SSD NVMe 1TB",             Description = "PCIe Gen4, velocidades altas" },
                new Product { Id = 7,  Name = "Disco Externo 2TB",        Description = "USB 3.2, backup portátil" },
                new Product { Id = 8,  Name = "Audífonos Bluetooth",      Description = "Over-ear, cancelación de ruido" },
                new Product { Id = 9,  Name = "Parlante Inteligente",     Description = "Asistente de voz integrado" },
                new Product { Id = 10, Name = "Webcam 1080p",             Description = "Autofoco, micrófono estéreo" },
                new Product { Id = 11, Name = "Micrófono USB",            Description = "Streaming y videollamadas" },
                new Product { Id = 12, Name = "Router Wi-Fi 6",           Description = "Cobertura amplia, OFDMA" },
                new Product { Id = 13, Name = "Access Point Wi-Fi 6E",    Description = "Tri-banda, alta densidad" },
                new Product { Id = 14, Name = "Impresora Láser",          Description = "Monocromática, red Ethernet" },
                new Product { Id = 15, Name = "Silla Ergonómica",         Description = "Soporte lumbar, ajustable" },
                new Product { Id = 16, Name = "Dock USB-C",               Description = "HDMI, USB-A, PD 100W" },
                new Product { Id = 17, Name = "Cámara IP",                Description = "Interior, detección de movimiento" },
                new Product { Id = 18, Name = "Tablet 10\"",              Description = "Pantalla FHD, 64GB" }
            };
        }

        /// <summary>
        /// Utilidad simple para obtener el próximo Id de producto (si luego agregas más).
        /// </summary>
        public static int NextProductId()
        {
            if (Products.Count == 0) return 1;
            return Products[Products.Count - 1].Id + 1;
        }
    }




    //public class InMemoryStore
    //{

    //}
}