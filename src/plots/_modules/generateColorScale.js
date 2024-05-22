export default function generateColorScale(count) {
    const colors = [];
    const hueStep = 360 / count; // Divide the color wheel into equal parts based on the number of classes

    for (let i = 0; i < count; i++) {
      const hue = i * hueStep;
      colors.push(`hsl(${hue}, 100%, 50%)`); // Saturation at 100%, Lightness at 50% for bright colors
    }

    return colors;
  }