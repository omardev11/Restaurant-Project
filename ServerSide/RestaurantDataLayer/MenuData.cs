using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataLayer
{
    public class MenuData
    {
        public static List<DTO.MenuDTO> GetAllMenu()
        {
            
            List<DTO.MenuDTO> MenuINfo = new List<DTO.MenuDTO>();

            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_GetAllMenu", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;



                    try
                    {
                        connection.Open();

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                MenuINfo.Add(new DTO.MenuDTO(Convert.ToInt32(reader["MenuId"]), reader["MenuName"].ToString(),
                                                   Convert.ToDecimal(reader["MenuPrice"]), reader["MenuDescription"].ToString()));

                            }
                        }


                    }
                    catch (Exception)
                    {
                        MenuINfo = null;
                    }
                }




            }

            return MenuINfo;

        }

    }
}
