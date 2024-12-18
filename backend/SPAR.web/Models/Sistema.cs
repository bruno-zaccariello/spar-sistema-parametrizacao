using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAR.web.Models
{

    [Table("TSistema", Schema = "SPARO")]
    public class Sistema
    {
        [Column("ID")]
        public long SistemaID { get; set; }

        [Required]
        [Column("nome_sistema")]
        public required string Nome { get; set; }

        [Column("descricao_sistema")]
        public required string Descricao { get; set; }

        public virtual ICollection<Parametro>? Parametros { get; }
    }
    
}