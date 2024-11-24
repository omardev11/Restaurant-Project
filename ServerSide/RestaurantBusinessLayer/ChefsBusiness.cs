using RestaurantDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantBusinessLayer
{
    public class ChefsBusiness
    {
        public enum enMode { AddNewMode = 1, UpdateMode = 2 }

        public enMode Mode;

        public DTO.ChefDTO Chef;


        public ChefsBusiness(DTO.ChefDTO chef, enMode mode = enMode.AddNewMode)
        {

            this.Chef = chef;
            this.Mode = mode;
        }

        public static List<DTO.ChefDTO> GetAllChefs()
        {
            return ChefsData.GetAllChefs();
        }
                

    }
}

