using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactPeopleBackend.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactPeopleBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Constr");
        }
        [HttpGet]
        [Route("GetAll")]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost]
        [Route("Add")]
        public void Add(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(person);
        }
        [HttpPost]
        [Route("Update")]
        public void Update(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(person);
        }
        [HttpPost]
        [Route("Delete")]
        public void Delete(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(person.Id);
        }
        [HttpPost]
        [Route("DeleteAll")]
        public void DeleteAll(List<Person> people)
        {
            var repo = new PeopleRepository(_connectionString);
           foreach(Person p in people)
            {
                repo.Delete(p.Id);
            }
        }
    }
}
