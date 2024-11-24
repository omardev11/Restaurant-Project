using RestaurantDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantBusinessLayer
{
    public  class ReservationBusiness
    {

        public static bool AddNewReservation(DTO.ReservationDTO NewReservation)
        {

            return ReservationsData.AddNewReservation(NewReservation) != -1 ? true : false;
        }
    }
}
