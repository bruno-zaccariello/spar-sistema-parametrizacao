using AutoMapper;
using SPAR.web.Database;
using SPAR.web.Models;
using SPAR.web.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace SPAR.web.Services
{
    public class ParametroService(SparDbContext dbContext, IMapper mapper)
    {
        private readonly SparDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;

        public ParametroDTO[] GetParametros(
            int SistemaId = 0,
            int pageNumber = 1, 
            int pageSize = 10
        )
        {
            if (_dbContext == null)
            {
                return [];
            }

            var query = _dbContext.Parametros
                .Include(p => p.Sistema)
                .Skip((pageNumber - 1) * pageSize);
            if (SistemaId > 0)
            {
                query = query.Where(p => p.SistemaID.Equals(SistemaId));
            }
            var parametros = query.Take(pageSize).ToArray();
            return _mapper.Map<ParametroDTO[]>(parametros);
        }

        public ParametroDTO? GetParametro(long id)
        {
            if (_dbContext == null)
            {
                return null;
            }
            var parametro = _dbContext.Parametros
                .Where(p => p.ParametroID.Equals(id))
                .Include(p => p.Sistema)
                .FirstOrDefault();
            return _mapper.Map<ParametroDTO>(parametro);
        }
        
        public ParametroDTO? CreateParametro(ParametroPostDTO dto)
        {
            if (_dbContext == null)
            {
                return null;
            }

            var parametro = _mapper.Map<Parametro>(dto);

            _dbContext.Parametros.Add(parametro);
            _dbContext.SaveChanges();
            return _mapper.Map<ParametroDTO>(parametro);
        }

        public ParametroDTO? UpdateParametro(long ParametroID, ParametroPostDTO dto)
        {
            if (_dbContext == null)
            {
                return null;
            }

            var parametro = _mapper.Map<Parametro>(dto);
            parametro.ParametroID = ParametroID;

            _dbContext.Parametros.Update(parametro);
            _dbContext.SaveChanges();
            return _mapper.Map<ParametroDTO>(parametro);
        }

    }
}
