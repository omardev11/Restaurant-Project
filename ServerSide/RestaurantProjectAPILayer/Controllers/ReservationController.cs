using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantBusinessLayer;
using RestaurantDataLayer;

namespace RestaurantProjectAPILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        //[HttpPost("NewReservation", Name = "AddNewReservation")]

        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public ActionResult<DTO.ReservationDTO> AddNewReservation(DTO.ReservationDTO NewReservation)
        //{
        //    if (NewReservation == null)
        //    {
        //        return BadRequest("The Object Of The Reservaiton Can Not Be Null");
        //    }

        //    if (ReservationBusiness.AddNewReservation(NewReservation))
        //    {
        //        return Ok(NewReservation);
        //    }
        //    else
        //    {
        //        return StatusCode(500, new { messege = "Error Adding New Customer" });
        //    }

            
           
        //}

        [HttpPost("NewReservation", Name = "AddNewReservation")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<DTO.ReservationDTO> AddNewReservat(DTO.ReservationDTO NewReservation)
        {
            if (NewReservation == null)
            {
                return BadRequest("The Object Of The Reservaiton Can Not Be Null");
            }

            if (ReservationBusiness.AddNewReservation(NewReservation))
            {
                return Ok(NewReservation);
            }
            else
            {
                return StatusCode(500, new { messege = "Error Adding New Customer" });
            }
        }
    }
}
