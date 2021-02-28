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
    if (rawAddress) {
      this.fullName = rawAddress.full_name;
      this.mobileNumber = rawAddress.mobile_number;
      this.pinCode = rawAddress.pincode;
      this.buildingInfo = rawAddress.building_info;
      this.streetInfo = rawAddress.street_info;
      this.landmarkInfo = rawAddress.landmark_info;
      this.cityInfo = rawAddress.city_info;
      this.stateInfo = rawAddress.state_info;
    } else {
      this.fullName = null;
      this.mobileNumber = null;
      this.pinCode = null;
      this.buildingInfo = null;
      this.streetInfo = null;
      this.landmarkInfo = null;
      this.cityInfo = null;
      this.stateInfo = null;
    }
  }
  toRawDict() {
    return {
      full_name: this.fullName,
      mobile_number: this.mobileNumber,
      pincode: this.pinCode,
      building_info: this.buildingInfo,
      street_info: this.streetInfo,
      landmark_info: this.landmarkInfo,
      city_info: this.cityInfo,
      state_info: this.stateInfo,
    };
  }
}
