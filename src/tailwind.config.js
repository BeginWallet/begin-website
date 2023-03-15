const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        light: { raw: "(prefers-color-scheme: light)" },
        dark: { raw: "(prefers-color-scheme: dark)" },
      },
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#F5F5F5",
        "accent-1-dark": "#000000",
        "accent-2-dark": "#333333",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        blue: {
          light: "#3414FC",
          medium: "#3414FC",
          dark: "#14192C",
          over: "#252527",
          ultra: "#00101E",
          twitter: "#1CA1F1",
          discord: "#5865F2",
        },
      },
      spacing: {
        28: "7rem",
        34: "8.35rem", //'8.125rem',
        "317px": "317px",
      },
      width: {
        "50p": "50%",
        "58p": "58.333333%",
        "66p": "66.666667%",
        "75p": "75%",
        "83p": "83.333333%",
        "91p": "91.666667%",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        sm: "0.875rem",
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.3rem",
        "5xl": "2.5rem",
        "6xl": "3.0rem",
        "7xl": "3.375rem",
        "8xl": "3.75rem",
        "9xl": "4.5rem",
        "10xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.25)",
        medium: "4px 4px 10px rgba(0, 0, 0, 0.40)",
        smallDark: "0 5px 10px rgba(255, 255, 255, 0.30)",
        mediumDark: "0 8px 30px rgba(255, 255, 255, 0.30)",
      },
      opacity: {
        10: "0.1",
        15: "0.15",
        30: "0.3",
      },
      fill: (theme) => ({
        red: theme("colors.red.500"),
        green: theme("colors.green.500"),
        blue: theme("colors.blue.500"),
      }),
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [
    function ({ addBase, config }) {
      addBase({
        body: {
          color: config("theme.colors.black"),
          backgroundColor: "#F5F5F5",
        },
        "body.dark-theme": {
          color: config("theme.colors.white"),
          backgroundColor: "#000000",
        },
        "@screen dark": {
          body: {
            color: config("theme.colors.white"),
            backgroundColor: "#000000",
          },
          "body.light-theme": {
            color: config("theme.colors.black"),
            backgroundColor: "#F5F5F5",
          },
        },
      });
    },
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
