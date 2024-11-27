import { toPng } from "html-to-image";

export async function domToImage(element: HTMLElement): Promise<string> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
  });

  return dataUrl;
}
