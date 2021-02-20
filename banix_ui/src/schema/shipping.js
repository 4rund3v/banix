/*
RawServiceabilityInfo
courier_company_id: 23
courier_name: "Xpressbees 1kg"
estimated_delivery_days: "2"
rate: 110
 */
export class ServiceabilityInfo {
  constructor(rawServiceabilityInfo) {
    this.serviceabilityId = rawServiceabilityInfo.serviceability_id;
    this.deliveryPinCode = rawServiceabilityInfo.dst_pin_code;
    this.courierCompanyId = rawServiceabilityInfo.courier_company_id;
    this.courierCompanyName = rawServiceabilityInfo.courier_name;
    this.estimatedDeliveryDays = rawServiceabilityInfo.estimated_delivery_days;
    this.deliveryRate = rawServiceabilityInfo.rate;
  }
}
