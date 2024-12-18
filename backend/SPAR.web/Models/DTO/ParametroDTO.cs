namespace SPAR.web.Models.DTO
{
    public class ParametroDTO
    {
        public required string ParametroID { get; set; }
        public required string Chave { get; set; }
        public required string ValorJson { get; set; }
        public required SistemaDTO Sistema { get; set; }
        public required DateTime CreatedAt { get; set; }
    }
}
