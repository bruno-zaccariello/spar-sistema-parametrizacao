using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPAR.web.Models
{

    [Table("TParametro", Schema = "SPARO")]
    public class Parametro
    {
        [Column("ID")]
        public long ParametroID { get; set; }

        [Column("chave")]
        public required string Chave { get; set; }

        [Column("valorJson", TypeName = "jsonb")]
        public required string ValorJson { get; set; }

        [Column("createdAt")]
        public required DateTime CreatedAt { get; set; }

        [Column("sistema_id")]
        public required long SistemaID { get; set; }

        public virtual Sistema? Sistema { get; set; } = null!;
    }
}