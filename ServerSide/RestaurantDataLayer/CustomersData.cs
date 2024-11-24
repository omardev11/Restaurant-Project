using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace RestaurantDataLayer
{
    public  class CustomersData
    {


        public static int AddNewCustomer(DTO.CustomerDTO Customer)
        {
            int NewId = -1;

            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_AddNewCustomer", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@PersonId", Customer.PersonId);
                    command.Parameters.AddWithValue("@Password", Customer.Passaword);

                    SqlParameter outputIdParam = new SqlParameter("@CustomerId", SqlDbType.Int)
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
                    { }
                }




            }

            return NewId;

        }

        public static int IsThisCustomerExistByGmailAndPassword(string gmail, string passaword)
        {
            int NewId = -1;


            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_GetCustomerInfoByGmailAndPassword", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Gmail", gmail);
                    command.Parameters.AddWithValue("@Password", passaword);



                    try
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                NewId = Convert.ToInt32(reader["CustomerId"]);
                            }
                            else { NewId = -1; }
                        }


                    }
                    catch (Exception)
                    {
                        NewId = -1;
                    }
                }




            }

            return NewId;

        }


        public static DTO.CustomerDTO GetCustomerByID(int customerid)
        {

            DTO.CustomerDTO CustomerInfo = null;


            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_GetCustomerInfoByID", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@CustomerId", customerid);


                    try
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                CustomerInfo = new DTO.CustomerDTO(Convert.ToInt32(reader["CustomerId"]), reader["Password"].ToString(),
                                                            Convert.ToInt32(reader["PersonId"]), reader["FullName"].ToString(), reader["Gmail"].ToString());
                              
                            }
                            else { CustomerInfo = null; }
                        }


                    }
                    catch (Exception)
                    {
                        CustomerInfo = null;
                    }
                }




            }

            return CustomerInfo;

        }



    }
}
