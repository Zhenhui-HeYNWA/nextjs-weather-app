// transform the temp from Kelvin to celsius

export const kelvinToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
}