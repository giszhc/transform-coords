// 定义一些常量
const x_PI = 3.14159265358979324 * 3000.0 / 180.0;
const PI = 3.1415926535897932384626;
const a = 6378245.0;
const ee = 0.00669342162296594323;

/**
 * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换
 * 即 百度 转 谷歌、高德
 * @returns [number, number]
 * @param bdLng
 * @param bdLat
 */
export const bd09ToGcj02 = (bdLng: number, bdLat: number): [number, number] => {
    const x = bdLng - 0.0065;
    const y = bdLat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
    const ggLng = z * Math.cos(theta);
    const ggLat = z * Math.sin(theta);
    return [ggLng, ggLat];
};

/**
 * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
 * 即 谷歌、高德 转 百度
 * @param lng
 * @param lat
 * @returns [number, number]
 */
export const gcj02ToBd09 = (lng: number, lat: number): [number, number] => {
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    const bdLng = z * Math.cos(theta) + 0.0065;
    const bdLat = z * Math.sin(theta) + 0.006;
    return [bdLng, bdLat];
};

/**
 * WGS-84 转 GCJ-02
 * @param lng
 * @param lat
 * @returns [number, number]
 */
export const wgs84ToGcj02 = (lng: number, lat: number): [number, number] => {
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    } else {
        const dLat = transformLat(lng - 105.0, lat - 35.0);
        const dLng = transformLng(lng - 105.0, lat - 35.0);
        const radLat = lat / 180.0 * PI;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        const sqrtMagic = Math.sqrt(magic);
        const newDLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        const newDLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        const mgLat = lat + newDLat;
        const mgLng = lng + newDLng;
        return [mgLng, mgLat];
    }
};

/**
 * GCJ-02 转换为 WGS-84
 * @param lng
 * @param lat
 * @returns [number, number]
 */
export const gcj02ToWgs84 = (lng: number, lat: number): [number, number] => {
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    } else {
        const dLat = transformLat(lng - 105.0, lat - 35.0);
        const dLng = transformLng(lng - 105.0, lat - 35.0);
        const radLat = lat / 180.0 * PI;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        const sqrtMagic = Math.sqrt(magic);
        const newDLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        const newDLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        const mgLat = lat + newDLat;
        const mgLng = lng + newDLng;
        return [lng * 2 - mgLng, lat * 2 - mgLat];
    }
};

/**
 * 判断是否在中国境内，不在中国境内则不做偏移
 * @param lng
 * @param lat
 * @returns boolean
 */
const outOfChina = (lng: number, lat: number): boolean => {
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
};

/**
 * 转换纬度
 * @param lng
 * @param lat
 * @returns number
 */
const transformLat = (lng: number, lat: number): number => {
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
    return ret;
};

/**
 * 转换经度
 * @param lng
 * @param lat
 * @returns number
 */
const transformLng = (lng: number, lat: number): number => {
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
};
