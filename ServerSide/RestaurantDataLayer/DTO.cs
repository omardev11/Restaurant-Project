using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataLayer
{
    public class DTO
    {
        public class PersonDTO
        {
            public int PersonId { get; set; }
            public string FullName { get; set; }
            public string Gmail { get; set; }

            public PersonDTO(int personId, string fullName, string gmail)
            {
                this.PersonId = personId;
                this.FullName = fullName;
                this.Gmail = gmail;
            }
        }
        public class CustomerDTO : PersonDTO
        {
            public int CustomerId { get; set; }
            public string Passaword { get; set; }

            public CustomerDTO(int customerId, string passaword, int personId, string fullName, string gmail)
                    : base(personId, fullName, gmail)
            {
                this.CustomerId = customerId;
                this.Passaword = passaword;

            }
        }

        public class ChefDTO : PersonDTO
        {
            public int ChefId { get; set; }
            public string Possotion { get; set; }

            public ChefDTO(int chefId, string possotion, int personId, string fullName, string gmail)
                    : base(personId, fullName, gmail)
            {
                this.ChefId = chefId;
                this.Possotion = possotion;

            }
        }

        public class UserDTO : PersonDTO
        {
            public int UserId { get; set; }
            public string Phone { get; set; }

            public UserDTO(int userid, string phone, int personId, string fullName, string gmail)
                    : base(personId, fullName, gmail)
            {
                this.UserId = userid;
                this.Phone = phone;

            }
        }

        public class MenuDTO
        {
            public int MenuId { get; set; }
            public string MenuName { get; set; }
            public decimal MenuPrice { get; set; }
            public string MenuDescription { get; set; }


            public MenuDTO(int menuId,string menuName, decimal menuPrice,string menudescription)
            {
                this.MenuId = menuId;
                this.MenuName = menuName;
                this.MenuPrice = menuPrice;
                this.MenuDescription = menudescription;
            }

     
        }

        public class OrderDTO  
        {
            public int OrderId { get; set; }
            public int MenuId { get; set; }
            public int CustomerId { get; set; }
            public int Quantity { get; set; }

            public decimal TotalPrice { get; set; }
            public string Status { get; set; }

            public OrderDTO(int orderId,int menuid,int customerid,int quantity,decimal TotalPrice, string status)
            {
                this.OrderId = orderId;
                this.MenuId = menuid;
                this.CustomerId = customerid;
                this.Quantity = quantity;
                this.TotalPrice = TotalPrice; 
                this.Status = status;
            }


        }

        public class ReservationDTO
        {
            public int ReservationId { get; set; }

            public string Date {  get; set; }

            public string Time { get; set; }
            public int PartySize { get; set; }

        }



    }
}
