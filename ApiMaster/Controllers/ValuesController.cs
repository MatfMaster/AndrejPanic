using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ApiMaster.Models;

namespace ApiMaster.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {
        // GET api/values
        public IEnumerable<sp_GetApartments_Result> Get()
        {
            var apartments = new List<sp_GetApartments_Result>();
            using (var db = new MasterModelEntities())
            {
                apartments = db.sp_GetApartments().ToList();
            }
            return apartments;
        }

        // GET api/values/5
        public Apartment Get(int id)
        {
            var apartment = new Apartment();
            using (var db = new MasterModelEntities())
            {
                apartment = db.Apartments.SingleOrDefault(x => x.ID == id);
            }
            return apartment;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
