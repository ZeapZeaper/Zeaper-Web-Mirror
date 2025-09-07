/* eslint-disable @typescript-eslint/no-explicit-any */
interface RouteInterface {
  path: string;
  component: any;
  isDefault?: boolean;
}
interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}
interface ImageUrlInterface {
  link: string;
  name: string;
  isDefault?: boolean;
  type?: string;
}
interface SocialInterface {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  tikTok?: string;
  linkedin?: string;
}

interface UserInterface {
  [key: string]: any;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  __v: number;
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  phoneNumberVerified: boolean;
  shopId: string;
  imageUrl: ImageUrlInterface;
  uid: string;
  userId: string;
  address: string;
  region: string;
  country: string;
  isVendor: boolean;
  disabled: boolean;
  acceptMarketing: boolean;
  isAdmin: boolean;
  isGuest: boolean;
  superAdmin: boolean;
  prefferedCurrency: string;
  social?: SocialInterface;
}
interface SighnUpInterface {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  region?: string;
  country?: string;
  _id?: string;
  social?: SocialInterface;
}

interface CommentInterface {
  _id: string;
  userId?: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: UserInterface;
  type: string;
  commentBy: UserInterface;
}
interface CurrencyInterface {
  name: string;
  symbol: string;
  _id: string;
}
interface ShopInterface {
  _id: string;
  businessName: string;
  shopName: string;
  userId: string;
  source: string;
  description: string;
  imageUrl: ImageUrlInterface;
  shopId: string;
  phoneNumber: string;
  address: string;
  region: string;
  country: string;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: UserInterface;
  comments: CommentInterface[];
  social: SocialInterface;
  isShoeMaker?: boolean;
  isTailor?: boolean;
  isMakeUpArtist?: boolean;
  totalRevenue?: number;
  currency?: CurrencyInterface;
  email?: string;
}

interface ColorInterface {
  value: string;
  images: ImageUrlInterface[];
}

interface AgeInterface {
  ageGroup: string;
  ageRange?: string;
}
interface ProductCategoryInterface {
  gender: string[];
  age: AgeInterface[];
  style: string[];
  main: string[];
  sleeveLength?: string;
  design: string[];
  fastening?: string[];
  occasion?: string[];
  fit?: string[];
  brand?: string;
  heelHeight?: string;
  heelType?: string;
  accessoryType?: string;
  productGroup: string;
}

interface VariationInterface {
  sku: string;
  price: number;
  discount?: number;
  colorValue?: string;
  size?: string;
  quantity?: number;
  currency: string;
  bespoke?: BespokeInterface;
}
interface TimelineInterface {
  date: string;
  description: string;
  actionBy: UserInterface;
}
interface BespokeInterface {
  isBespoke: boolean;
  colorType: "single" | "multiple";
  availableColors: string[];
}
interface ProductInterface {
  productType: "readyMadeCloth" | "readyMadeShoe";
  productId: string;
  disabled: boolean;
  shopId: string;
  title: string;
  description: string;
  subTitle: string;
  status: string;
  currentStep: number;
  sizes: string[];
  sizeStandard?: string;
  colors: ColorInterface[];
  postedBy: UserInterface;
  shop: ShopInterface;
  categories: ProductCategoryInterface;
  variations: VariationInterface[];
  bodyMeasurement: string;
  promo?: {
    promoId: string;
    discountPercentage: number;
  };
  autoPriceAdjustment: {
    isAdjustable: boolean;
    adjustmentPercentage: number;
  };
  currency: CurrencyInterface;
  _id: string;
  rejectionReasons: string[];
  timeLine: TimelineInterface[];
}
interface LikeDislikeInterface {
  value: number;
  users: string[];
}
interface ProductReviewInterface {
  _id: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  user: UserInterface;
  product: ProductInterface;
  title: string;
  displayName: string;
  likes: LikeDislikeInterface;
  dislikes: LikeDislikeInterface;
}

interface BodyMeasurementInterface {
  productId: string;
  measurements: [
    {
      name: string;
      measurements: [
        {
          field: string;
          value: number;
          unit: string;
        }
      ];
    }
  ];
}
interface BodyMeasurementTemplateInterface {
  _id: string;
  templateName: string;
  gender: string;
  measurements: [
    {
      field: string;
      value: number;
      unit: string;
    }
  ];
}
interface RangePercentageInterface {
  min: number;
  max: number;
}
interface PromoDiscountInterface {
  type: "range" | "fixed";
  fixedPercentage?: number;
  rangePercentage?: RangePercentageInterface;
}
interface PromoInterface {
  promoId: string;
  title: string;
  subTitle: string;
  permittedProductTypes: string[];
  productIds: string[];
  description: string;
  discount: PromoDiscountInterface;
  status: string;
  productsCount: number;
  smallScreenImageUrl: ImageUrlInterface;
  largeScreenImageUrl: ImageUrlInterface;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface BasketItemIterface {
  _id: string;
  product: ProductInterface;
  quantity: number;
  sku: string;
  price: number;
  productId: string;
  color: string;
  size?: string;
  title: string;
  image: string;
  discountedAmount: number | null;
  originalAmount: number;
  actualAmount: number;
  currency: string;
  bespokeInstruction?: string;
  bespokeColor?: string;
  bodyMeasurements?: [
    {
      name: string;
      measurements: [
        {
          field: string;
          value: number;
          unit: string;
        }
      ];
    }
  ];
}
interface BasketInterface {
  user: UserInterface;
  basketId: string;
  updatedAt: Date;
  createdAt: Date;
  currency: string;
  basketItems: BasketItemIterface[];
  total: number;
  subTotal: number;

  totalWithoutVoucher?: number;
  appliedVoucherAmount?: number;
  itemsTotal: number;
  deliveryFee: number;
}
interface MeasurementInterface {
  name: string;
  fields: string[];
}
interface deliveryAddressInterface {
  user: UserInterface;
  address: string;
  region: string;
  country: string;
  postCode: string;
  phoneNumber: string;
  isDefault: boolean;
  disabled: boolean;
}
interface PaymentInterface {
  _id: string;
  user: UserInterface;
  fullName: string;
  email: string;
  status: string;
  reference: string;
  amount: number;
  appliedVoucherAmount: number;
  total: number;
  deliveryFee: number;
  itemsTotal: number;
  paidAt: Date;
  updatedAt: Date;
  channel: string;
  transactionDate: Date;
  cardType: string;
  bank: string;
  currency: string;
  countryCode: string;
  fees: number;
  gatewayResponse: string;
  log: any;
}
interface ProductOrdersInterface {
  _id: string;
  order: OrderInterface;
  orderId: string;
  disabled: boolean;
  itemNo: number;
  shop: ShopInterface;
  product: ProductInterface;
  user: UserInterface;
  quantity: number;
  sku: string;
  color?: string;
  size?: string;
  deliveryAddress: deliveryAddressInterface;
  bespokeColor?: string;
  images: [
    {
      name: string;
      link: string;
    }
  ];
  bodyMeasurements?: [
    {
      name: string;
      measurements: [
        {
          field: string;
          value: number;
          unit: string;
        }
      ];
    }
  ];
  status: {
    name: string;
    value: string;
  };
  amount: [
    {
      currency: string;
      value: number;
    }
  ];
  promo?: {
    promoId: string;
    discountPercentage: number;
  };
  expectedVendorCompletionDate: {
    min: Date;
    max: Date;
  };
  expectedDeliveryDate: {
    min: Date;
    max: Date;
  };
  deliveryDate: Date;
  deliveryTime: string;
  deliveryFee: number;
  deliveryCompany: string;
  deliveryTrackingNumber?: string;
  deliveryTrackingLink?: string;
  shopRevenue: {
    currency: string;
    value: number;
    status: string;
    reference?: string;
    paidAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface VoucherInterface {
  _id: string;
  user: UserInterface;
  source: string;
  code: string;
  amount: number;
  currency: string;
  status: string;
  isUsed: boolean;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface OrderInterface {
  _id: string;
  user: UserInterface;
  disabled: boolean;
  orderId: string;
  progress: {
    value: number;
    max: number;
    min: number;
  };
  deliveryAddress: deliveryAddressInterface;
  deliveryDetails: deliveryAddressInterface;
  payment: PaymentInterface;
  productOrders: ProductOrdersInterface[];
  voucher: VoucherInterface;
  gainedPoints: number;
  cancel: {
    isCancelled: boolean;
    reason: string;
    cancelledAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
interface PointInterface {
  user: UserInterface;
  availablePoints: number;
  redeemedPoints: number;
  totalPoints: number;
}

interface WishlistInterface {
  _id: string;
  user: UserInterface;
  product: ProductInterface;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
interface ShopPaymentInterface {
  _id: string;
  productOrder_id: string;
  buyerPaid: {
    currency: string;
    value: number;
    _id: string;
  };
  purchaseDate: Date;
  purchasedProduct: {
    title: string;
    productId: string;
    productType: string;
    sku: string;
    images: [
      {
        name: string;
        link: string;
      }
    ];
  };

  shopRevenue: {
    currency: string;
    value: number;
    status: string;
    _id: string;
  };
}
interface ShopAnaliticsInterface {
  productSold: number;
  ordersCountByStatus: {
    placed: number;
    confirmed: number;
    processing: number;
    ready: number;
    dispatched: number;
    delivered: number;
    cancelled: number;
  };
  productGroupsCount: {
    "Ready-Made": number;
    Bespoke: number;
  };

  shopRevenuesByPaymentStatus: {
    pending: {
      currency: string;
      value: number;
    };
    paid: {
      currency: string;
      value: number;
    };
  };
}
interface ProductAnaliticsInterface {
  productSold: number;
  ordersCountByStatus: {
    placed: number;
    confirmed: number;
    processing: number;
    ready: number;
    dispatched: number;
    delivered: number;
    cancelled: number;
  };
  productGroupsCount: {
    "Ready-Made": number;
    Bespoke: number;
  };
}
interface BodyMeasurementGuideInterface {
  _id: string;
  name: string;
  gender: string;
  fields: [
    {
      _id: string;
      field: string;
      imageUrl: {
        name: string;
        link: string;
      };
      description: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
interface CountAnalyticsInterface {
  basket: {
    label: string;
    count: number;
  };
  order: {
    label: string;
    count: number;
  };
  productType: [
    {
      label: string;
      count: number;
    }
  ];
}
interface DeliveryAddressInterface {
  user: UserInterface;
  _id: string;
  address: string;
  region: string;
  country: string;
  postCode: string;
  phoneNumber: string;
  isDefault: boolean;
  disabled: boolean;
  firstName: string;
  lastName: string;
}
interface WishInterface {
  _id: string;
  user: UserInterface;
  product: ProductInterface;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  color: string;
  image: string;
}

interface HelpArticleInterface {
  articleId: string;
  _id: string;
  title: string;
  category: string;
  subCategory: string;
  content: string;
  tags: string[];
  createdBy: UserInterface;
  isPopular: boolean;
  markedIsHelpful: boolean;
  markedIsNotHelpful: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type {
  RouteInterface,
  DocumentWithFullscreen,
  UserInterface,
  SighnUpInterface,
  ImageUrlInterface,
  SocialInterface,
  CommentInterface,
  ShopInterface,
  ProductInterface,
  ColorInterface,
  CurrencyInterface,
  VariationInterface,
  TimelineInterface,
  ProductReviewInterface,
  LikeDislikeInterface,
  PromoInterface,
  BasketInterface,
  BasketItemIterface,
  BodyMeasurementInterface,
  MeasurementInterface,
  deliveryAddressInterface,
  PaymentInterface,
  ProductOrdersInterface,
  OrderInterface,
  VoucherInterface,
  PointInterface,
  WishlistInterface,
  ShopPaymentInterface,
  ShopAnaliticsInterface,
  BodyMeasurementGuideInterface,
  ProductAnaliticsInterface,
  CountAnalyticsInterface,
  ProductCategoryInterface,
  DeliveryAddressInterface,
  BodyMeasurementTemplateInterface,
  WishInterface,
  HelpArticleInterface,
};
