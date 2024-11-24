using RestaurantDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantBusinessLayer
{
    public class MenuBusiness
    {
        public enum enMode { AddNewMode = 1, UpdateMode = 2 }

        public enMode Mode;

        public DTO.MenuDTO Menu;


        public MenuBusiness(DTO.MenuDTO menu, enMode mode = enMode.AddNewMode)
        {

            this.Menu = menu;
            this.Mode = mode;
        }

        public static List<DTO.MenuDTO> GetAllMenu()
        {
            return MenuData.GetAllMenu();
        }

    }
}
