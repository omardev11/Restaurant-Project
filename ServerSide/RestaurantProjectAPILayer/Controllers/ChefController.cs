using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantBusinessLayer;
using RestaurantDataLayer;

namespace RestaurantProjectAPILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChefController : ControllerBase
    {
        [HttpGet ("AllChefs" , Name = "GetAllChefs")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<DTO.ChefDTO>> GetAllChefs()
        {
            List<DTO.ChefDTO> chefDTOs = new List<DTO.ChefDTO>();

            chefDTOs = ChefsBusiness.GetAllChefs();

            if (chefDTOs.Count > 0)
            {
                return Ok(chefDTOs);
            }
            else
            {
                return NotFound("Nof Found Any Data");
            }
        }
    }
}
