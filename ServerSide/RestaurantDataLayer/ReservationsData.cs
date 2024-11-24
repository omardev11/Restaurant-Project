using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RestaurantDataLayer
{
    public class ReservationsData
    {
        public static int AddNewReservation(DTO.ReservationDTO NewReservation)
        {
            int NewId = -1;

            if (DataAccessSetting._connectionString == null)
            {
                NewId = -1;
            }
            using (SqlConnection connection = new SqlConnection(DataAccessSetting._connectionString))
            {
                using (SqlCommand command = new SqlCommand("usp_AddNewReservation", connection))
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Date", NewReservation.Date);
                    command.Parameters.AddWithValue("@Time", NewReservation.Time);
                    command.Parameters.AddWithValue("@PartySize", NewReservation.PartySize);


                    SqlParameter outputIdParam = new SqlParameter("@ReservationID", SqlDbType.Int)
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
                    {
                        NewId = -1;
                    }
                }




            }

            return NewId;

        }

    }
}
