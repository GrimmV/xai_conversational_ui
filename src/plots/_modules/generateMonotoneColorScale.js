export default function generateMonotoneColorScale(count, color="#56789e") {
    const colors = [];

    for (let i = 0; i < count; i++) {
      colors.push(color); // Saturation at 100%, Lightness at 50% for bright colors
    }

    return colors;
  }