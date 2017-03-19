using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiMaster.Models
{
    public class Gallery
    {
        public int ID { get; set; }
        public int ApartmentID { get; set; }
        public string ImageName { get; set; }
        public string Description { get; set; }
        public bool IsMain { get; set; }

        public string ApartmentName { get; set; }

        public string ImageSrc
        {
            get { return "../Images/" + ApartmentName + "/" + ImageName; }
            set { throw new NotImplementedException(); }
        }
    }
}