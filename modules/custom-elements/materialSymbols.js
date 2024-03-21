/*
  MSO - Material Symbols Outlined
  MSR - Material Symbols Rounded
  MSS - Material Symbols Sharp
*/

const FontMSOPreload = new FontFace('Material Symbols Outlined', 'url("./assets/fonts/Material-Symbols/Material-Symbols-Outlined.woff2")');
const FontMSRPreload = new FontFace('Material Symbols Rounded', 'url("./assets/fonts/Material-Symbols/Material-Symbols-Rounded.woff2")');
const FontMSSPreload = new FontFace('Material Symbols Sharp', 'url("./assets/fonts/Material-Symbols/Material-Symbols-Sharp.woff2")');

function fontsMSPreload(callback) {
  Promise.all([FontMSOPreload.load(), FontMSRPreload.load(), FontMSSPreload.load()]).then((fonts) => {
    fonts.forEach((font) => document.fonts.add(font));
    callback();
  });
}

export default fontsMSPreload;
