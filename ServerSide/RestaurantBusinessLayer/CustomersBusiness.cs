using RestaurantDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantBusinessLayer
{
    public class CustomersBusiness
    {
        public enum enMode { AddNewMode = 1, UpdateMode = 2 }

        public enMode Mode;

        public DTO.CustomerDTO Customer;


        public CustomersBusiness(DTO.CustomerDTO customer, enMode mode = enMode.AddNewMode)
        {

            this.Customer = customer;
            this.Mode = mode;
        }

        private bool _AddNewCusomer()
        {
            PeopleBusiness NewPerson = new PeopleBusiness(new DTO.PersonDTO(Customer.PersonId, Customer.FullName, Customer.Gmail));

            if (NewPerson.Save())
            {
                this.Customer.PersonId = NewPerson.Person.PersonId;
                this.Customer.CustomerId = CustomersData.AddNewCustomer(this.Customer);

                return (this.Customer.CustomerId != -1);
            }
            else { return false; }  

          
        }

        public static DTO.CustomerDTO GetCustomerByID(int customerid)
        {
            return CustomersData.GetCustomerByID(customerid);
        }

        public static DTO.CustomerDTO IsThisCustomerExistByGmailAndPassword(string Gamil, string Password)
        {
            int customerid = CustomersData.IsThisCustomerExistByGmailAndPassword(Gamil, Password);
            if (customerid != -1)
            {
                return GetCustomerByID(customerid);
            }
            else
            {
                return null;
            }
        }

        public bool Save()
        {
            switch (Mode)
            {
                case enMode.AddNewMode:
                    if (_AddNewCusomer())
                    {
                        Mode = enMode.UpdateMode;
                        return true;
                    }
                    else { return false; }
                case enMode.UpdateMode:
                    return false;
                default:
                    return false;
            }
        }
    }
}
