using AutoMapper;
using SPAR.web.Database;
using SPAR.web.Models;
using SPAR.web.Models.DTO;

namespace SPAR.web.Services
{

    public class SistemaService(SparDbContext dbContext, IMapper mapper)
    {
        private readonly SparDbContext _dbContext = dbContext;
        private readonly IMapper _mapper = mapper;

        public SistemaDTO[] GetSistemas(
            int pageNumber = 1,
            int pageSize = 10
        )
        {
            if (_dbContext == null)
            {
                return [];
            }
            var sistemas = _dbContext.Sistemas
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToArray();
            return _mapper.Map<SistemaDTO[]>(sistemas);
        }

        public SistemaDTO? GetSistema(long index)
        {
            if (_dbContext == null)
            {
                return null;
            }
            return _mapper.Map<SistemaDTO>(_dbContext.Sistemas.Find(index));
        }

        public SistemaDTO? CreateSistema(SistemaPostDTO dto)
        {
            if (_dbContext == null)
            {
                return null;
            }
            var sistema = _mapper.Map<Sistema>(dto);

            _dbContext.Sistemas.Add(sistema);
            _dbContext.SaveChanges();
            return _mapper.Map<SistemaDTO>(sistema);
        }

        public SistemaDTO? UpdateSistema(long SistemaID, SistemaPostDTO dto)
        {
            if (_dbContext == null)
            {
                return null;
            }
            var sistema = _mapper.Map<Sistema>(dto);
            sistema.SistemaID = SistemaID;

            _dbContext.Sistemas.Update(sistema);
            _dbContext.SaveChanges();
            return _mapper.Map<SistemaDTO>(sistema);
        }

    }
}