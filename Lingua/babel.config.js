module.exports = {
  // presets: ["module:metro-react-native-babel-preset"],
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "module-resolver",

      {
        root: ["."],
        alias: {
          "@assets": "./assets",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@context": "./src/context",
          "@hooks": "./src/hooks",
          "@buttons": "./src/components/molecules/buttons",
          "@utils": "./src/utils",
          "@services": "./src/services",
          "@navigation": "./src/screens/navigation",
        },
      },
    ],
  ],
}
