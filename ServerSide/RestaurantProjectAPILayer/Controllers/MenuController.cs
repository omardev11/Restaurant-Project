using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantBusinessLayer;
using RestaurantDataLayer;

namespace RestaurantProjectAPILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        [HttpGet ("AllMenu" , Name = "GetAllMenu")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<List<DTO.MenuDTO>> GetAllMenu()
        {
            List<DTO.MenuDTO> MenuInfo = new List<DTO.MenuDTO>();

            MenuInfo = MenuBusiness.GetAllMenu();

            if (MenuInfo.Count > 0)
            {
                return Ok(MenuInfo);
            }
            else
            {
                return NotFound("Not Found Any Data");
            }
        }
    }
}
