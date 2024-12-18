using AutoMapper;
using SPAR.web.Models;
using SPAR.web.Models.DTO;

namespace SPAR.web.Configuration
{
    internal class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<Sistema, SistemaPostDTO>().ReverseMap();
            CreateMap<Sistema, SistemaDTO>().ReverseMap();

            CreateMap<Parametro, ParametroPostDTO>().ReverseMap();
            CreateMap<Parametro, ParametroDTO>().ReverseMap();
        }
    }
}