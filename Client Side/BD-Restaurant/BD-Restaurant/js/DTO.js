class PersonDTO {
  constructor(personid, fullname, gmail) {
    this.PersonId = personid;
    this.FullName = fullname;
    this.Gmail = gmail;
  }
}

class CustomerDTO extends PersonDTO {
  constructor(customerid, password, personid, fullname, gmail) {
    super(personid, fullname, gmail);
    this.CustomerId = customerid;
    this.Passaword = password;
  }
}

class MenuDTO {
  constructor(menuid, menuname, menuprice, menudescrription) {
    this.MenuId = menuid;
    this.MenuName = menuname;
    this.MenuPrice = menuprice;
    this.MenuDescription = menudescrription;
  }
}

class OrderDTO {
  constructor(orderid, menuid, customerid, quantity, totalprice, status) {
    this.OrderId = orderid;
    this.MenuId = menuid;
    this.CustomerId = customerid;
    this.Quantity = quantity;
    this.TotalPrice = totalprice;
    this.Status = status;
  }
}

class ReservatonDTO {
  constructor(reservationid, date, time, partysizze) {
    this.ReservationId = reservationid;
    this.Date = date;
    this.Time = time;
    this.PartySize = partysizze;
  }
}
export { ReservatonDTO };

export { CustomerDTO };

export { MenuDTO };

export { OrderDTO };
