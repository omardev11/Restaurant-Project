using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataLayer
{
    public class OrdersData
    {
        public static int AddNewOrder(DTO.OrderDTO Order)
        {
            int NewId = -1;

            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_AddNewOrder", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@MenuId", Order.MenuId);
                    command.Parameters.AddWithValue("@CustomerId", Order.CustomerId);
                    command.Parameters.AddWithValue("@Quantity", Order.Quantity);
                    command.Parameters.AddWithValue("@TotalPrice", Order.TotalPrice);
                    command.Parameters.AddWithValue("@Status", Order.Status);
                    
  

                    SqlParameter outputIdParam = new SqlParameter("@OrderId", SqlDbType.Int)
                    {
                        Direction = ParameterDirection.Output  // Set direction to Output
                    };
                    command.Parameters.Add(outputIdParam);

                    try
                    {
                        connection.Open();

                        object Result = command.ExecuteNonQuery();

                        if (outputIdParam.Value != DBNull.Value)
                        {
                            NewId = (int)outputIdParam.Value;
                        }
                        else { NewId = -1; }
                    }
                    catch (Exception)
                    { NewId = -1; }
                }




            }

            return NewId;

        }

    }
}
