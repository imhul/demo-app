import CriptoJs from 'crypto-js';

const getMD5 = (str: string) => {
    return CriptoJs.MD5(str).toString();
};

export default getMD5;
