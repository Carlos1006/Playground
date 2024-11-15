import { FC, useState } from "react";
import { hexToRgba, normalizeRGB, rgbaToHex } from "../utils";
import { IColorPicker } from "../types";

const ColorPicker: FC<IColorPicker> = ({
  title,
  color,
  alpha,
  onChange,
}: IColorPicker) => {
  const [background, setBackground] = useState<[number, number, number]>(color);
  const [backgroundAlpha, setBackgroundAlpha] = useState(alpha);
  const backgroundValue = rgbaToHex(...background);

  const onColorChange = (color: string): void => {
    setBackground(hexToRgba(color));
    onChange([...normalizeRGB(background), backgroundAlpha]);
  };

  const onAlphaChange = (alpha: number): void => {
    setBackgroundAlpha(alpha);
    onChange([...normalizeRGB(background), alpha]);
  };

  return (
    <>
      <label>{title}</label>
      <input
        placeholder="background"
        type="color"
        style={{ opacity: backgroundAlpha }}
        value={backgroundValue}
        onChange={(e): void => onColorChange(e.target.value)}
      ></input>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={backgroundAlpha}
        onChange={(e): void => onAlphaChange(parseFloat(e.target.value))}
      ></input>
    </>
  );
};

export default ColorPicker;
