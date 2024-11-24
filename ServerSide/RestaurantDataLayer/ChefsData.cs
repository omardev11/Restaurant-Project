using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataLayer
{
    public class ChefsData
    {
        public static List<DTO.ChefDTO> GetAllChefs()
        {

            List<DTO.ChefDTO> ChefInfo = new List<DTO.ChefDTO>();


            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_GetAllChefs", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;



                    try
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                ChefInfo.Add(new DTO.ChefDTO(Convert.ToInt32(reader["ChefId"]), reader["Position"].ToString(),
                                                            Convert.ToInt32(reader["PersonId"]), reader["FullName"].ToString(), reader["Gmail"].ToString()));

                            }
                        }


                    }
                    catch (Exception)
                    {
                        ChefInfo = null;
                    }
                }




            }

            return ChefInfo;

        }

    }
}
