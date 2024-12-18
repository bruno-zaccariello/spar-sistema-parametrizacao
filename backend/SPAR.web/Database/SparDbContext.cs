using Microsoft.EntityFrameworkCore;
using SPAR.web.Models;

namespace SPAR.web.Database;

public class SparDbContext(DbContextOptions<SparDbContext> options, IConfiguration configuration) : DbContext(options)
{

    private readonly IConfiguration? _configuration = configuration;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            if (_configuration != null)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("ConnectionStrings:DefaultConnection"));
            }
        }
    }

    public required DbSet<Sistema> Sistemas { get; set; }
    public required DbSet<Parametro> Parametros { get; set; }

}
