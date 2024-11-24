using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestaurantBusinessLayer;
using RestaurantDataLayer;

namespace RestaurantProjectAPILayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
      
       

        [HttpPost ("NewCustomer" , Name = "AddNewCustmer")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> AddNewCustomer(DTO.CustomerDTO NewCustomer)
        {
            if (NewCustomer == null)
            {
                return BadRequest("The Object Of The Customer Can Not Be Null");
            }

            CustomersBusiness Customer = new CustomersBusiness(NewCustomer);

            if (Customer.Save())
            {
                NewCustomer = Customer.Customer;
               
                return Ok(NewCustomer);

            }
            else
            {
                return StatusCode(500, new { messege = "Error Adding New Customer" });
            }
        }




        [HttpGet("{Gmail}/{Password}", Name = "LoginWhithGmailAndPassaword")]

        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<DTO.CustomerDTO> LoginWhithGmailAndPassaword(string Gmail , string Password)
        {
            if (string.IsNullOrEmpty(Gmail) || string.IsNullOrEmpty(Password))
            {
                return BadRequest("The Content Can Not Be Empty");
            }

            DTO.CustomerDTO Customer =  CustomersBusiness.IsThisCustomerExistByGmailAndPassword(Gmail, Password);

            if (Customer != null)
            {

                return Ok(Customer);

            }
            else
            {
                return StatusCode(500, new { messege = "Error on Finding Customer" });
            }
        }

    }
}
