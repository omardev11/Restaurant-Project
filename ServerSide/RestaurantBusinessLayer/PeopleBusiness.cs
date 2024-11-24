using RestaurantDataLayer;

namespace RestaurantBusinessLayer
{
    public class PeopleBusiness
    {
        public enum enMode { AddNew = 1 , UpdateNew = 2 }

        public enMode Mode;

        public DTO.PersonDTO Person;
       

        public PeopleBusiness(DTO.PersonDTO person,enMode mode = enMode.AddNew)
        {

            this.Person = person;
            this.Mode = mode;
        }

        private bool _AddNewPersson()
        {
            this.Person.PersonId = PeopleData.AddNewPerson(this.Person);

            return (this.Person.PersonId != -1);
        }


        public bool Save()
        {
            switch (Mode)
            {
                case enMode.AddNew:
                    if (_AddNewPersson())
                    {
                        Mode = enMode.UpdateNew;
                        return true;
                    }
                    else { return false; }
                case enMode.UpdateNew:
                    return false;
                default:
                    return false;
            }
        }
    }
}
