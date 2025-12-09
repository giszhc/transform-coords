# transform coords 坐标转换

一个简单的 JavaScript/TypeScript 库，用于在不同坐标系之间进行转换：BD-09（百度坐标系）、GCJ-02（火星坐标系）和 WGS-84 坐标系。该库提供了以下坐标系之间的转换函数：

- **BD-09 (百度坐标系)** ↔ **GCJ-02 (火星坐标系)**（用于谷歌、高德等地图）
- **WGS-84** ↔ **GCJ-02**（用于 GPS）

##  参考coordtransform重写的TS版本

https://github.com/wandergis/coordtransform

## 安装

你可以通过 npm 安装该库：

```bash
npm install transform-coords
```

## 使用方法

安装完成后，你可以在项目中导入并使用转换函数。以下是可用的函数：

### `bd09ToGcj02(bdLng: number, bdLat: number) => [number, number]`

将百度 BD-09 坐标系的经纬度转换为 GCJ-02 坐标系（谷歌、高德等使用的坐标系）。

#### 参数：

- `bdLng` (number): 百度坐标系中的经度。
- `bdLat` (number): 百度坐标系中的纬度。

#### 返回值：

- 返回一个包含两个数值的数组，分别是转换后的 GCJ-02 坐标系中的经度和纬度。

#### 示例：

```
import { bd09ToGcj02 } from 'coord-transform';

const [lng, lat] = bd09ToGcj02(116.404, 39.915);
console.log(lng, lat);

```

------

### `gcj02ToBd09(lng: number, lat: number) => [number, number]`

将 GCJ-02 坐标系的经纬度转换为百度 BD-09 坐标系。

#### 参数：

- `lng` (number): GCJ-02 坐标系中的经度。
- `lat` (number): GCJ-02 坐标系中的纬度。

#### 返回值：

- 返回一个包含两个数值的数组，分别是转换后的 BD-09 坐标系中的经度和纬度。

#### 示例：

```
import { gcj02ToBd09 } from 'coord-transform';

const [bdLng, bdLat] = gcj02ToBd09(116.404, 39.915);
console.log(bdLng, bdLat);

```

------

### `wgs84ToGcj02(lng: number, lat: number) => [number, number]`

将 WGS-84 坐标系的经纬度转换为 GCJ-02 坐标系。

#### 参数：

- `lng` (number): WGS-84 坐标系中的经度。
- `lat` (number): WGS-84 坐标系中的纬度。

#### 返回值：

- 返回一个包含两个数值的数组，分别是转换后的 GCJ-02 坐标系中的经度和纬度。

#### 示例：

```
import { wgs84ToGcj02 } from 'coord-transform';

const [gcjLng, gcjLat] = wgs84ToGcj02(116.404, 39.915);
console.log(gcjLng, gcjLat);

```

------

### `gcj02ToWgs84(lng: number, lat: number) => [number, number]`

将 GCJ-02 坐标系的经纬度转换为 WGS-84 坐标系。

#### 参数：

- `lng` (number): GCJ-02 坐标系中的经度。
- `lat` (number): GCJ-02 坐标系中的纬度。

#### 返回值：

- 返回一个包含两个数值的数组，分别是转换后的 WGS-84 坐标系中的经度和纬度。

#### 示例：

```
import { gcj02ToWgs84 } from 'coord-transform';

const [wgsLng, wgsLat] = gcj02ToWgs84(116.404, 39.915);
console.log(wgsLng, wgsLat);

```

