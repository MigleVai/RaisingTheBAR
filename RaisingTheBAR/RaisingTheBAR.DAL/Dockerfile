FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 AS build
WORKDIR /src
COPY RaisingTheBAR.sln ./
COPY RaisingTheBAR.DAL/RaisingTheBAR.DAL.csproj RaisingTheBAR.DAL/
COPY RaisingTheBAR.Core/RaisingTheBAR.Core.csproj RaisingTheBAR.Core/
RUN dotnet restore -nowarn:msb3202,nu1503
COPY . .
WORKDIR /src/RaisingTheBAR.DAL
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "RaisingTheBAR.DAL.dll"]
