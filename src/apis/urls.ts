export const API_URL = {

    saveVehicleLocation: () => `/api/save-vehicle-location`,
    getVehicleLocation: () => `/api/get-vehicle-location`,
    getAllVehicleLocation: () => `/api/get-all-vehicle-location`,
    getAdvertiserAllVehicleLocation: () => `/api/get-advertiser-all-vehicle-location`,
    getAllVehicleLocationDate: () => `/api/get-all-vehicle-date`,
    getAllAdVehicleLocationDate: () => `/api/get-all-advertisement-vehicle-date`,
    postLogVehicleLocation: () => `/api/log-vehicle-location`,
    postVehicleFinishRide: () => `/api/vehicle-finish-ride`,
    getNotices: () => `/api/get-notices`,
    getNoticeDetails: (id: string) => `/api/notice/${id}`,
    getAllNotifications: () => `/api/notifications`,
    getPostCategories: (type = '', limit = 100) => `api/get-post-categories?type=${type}&limit=${limit}`,
    getFaqList: (currentPage: number, filter?: string) => `/api/get-faq/${filter || '{filter}'}?page=${currentPage}&limit=10`,
    getUserDetails: () => `/api/get-user-details`,
    postChangePassword: () => `/api/change-password`,
    updateUserInfo: () => `/api/update-myinfo`,
    updateProfileImage: () => `/api/update-profile-image`,
    postMemberWithdrawal: () => `/api/membership-withdrawal`,
    kaKaoMapDirection: () => `https://apis-navi.kakaomobility.com/v1/directions`,
    kaKaoMultipleStopPointDirection: () => `https://apis-navi.kakaomobility.com/v1/waypoints/directions`,
    kaKaoMapSearchAddress: () => `https://dapi.kakao.com/v2/local/search/address.json`,
    kaKaoPlaceSearchByKeyword: () => `https://dapi.kakao.com/v2/local/search/keyword.json`,
    getInquiryList: () => `/api/get-inquiry`,
    getInquiryDetails: (id: string) => `/api/inquiry/${id}`,
    saveInquiry: () => `/api/save-inquiry`,
    updateInquiry: () => `/api/update-inquiry`,
    deleteInquiry: (id: string) => `/api/delete-inquiry/${id}`,
    postLogin: () => `/api/login`,
    postRegister: () => `/api/register`,
    postLogout: () => `/api/logout`,
    postVerifyInput: () => `/api/verify-input`,
    postFindId: () => `/api/get-id`,
    postCheckUser: () => `/api/check-user`,
    postSendOtp: () => `/api/send-otp`,
    postVerifyOtp: () => `/api/verify-otp`,
    postResetPassword: () => `/api/reset-password`,
    getAdvertisements: () => `/api/get-advertisement`,
    getAdvertisementDetails: (advertisement_id: string) => `/api/get-all-advertisement-vehicles/${advertisement_id}`,
    getVehicleDetails: (advertisement_id: string, cargo_vehicle_id: string) => `/api/get-detail-advertisement-vehicles?advertisement_id=${advertisement_id}&cargo_vehicle_id=${cargo_vehicle_id}`,
    getAdvertisementImages: (advertisement_id: string) => `/api/show-cargo-pictures?id=${advertisement_id}`,
    getVehicleList: () => `/api/get-vehicle-list`,
    getOperatingAreas: () => `/api/get-operatingArea`,
    saveAdvertisement: () => `/api/save-advertisement`,
    getAdvertisementVehicles: () => `/api/get-advehicles`,
    getAdvertiserVehicleStats: () => `/api/get-advertiser-dashboard-stats`,
    getAdvertisementStats: () => `/api/show-advertisement-stats`,
    getVehiclesAdvertisementStats: () => `/api/vehicles-advertisement-stats`,
    getAdvertisementOperationArea: (advertisement_id: string) => `/api/get-advertisement-operating-area/${advertisement_id}`,
    deleteAdvertisement: (id: string) => `/api/delete-advertisement/${id}`,
    updateAdvertisementStatus: () => `/api/update-advertisement-status`,
    getAdvertisementCargoList: () => `/api/get-advehicles-list`,
    getCargoImages: () => `/api/get-cargo-images`,
    getStatBasedAdvertisement: () => `/api/stats-based-advertisement`,
    getDraftAdvertisementImages: (id: string) => `/api/get-advertisement-images/${id}/draft`,
    getCargoVerificationImages: () => `/api/get-cargo-verification-images`

}