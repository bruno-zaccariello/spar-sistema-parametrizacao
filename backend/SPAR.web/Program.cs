using Microsoft.EntityFrameworkCore;
using SPAR.web.Database;
using SPAR.web.Services;
using SPAR.web.Configuration;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi("internal");

builder.Services.AddScoped<SistemaService>();
builder.Services.AddScoped<ParametroService>();

builder.Services.AddAutoMapper(typeof(ApplicationProfile));

builder.Services.AddDbContext<SparDbContext>(options => options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"]));

builder.Services.Configure<JsonOptions>(options => {
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

app.MapOpenApi();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
