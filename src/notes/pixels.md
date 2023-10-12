/_
const iTopLeft = (x + y _ width) _ 4;
const iTopRight = (x + 1 + y _ width) _ 4;
const iBottomLeft = (x + (y + 1) _ width) _ 4;
const iBottomRight = (x + 1 + (y + 1) _ width) \* 4;

            const pixelTopLeft = dataOrigin.data.slice(iTopLeft, iTopLeft + 4);
            const pixelTopRight = dataOrigin.data.slice(
              iTopRight,
              iTopRight + 4
            );
            const pixelBottomLeft = dataOrigin.data.slice(
              iBottomLeft,
              iBottomLeft + 4
            );
            const pixelBottomRight = dataOrigin.data.slice(
              iBottomRight,
              iBottomRight + 4
            );

            const [rTL, gTL, bTL] = pixelTopLeft;
            const [rTR, gTR, bTR] = pixelTopRight;
            const [rBL, gBL, bBL] = pixelBottomLeft;
            const [rBR, gBR, bBR] = pixelBottomRight;
            const r = (rTL + rTR + rBL + rBR) / 4;
            const g = (gTL + gTR + gBL + gBR) / 4;
            const b = (bTL + bTR + bBL + bBR) / 4;

            const color = `rgb(${r},${g},${b})`;
            dataDestiny.data[iTopLeft] = r;
            dataDestiny.data[iTopLeft + 1] = g;
            dataDestiny.data[iTopLeft + 2] = b;
            dataDestiny.data[iTopLeft + 3] = 255;

            dataDestiny.data[iTopRight] = r;
            dataDestiny.data[iTopRight + 1] = g;
            dataDestiny.data[iTopRight + 2] = b;
            dataDestiny.data[iTopRight + 3] = 255;

            dataDestiny.data[iBottomLeft] = r;
            dataDestiny.data[iBottomLeft + 1] = g;
            dataDestiny.data[iBottomLeft + 2] = b;
            dataDestiny.data[iBottomLeft + 3] = 255;

            dataDestiny.data[iBottomRight] = r;
            dataDestiny.data[iBottomRight + 1] = g;
            dataDestiny.data[iBottomRight + 2] = b;
            dataDestiny.data[iBottomRight + 3] = 255;
            */
