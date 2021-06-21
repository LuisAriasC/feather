export interface PackageSize {
  key?: string;
  description?: string;
}

export interface PackageStatus {
  key?: string;
  description?: string;
}

export interface Package {
  id?: string;
  comment?: string;
  description?: string;
  trackingNumber?: string;
  referenceId?: string;
  price?: number;
  similarity?: number;
  deliveryId?: string;
  delivery?: Delivery;
  sizeKey?: string;
  size?: PackageSize;
  width?: number;
  height?: number;
  weight?: number;
  length?: number;
  volumetricWeight?: number;
  packageStatusKey?: string;
  packageStatus?: PackageStatus;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DeliveryType {
  key?: string;
  description?: string;
}

export interface DeliveryStatus {
  key?: string;
  description?: string;
}

export interface Delivery {
  id?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  referenceId?: string;
  typeKey?: string;
  type?: DeliveryType;
  statusKey?: string;
  status?: DeliveryStatus;
  storeId?: string;
  //store?: Store;
  pickupId?: string;
  //pickup: DeliveryPickup;
  dropoffId?: string;
  //dropoff: DeliveryDropoff!
  packages: Package[];
  routeId?: string;
  //route: Route;
  messengerId?: string;
  //messenger: Messenger;
  //history: [DeliveryHistoryItem!]
  declaredValue?: number;
  quote?: number;
  price?: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
