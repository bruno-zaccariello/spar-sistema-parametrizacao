using System;
using Microsoft.EntityFrameworkCore;
using SPAR.web.Models;

namespace SPAR.web.Configuration
{
    internal class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public required DbSet<Sistema> Sistemas { get; set; }
        public required DbSet<Parametro> Parametros { get; set; }
    }
}