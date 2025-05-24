export default function () {
  // 需要在env.d.ts文件中声明全局变量，并且tsconfig.json中include需要添加env.d.ts
  // 否则编译时因为无法识别PROD、DEV会报错
  if (PROD) {
    const logo = `
____________________________________________________________________________________

   _______                        _______  __                                 __   
  |_     _|.-----..--.--. ______ |    ___||  |.-----..--------..-----..-----.|  |_ 
    |   |  |  _  ||  |  ||______||    ___||  ||  -__||        ||  -__||     ||   _|
    |___|  |_____||___  |        |_______||__||_____||__|__|__||_____||__|__||____|
                  |_____|                                                                                  
____________________________________________________________________________________
                               author:ZK
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log("[EricUI]:dev mode...");
  }
}
