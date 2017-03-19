using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using ApiMaster.Models;

namespace ApiMaster.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ImagesController : ApiController
    {
        // GET api/images
        public string Get()
        {
            return "images";
        }

        // GET api/images/5
        public List<Gallery> Get(int id)
        {
            var images = new List<Gallery>();

            using (var db = new MasterModelEntities())
            {
                var apartment = db.Apartments.FirstOrDefault(x => x.ID == id);
                if (apartment != null)
                    images.AddRange(db.ApartmentImages.Where(x => x.ApartmentID == id).ToList().Select(g => new Gallery
                    {
                        ID = g.ID,
                        Description = g.Description,
                        ApartmentID = g.ApartmentID,
                        ImageName = g.ImageName,
                        IsMain = g.IsMain,
                        ApartmentName = apartment.Name
                    }));
            }

            return images;
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
