declare const axiosInstance: {
    get: jest.Mock<any, any, any>;
    post: jest.Mock<any, any, any>;
    delete: jest.Mock<any, any, any>;
    interceptors: {
        request: {
            use: jest.Mock<any, any, any>;
            eject: jest.Mock<any, any, any>;
        };
        response: {
            use: jest.Mock<any, any, any>;
            eject: jest.Mock<any, any, any>;
        };
    };
};
export default axiosInstance;
