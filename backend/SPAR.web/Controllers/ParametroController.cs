using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using SPAR.web.Models;
using SPAR.web.Models.DTO;
using SPAR.web.Services;

namespace SPAR.web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParametroController(ParametroService parametroService) : ControllerBase
    {

        private readonly ParametroService _parametroService = parametroService;

        [HttpGet]
        public ActionResult<ParametroDTO[]> GetParametros(
            int pageNumber = 1, 
            int pageSize = 10,
            int SistemaID = 0
        )
        {
            return _parametroService.GetParametros(SistemaID, pageNumber, pageSize);
        }

        [HttpGet]
        [Route("{ParametroID}")]
        public ActionResult<ParametroDTO?> GetParametro(int ParametroID)
        {
            return _parametroService.GetParametro(ParametroID);
        }

        [HttpPost]
        public ActionResult<ParametroDTO?> Create(ParametroPostDTO ParametroDTO)
        {
            return _parametroService.CreateParametro(ParametroDTO);
        }

        [HttpPut]
        [Route("{ParametroID}")]
        public ActionResult<ParametroDTO?> Update(long ParametroID, ParametroPostDTO ParametroDTO)
        {
            return _parametroService.UpdateParametro(ParametroID, ParametroDTO);
        }

    }
}
