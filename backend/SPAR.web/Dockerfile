# Use the official .NET SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy the project files and restore any dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining files and build the application
COPY . ./
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/out .

# Expose the port the application runs on
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "SPAR.web.dll"]