export class Customer {
  constructor(rawCustomer) {
    this.customerId = rawCustomer.customer_id;
    this.username = rawCustomer.username;
    this.displayName = rawCustomer.display_name;
    this.emailId = rawCustomer.email_id;
    this.role = rawCustomer.role;
    this.primaryMobileNumber = rawCustomer.primary_mobile_number;
  }
}

export class CustomerAddress {
  constructor(rawAddress) {
    this.fullName = rawAddress.full_name;
    this.mobileNumber = rawAddress.mobile_number;
    this.pinCode = rawAddress.pincode;
    this.buildingInfo = rawAddress.building_info;
    this.streetInfo = rawAddress.street_info;
    this.landmarkInfo = rawAddress.landmark_info;
    this.cityInfo = rawAddress.city_info;
    this.stateInfo = rawAddress.state_info;
  }
}
