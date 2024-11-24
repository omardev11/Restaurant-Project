using RestaurantDataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantBusinessLayer
{
    public class OrdersBusiness
    {

        public enum enMode { AddNewMode = 1, UpdateMode = 2 }

        public enMode Mode;

        public DTO.OrderDTO Order;


        public OrdersBusiness(DTO.OrderDTO order, enMode mode = enMode.AddNewMode)
        {

            this.Order = order;
            this.Mode = mode;
        }

        private bool _AddNewOrder()
        {

        
          this.Order.OrderId = OrdersData.AddNewOrder(this.Order);

          return (this.Order.CustomerId != -1);
        


        }

        //public static DTO.CustomerDTO GetOrderByID(int customerid)
        //{
        //    return CustomersData.GetCustomerByID(customerid);
        //}
        public bool Save()
        {
            switch (Mode)
            {
                case enMode.AddNewMode:
                    if (_AddNewOrder())
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
