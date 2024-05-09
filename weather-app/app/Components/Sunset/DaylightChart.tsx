import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  

} from 'recharts';
import { useGlobalContext } from '@/app/context/globalContext';
import { unixToTime } from '@/app/utils/misc';
import { sun } from '@/app/utils/Icons';


function DaylightChart() {
  const { forecast } = useGlobalContext();
  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;
  const sunsetTime = unixToTime(times, timezone);
  const sunriseTime = unixToTime(forecast?.sys?.sunrise, timezone);

  // 计算日出和日落的中间值
  const calculateMidpointTime = (time1: string, time2: string) => {
    const moment1 = moment(time1, 'HH:mm');
    const moment2 = moment(time2, 'HH:mm');
    const diff = moment2.diff(moment1, 'minutes');
    return moment1.add(diff / 2, 'minutes').format('HH:mm');
  };

  const midDay = calculateMidpointTime(sunriseTime, sunsetTime);

  // 数据集，包括时间和对应的值
  const data = [
    { time: '00:00', value: -1, name: "Midnight" }, // 代表午夜
    { time: sunriseTime, value: 0, name: "Sunrise" }, // 假设日出时间
    { time: midDay, value: 2, name: "MidDay" }, // 中午时间
    { time: sunsetTime, value: 0, name: "Sunset" }, // 假设日落时间
    { time: '23:59', value: -1, name: "Midnight" } // 第二天午夜
  ];

  // 将时间转换为 24 小时格式的分钟数
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // 扩展数据集，将时间转换为分钟数
  const extendedData = data.map((d) => ({
    ...d,
    minutes: timeToMinutes(d.time)
  }));

  // 获取当前时间并转换为分钟数
  const getCurrentTimeInMinutes = () => {
    return timeToMinutes(moment().format('HH:mm'));
  };

  // 获取当前时间对应的 y 轴值
  const getCurrentValue = () => {
    const currentTimeInMinutes = getCurrentTimeInMinutes();
    const before = extendedData.filter(d => d.minutes <= currentTimeInMinutes).pop();
    const after = extendedData.find(d => d.minutes >= currentTimeInMinutes);

    if (before && after) {
      const slope = (after.value - before.value) / (after.minutes - before.minutes);
      return before.value + slope * (currentTimeInMinutes - before.minutes);
    } else {
      return -1; // 默认值
    }
  };

  // 自定义 Tooltip 内容
  const customTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const { time, name } = payload[0].payload;
      return (
        <div className="absolute top-0 left-28 transform -translate-x-1/2 -translate-y-full dark:bg-dark-grey bg-white p-2 rounded shadow">
          <p>{`${time}`}</p>
          <p>{`${name}`}</p>
        </div>
      );
    }

    return null;
  };

 
  // `DaylightChart` 组件用于创建显示特定一天日照时间的图表
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(getCurrentTimeInMinutes());
  const [currentValue, setCurrentValue] = useState(getCurrentValue());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimeInMinutes(getCurrentTimeInMinutes());
      setCurrentValue(getCurrentValue());
    }, 1000);

    return () => clearInterval(interval);
  }, [forecast?.timezone]);

  return (
    // 响应式容器，确保图表适应父容器的宽度和高度
    <ResponsiveContainer width={'100%'} height={120}>
      {/* AreaChart 是 Recharts 提供的面积图表组件 */}
      <AreaChart
        data={extendedData}
        // margin={{ top: 5, right: 30, left: 30, bottom: 1 }}
      >
        <defs>
          {/* 定义线性渐变颜色，用于填充面积图 */}
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8D44D" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#E8D44D" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* X轴，用于显示时间 */}
        <XAxis
          dataKey="minutes"
          type="number"
          domain={[0, 1440]}
          tickFormatter={(tick) => moment().startOf('day').minutes(tick).format('HH:mm')}
          axisLine={false}
          tick={false}
        />
        {/* Y轴，用于显示值 */}
        <YAxis
          domain={[-2, 3]}
          ticks={[-1, 0, 2]}
          hide
        />
        {/* ReferenceLine 用于在 y = 0 的位置绘制一条参考线 */}
        <ReferenceLine y={0} stroke="black" strokeWidth={1} />
        {/* Tooltip 是一个提示框组件，用于悬停显示详细信息 */}
        <Tooltip content={customTooltip} />
        {/* Area 是面积图组件 */}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#E8D44D"
          fillOpacity={1}
          fill="url(#colorValue)"
          dot={{ stroke: '#808080', strokeWidth: 1 }}
        />
        {/* ReferenceDot 在图表中显示与当前时间对应的点 */}
        <ReferenceDot
          x={currentTimeInMinutes}
          y={currentValue}
          r={5}
          fill="#EA6E4A"
          stroke="white"
          strokeWidth={2}
          
        /> 
         
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default DaylightChart;
