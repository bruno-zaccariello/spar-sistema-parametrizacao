using Microsoft.AspNetCore.Mvc;
using SPAR.web.Models;
using SPAR.web.Models.DTO;
using SPAR.web.Services;

namespace SPAR.web.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SistemaController(SistemaService sistemaService) : ControllerBase
    {
        private readonly SistemaService _sistemaService = sistemaService;

        [HttpGet]
        public ActionResult<SistemaDTO[]> GetSistemas(
            int pageNumber = 1,
            int pageSize = 10
        )
        {
            return _sistemaService.GetSistemas(pageNumber, pageSize);
        }

        [HttpGet("{SistemaID}")]
        public ActionResult<SistemaDTO?> Get([FromRoute] int SistemaID)
        {
            return _sistemaService.GetSistema(SistemaID);
        }

        [HttpPost]
        public ActionResult<SistemaDTO?> Create([FromBody] SistemaPostDTO sistemaDTO)
        {
            return _sistemaService.CreateSistema(sistemaDTO);
        }

        [HttpPut("{SistemaID}")]
        public ActionResult<SistemaDTO?> Update([FromRoute] int SistemaID, [FromBody] SistemaPostDTO sistemaDTO)
        {
            return _sistemaService.UpdateSistema(SistemaID, sistemaDTO);
        }

    }
}