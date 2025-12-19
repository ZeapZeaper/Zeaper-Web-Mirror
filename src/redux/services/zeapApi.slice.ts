import { createApi } from "@reduxjs/toolkit/query/react";
import fetchBaseQuery from "./baseQuery";
import responseHandler from "./responseHandler";

export default createApi({
  reducerPath: "zeapApi",
  baseQuery: fetchBaseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: [
    "User",
    "DeliveryAddress",
    "Comment",
    "Shops",
    "Shop",
    "Products",
    "Product",
    "Review",
    "Promo",
    "Basket",
    "Order",
    "Payment",
    "Voucher",
    "Point",
    "Wish",
    "Analytics",
    "BodyMeasurement",
    "DeliveryFee",
    "ExchangeRate",
    "Notification",
    "PushToken",
    "EmailTemplate",
    "Help",
    "Policy",
  ],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `user/`,
          params: { userId },
        };
      },
      providesTags: ["User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getAuthUser: builder.query({
      query: (arg) => {
        const { uid } = arg;
        return {
          url: `userByUid/`,
          params: { uid },
        };
      },
      providesTags: ["User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getAuthUserRecommendedCurrency: builder.query({
      query: (arg) => {
        const { uid } = arg;
        return {
          url: `user/currency/recommended`,
          params: { uid },
        };
      },
      providesTags: ["User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getUsers: builder.query({
      query: () => {
        return {
          url: `users/`,
        };
      },
      providesTags: ["User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    createPasswordUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
    }),
    createGoogleAppleUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/create/googleApple`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
    }),
    createGuestUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/user/guest/create`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
      // onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
      //   responseHandler(
      //     {
      //       success: "User Successfully Created",
      //       successHandler,
      //       errorHandler,
      //     },
      //     queryArgs
      //   );
      // },
    }),
    convertPasswordUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/guest/convert/emailPassword`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
    }),
    mergeGoogleAppleLoginGuestUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/guest/login/googleApple/merge`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
    }),
    mergePasswordLoginGuestUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/guest/login/password/merge`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
    }),
    checkUserEmail: builder.query({
      query: (arg) => {
        const { email } = arg;
        return {
          url: `user/checkEmail`,
          params: { email },
        };
      },
      providesTags: ["User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),

    updateUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update`,
          method: "PUT",
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: [
        "User",
        "Product",
        "Products",
        "Promo",
        "Basket",
        "Order",
        "Payment",
        "Voucher",
        "Point",
        "Wish",
      ],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateUserProfilePic: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/update/profilePic`,
          method: "PUT",
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    verifyOtp: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/verifyUserOTP`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Phone Number Verified",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    disableUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Disabled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    enableUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/restore`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "User Successfully Enabled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    sendOTPToUser: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `user/sendOTPToUser`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "OTP Sent to your phone number",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addDeliveryAddress: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `deliveryAddress/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["DeliveryAddress"],
    }),
    updateDeliveryAddress: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `deliveryAddress/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["DeliveryAddress"],
    }),
    setDefaultDeliveryAddress: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `deliveryAddress/setDefault`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["DeliveryAddress"],
    }),
    deleteDeliveryAddress: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `deliveryAddress/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["DeliveryAddress"],
    }),
    getDeliveryAddresses: builder.query({
      query: (arg) => {
        return {
          url: `deliveryAddresses/`,
          params: { ...arg },
        };
      },
      providesTags: ["DeliveryAddress"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getUserComments: builder.query({
      query: (arg) => {
        const { userId } = arg;
        return {
          url: `comment/user/`,
          params: { userId },
        };
      },
      providesTags: ["User", "Comment"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getShopComments: builder.query({
      query: (arg) => {
        const { shopId } = arg;
        return {
          url: `comment/shop/`,
          params: { shopId },
        };
      },
      providesTags: ["Shops", "Shop", "Comment"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    UpdateComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Comment"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Comment Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Comment"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Comment Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    createComment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `comment/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Comment"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Comment Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    createShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Shops"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Shop Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getShops: builder.query({
      query: (arg) => {
        return {
          url: `shops/`,
          params: { ...arg },
        };
      },
      providesTags: ["Shops"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getShop: builder.query({
      query: (arg) => {
        return {
          url: `shop/auth`,
          params: { ...arg },
        };
      },
      providesTags: ["Shops", "Shop"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    getShopPayments: builder.query({
      query: (arg) => {
        return {
          url: `shop/revenues`,
          params: { ...arg },
        };
      },
      providesTags: ["Shops", "Shop", "Order", "Payment", "Basket"],
    }),
    getPaymentReference: builder.query({
      query: (arg) => {
        return {
          url: `payment/reference`,
          params: { ...arg },
        };
      },
    }),
    verifyPayment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `payment/verify`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Payment", "Order", "Basket"],
    }),
    updateShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/update`,
          method: "PUT",
          body: payload,
          params: { _id: payload._id },
        };
      },
      invalidatesTags: ["Shops", "Shop"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Shop Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    disableShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Shops", "Shop"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Shop Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    enableShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `shop/restore`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Shops", "Shop"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Shop Successfully Enabled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getProductsOptions: builder.query({
      query: (arg) => {
        return {
          url: `products/options`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getProductsDynamicFilters: builder.query({
      query: (arg) => {
        return {
          url: `products/dynamicFilters`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getProductListDynamicFilters: builder.query({
      query: (arg) => {
        return {
          url: `products/list/dynamicFilters`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getShopProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/auth/shop`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Shop", "Product", "User"],
    }),
    getProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/live`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getProductBrands: builder.query({
      query: (arg) => {
        return {
          url: `products/live/brand`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getMostPopularProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/live/mostPopular`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getNewestArrivalProducts: builder.query({
      query: (arg) => {
        return {
          url: `/products/live/newest`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getMinProductPrice: builder.query({
      query: (arg) => {
        return {
          url: `/products/live/leastPrice`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getBespokeProducts: builder.query({
      query: (arg) => {
        return {
          url: `/products/live/bespoke`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getSearchProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/live/searchProducts`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getSimilarProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/live/similar`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getRecentViewedProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/recentViews`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product"],
    }),
    getBuyAgainProducts: builder.query({
      query: (arg) => {
        return {
          url: `/products/live/buyAgain`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product", "Order"],
    }),
    getRecommendedProducts: builder.query({
      query: (arg) => {
        return {
          url: `/products/live/recommended`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product", "Order"],
    }),
    getShopDraftProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/shop/draft`,
          params: { ...arg },
        };
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (arg) => {
        return {
          url: `product/`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product"],
    }),
    getProductById: builder.query({
      query: (arg) => {
        return {
          url: `product/id`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product"],
    }),
    createProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    updateAutoPriceAdjustment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/autoPriceAdjustment`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    updateProductColorAndImages: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addColorAndImages`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addProductVariation`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    editProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/editProductVariation`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    submitProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/submitProduct`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Submitted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteProductVariation: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductVariation`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteProductColor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductColor`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteProductImage: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/deleteProductImage`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    setProductImageAsDefault: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/setProductImageAsDefault`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    setProductStatus: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/status`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Status Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addImagesToProductColor: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/update/addImagesToProductColor`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    disableProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    absoluteDeleteProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/delete/absolute`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    enableProduct: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/restore`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Enabled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getProductReviews: builder.query({
      query: (arg) => {
        return {
          url: `reviews/`,
          params: { ...arg },
        };
      },
      providesTags: ["Review"],
    }),
    getUserReviews: builder.query({
      query: (arg) => {
        return {
          url: `reviews/user`,
          params: { ...arg },
        };
      },
      providesTags: ["Review"],
    }),
    getCanUserReview: builder.query({
      query: (arg) => {
        return {
          url: `review/permission`,
          params: { ...arg },
        };
      },
      providesTags: ["Review"],
    }),
    getProductReview: builder.query({
      query: (arg) => {
        return {
          url: `review/`,
          params: { ...arg },
        };
      },
      providesTags: ["Review"],
    }),
    createProductReview: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `review/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Review Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateProductReview: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `review/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Review Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    likeProductReview: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `review/update/likeReview`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Review Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    dislikeProductReview: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `review/update/dislikeReview`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Review Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteProductReview: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `review/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Review Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getPromos: builder.query({
      query: (arg) => {
        return {
          url: `promos/live`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo"],
    }),

    getAvailablePromos: builder.query({
      query: (arg) => {
        return {
          url: `promos/available`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo"],
    }),

    getPromo: builder.query({
      query: (arg) => {
        return {
          url: `promo/`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo"],
    }),
    getProductPromo: builder.query({
      query: (arg) => {
        return {
          url: `/product/promo`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo"],
    }),
    getPromoProducts: builder.query({
      query: (arg) => {
        return {
          url: `promo/products`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo"],
    }),
    getLivePromoProducts: builder.query({
      query: (arg) => {
        return {
          url: `products/live/promo`,
          params: { ...arg },
        };
      },
      providesTags: ["Promo", "Product", "Products"],
    }),
    createPromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Created",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updatePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    joinPromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/join`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Joined",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    leavePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/leave`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Left",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    schedulePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/schedule`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Scheduled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    expirePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/expire`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Finished",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),

    activatePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/activate`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Activated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deletePromo: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `promo/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["Promo"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Promo Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addProductToCart: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/product/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
    }),
    updateCartItem: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/product/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
    }),
    getCart: builder.query({
      query: (arg) => {
        return {
          url: `basket/`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket"],
    }),
    getBaskets: builder.query({
      query: (arg) => {
        return {
          url: `baskets/`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket"],
    }),
    getBasketTotal: builder.query({
      query: (arg) => {
        return {
          url: `basket/total`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket"],
    }),
    getBasketDeliveryDates: builder.query({
      query: (arg) => {
        return {
          url: `basket/deliveryDates`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket"],
    }),
    getBasketDeliveryFees: builder.query({
      query: (arg) => {
        return {
          url: `basket/deliveryFees`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket"],
    }),
    addProductToBasket: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/addProduct`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Added to Basket",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    removeProductFromBasket: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/product/remove`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Removed from Basket",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    increaseProductQuantityInBasket: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/product/increase`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
      // onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
      //   responseHandler(
      //     {
      //       success: "Product Quantity Successfully Increased",
      //       successHandler,
      //       errorHandler,
      //     },
      //     queryArgs
      //   );
      // },
    }),
    decreaseProductQuantityInBasket: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `basket/product/decrease`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket"],
      // onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
      //   responseHandler(
      //     {
      //       success: "Product Quantity Successfully Decreased",
      //       successHandler,
      //       errorHandler,
      //     },
      //     queryArgs
      //   );
      // },
    }),
    addProductBodyMeasurement: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `product/bodyMeasurement/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Products", "Product"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Body Measurement Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getProductBodyMeasurement: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurement/product`,
          params: { ...arg },
        };
      },
      providesTags: ["Products", "Product"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    getBuyerOrders: builder.query({
      query: (arg) => {
        return {
          url: `orders/authUser/buyer`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    getOrder: builder.query({
      query: (arg) => {
        return {
          url: `order/`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    getOrderByOrderId: builder.query({
      query: (arg) => {
        return {
          url: `order/authUser/buyer/orderId`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    downloadOrderReceipt: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `order/reciept/download`,
          method: "POST",
          body: payload,
        };
      },
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Receipt Successfully Downloaded",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getAuthShopOrders: builder.query({
      query: (arg) => {
        return {
          url: `/orders/authUser/vendor`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order", "Shop", "User"],
    }),
    getProductOrders: builder.query({
      query: (arg) => {
        return {
          url: `orders/products`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    getProductOrder: builder.query({
      query: (arg) => {
        return {
          url: `orders/product`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    getProductOrderStatusHistory: builder.query({
      query: (arg) => {
        return {
          url: `orders/product-order/status/history`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    getProductOrderStatusOptions: builder.query({
      query: (arg) => {
        return {
          url: `orders/status/options`,
          params: { ...arg },
        };
      },
      providesTags: ["Basket", "Order"],
    }),
    updateProductOrderStatus: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `order/status`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Order Status Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    cancelProductOrder: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `order/cancel`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Order Successfully Cancelled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    rejectProductOrder: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `order/reject`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Order Successfully Cancelled",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getPayments: builder.query({
      query: (arg) => {
        return {
          url: `payments/`,
          params: { ...arg },
        };
      },
      providesTags: ["Payment"],
    }),
    getPayment: builder.query({
      query: (arg) => {
        return {
          url: `payment/`,
          params: { ...arg },
        };
      },
      providesTags: ["Payment"],

    }),
    payShop: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `payment/shop`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Payment", "Product", "Products", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Payment Successfully Made",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    revertShopPayment: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `payment/revert/shop`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Payment", "Product", "Products", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Payment Successfully Reverted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    applyVoucher: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `voucher/apply`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket", "Voucher", "Order"],
    }),
    removeVoucher: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `voucher/remove`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Basket", "Voucher", "Order"],
    }),
    getActiveVouchers: builder.query({
      query: (arg) => {
        return {
          url: `vouchers/authUser/active`,
          params: { ...arg },
        };
      },
      providesTags: ["Voucher", "Basket", "Point", "Order"],
  
    }),
    getInActiveVouchers: builder.query({
      query: (arg) => {
        return {
          url: `vouchers/authUser/inactive`,
          params: { ...arg },
        };
      },
      providesTags: ["Voucher", "Basket", "Point", "Order"],
  
    }),
    getPoints: builder.query({
      query: (arg) => {
        return {
          url: `point/authUser`,
          params: { ...arg },
        };
      },
      providesTags: ["Point", "User", "Voucher"],
    }),
    convertPointToVoucher: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `point/convert/voucher`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Point", "User", "Voucher"],
      // onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
      //   responseHandler(
      //     {
      //       success: "Point Successfully Converted to Voucher",
      //       successHandler,
      //       errorHandler,
      //     },
      //     queryArgs
      //   );
      // },
    }),
    getWishList: builder.query({
      query: (arg) => {
        return {
          url: `/wish/auth/user`,
          params: { ...arg },
        };
      },
      providesTags: ["Wish", "User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    addProductToWishList: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/wish/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Wish", "User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Added to Wish List",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    removeProductFromWishList: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/wish/remove`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["Wish", "User"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Product Successfully Removed from Wish List",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getShopAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `analytics/shop`,
          params: { ...arg },
        };
      },
      providesTags: ["Shop", "Shops", "Analytics"],
    }),
    getProductOrderAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `analytics/products/general`,
          params: { ...arg },
        };
      },
      providesTags: ["Product", "Products", "Analytics"],
    }),
    getCountAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `analytics/count`,
          params: { ...arg },
        };
      },
      providesTags: ["Analytics"],
    }),
    getUserShopCountAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `/analytics/users/shop/count`,
          params: { ...arg },
        };
      },
      providesTags: ["Analytics"],
    }),
    getProductOrdersCountByDateAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `analytics/count/productOrders/date`,
          params: { ...arg },
        };
      },
      providesTags: ["Analytics", "Product", "Products", "Order"],
    }),
    getProductAnalytics: builder.query({
      query: (arg) => {
        return {
          url: `analytics/products`,
          params: { ...arg },
        };
      },
      providesTags: ["Analytics", "Product", "Products", "Order"],
    }),
    getReadyMadeSizeGuide: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurementGuide/readyMade`,
          params: { ...arg },
        };
      },
      providesTags: ["BodyMeasurement"],
    }),
    getBodyMeasurementGuide: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurementGuide/bespoke`,
          params: { ...arg },
        };
      },
      providesTags: ["BodyMeasurement"],
    }),
    getBodyMeasurementGuideGallery: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurementGuide/bespoke/gallery`,
          params: { ...arg },
        };
      },
      providesTags: ["BodyMeasurement"],
    }),
    getBodyMeasurementGuideFields: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurementGuide/bespoke/fields`,
          params: { ...arg },
        };
      },
      providesTags: ["BodyMeasurement"],
    }),
    uploadBodyMeasurementGuideImage: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/field/Image`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Image Successfully Uploaded",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteBodyMeasurementGuideFieldImage: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/field/Image/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Image Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateBodyMeasurementGuideField: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/field/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Field Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteBodyMeasurementGuideField: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/field/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Field Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteBodyMeasurementGuide: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Measurement Guide Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateBodyMeasurementGuideName: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/name/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Measurement Guide Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addBodyMeasurementGuideField: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/field/add`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Measurement Guide Field Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    addBodyMeasurementGuide: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/bodyMeasurementGuide/bespoke/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Measurement Guide Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getBodyMeasurementTemplates: builder.query({
      query: (arg) => {
        return {
          url: `bodyMeasurementTemplate/authUser`,
          params: { ...arg },
        };
      },
      providesTags: ["BodyMeasurement"],
    }),
    addBodyMeasurementTemplate: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `bodyMeasurementTemplate/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Body Measurement Template Successfully Added",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateBodyMeasurementTemplate: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `bodyMeasurementTemplate/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Body Measurement Template Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    deleteBodyMeasurementTemplate: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `bodyMeasurementTemplate/delete`,
          method: "DELETE",
          body: payload,
        };
      },
      invalidatesTags: ["BodyMeasurement"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Body Measurement Template Successfully Deleted",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getDeliveryFee: builder.query({
      query: (arg) => {
        return {
          url: `/deliveryFee`,
          params: { ...arg },
        };
      },
      providesTags: ["DeliveryFee", "Order"],
    }),

    updateDeliveryFee: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/deliveryFee/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["DeliveryFee", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Delivery Fee Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getExchangeRate: builder.query({
      query: (arg) => {
        return {
          url: `/exchangeRate`,
          params: { ...arg },
        };
      },
      providesTags: ["ExchangeRate", "Order"],
    }),
    updateExchangeRate: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/exchangeRate/update`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["ExchangeRate", "Order"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Exchange Rate Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    registerPushToken: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/notification/pushToken/register`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["PushToken"],
      // onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
      //   responseHandler(
      //     {
      //       success: 'Push Token Successfully Registered',
      //       successHandler,
      //       errorHandler,
      //     },
      //     queryArgs,
      //   );
      // },
    }),
    getNotifications: builder.query({
      query: (arg) => {
        return {
          url: `/notification/inbox`,
          params: { ...arg },
        };
      },
      providesTags: ["Notification", "User"],
      // onQueryStarted: async (_, queryArgs) => {
      //   responseHandler({}, queryArgs);
      // },
    }),
    markNotificationAsSeen: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/notification/inbox/markAsSeen`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Notification"],
    }),
    deleteNotification: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/notification/inbox/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Notification"],
    }),
    deleteAllNotifications: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/notification/inbox/all/delete`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Notification"],
    }),
    getEmailTemplate: builder.query({
      query: (arg) => {
        return {
          url: `/emailTemplate`,
          params: { ...arg },
        };
      },
      providesTags: ["EmailTemplate"],
    }),
    addEmailTemplate: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/emailTemplate/add`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["EmailTemplate"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "Email Template Successfully Updated",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    getHelpArticles: builder.query({
      query: (arg) => {
        return {
          url: `/help/articles`,
          params: { ...arg },
        };
      },
      providesTags: ["Help"],
    }),
    getPopularTopicsByCategory: builder.query({
      query: (arg) => {
        return {
          url: `/help/articles/popular`,
          params: { ...arg },
        };
      },
      providesTags: ["Help"],
    }),
    getHelpArticle: builder.query({
      query: (arg) => {
        return {
          url: `/help/article`,
          params: { ...arg },
        };
      },
      providesTags: ["Help"],
    }),
    markHelpArticleHelpful: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/help/article/update/markHelpful`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Help"],
    }),
    addToWaitingList: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/email/waitlist/add`,
          method: "POST",
          body: payload,
        };
      },
    }),
    addToNewsletter: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/email/newsletter/add`,
          method: "POST",
          body: payload,
        };
      },
    }),

    getSellerPolicy: builder.query({
      query: (arg) => {
        return {
          url: `/policy/seller`,
          params: { ...arg },
        };
      },
      providesTags: ["Policy", "User", "Shop"],
    }),
    getShopOnboardingDocuments: builder.query({
      query: (arg) => {
        return {
          url: `/shop/onboarding-documents`,
          params: { ...arg },
        };
      },
      providesTags: ["Shop"],
    }),
    addOnboardingDocument: builder.mutation({
      query: (arg) => {
        const { payload } = arg;
        return {
          url: `/shop/onboarding-document/add`,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});
