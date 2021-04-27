using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ReactPeopleBackend.Data
{
   public class PeopleContextFactory:IDesignTimeDbContextFactory<PeopleDbContext>
    {
        public PeopleDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactPeopleBackend.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();
            return new PeopleDbContext(config.GetConnectionString("Constr"));
        }
    }
}
