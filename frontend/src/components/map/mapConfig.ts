export const mapConfig = {
  defaultProvider: "openstreetmap",
  providers: {
    openstreetmap: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
  },
  defaultCenter: [28.6139, 77.2090] as [number, number], // New Delhi Coordinates
  defaultZoom: 13,
  minZoom: 3,
  maxZoom: 18,
}
