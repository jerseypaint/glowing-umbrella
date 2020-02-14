import Typography from "typography"
const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.7,
  scaleRatio: 3,
  headerFontFamily: [
    "Roboto Slab",
    "Georgia",
    "serif",
  ],
  headerColor: "hsl(0, 0%, 0%);",
  bodyFontFamily: ["Hind Siliguri", "sans-serif"],
  bodyColor: "hsl(0, 0%, 26%);",
  googleFonts: [
    {
      name: 'Roboto Slab',
      styles: [
        '700',
      ],
    },
    {
      name: 'Hind Siliguri',
      styles: [
        '400',
        '400i',
        '700',
        '700i',
      ],
    },
  ],
})
export default typography