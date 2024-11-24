using System;
using System.Configuration;
using System.Reflection;
using System.Data.SqlTypes;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection.Metadata.Ecma335;
using System.ClientModel.Primitives;
using Microsoft.Extensions.Configuration;

namespace RestaurantDataLayer
{


    public class PeopleData
    {
        
        public static int AddNewPerson(DTO.PersonDTO NewPerson)
        {
            int NewId = -1;

            if (DataAccessSetting._connectionString == null)
            {
                NewId = -1;
            }
            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_AddNewPerson", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@FullName", NewPerson.FullName);
                    command.Parameters.AddWithValue("@Gmail", NewPerson.Gmail);

                    SqlParameter outputIdParam = new SqlParameter("@PersonId", SqlDbType.Int)
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
                        else { NewId  = -1; }
                    }
                    catch (Exception)
                    {
                        NewId = -1;
                    }
                }




            }

            return NewId;   

        }



    }
}
