using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantBusinessLayer;
using RestaurantDataLayer;

namespace RestaurantProjectAPILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [HttpPost("NewOrder" , Name = "AddNewOrder")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<DTO.OrderDTO> AddNewOrder(DTO.OrderDTO NewOrder)
        {
            if (NewOrder == null)
            {
                return NotFound("The Object Of The Customer Can Not Be Null");
            }

            OrdersBusiness order = new OrdersBusiness(NewOrder);

            if (order.Save())
            {
                NewOrder = order.Order;

                return Ok(NewOrder);

            }
            else
            {
                return StatusCode(500, new { messege = "Error Adding New Customer" });
            }
        }
    }
}
