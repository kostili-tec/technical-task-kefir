import bgImage from "../assets/background/commentsBg.jpg";

export const baseTheme = {
    colors: {
        primary: "#FFFFFF",
        secondary: "#8297AB",
        gray: "#313439",
    },

    background: {
        image: bgImage,
    },
    media: {
        extraLarge: "(max-width: 1140px)",
        large: "(max-width: 960px)",
        medium: "(max-width: 720px)",
        small: "(max-width: 540px)",
    },

    sizes: {
        dekstopWidth: "562px",
        mobileWidth: "272px",
        desktopFontSize: "16px",
        mobileFontSize: "14px",
        nestedCommentMarginDesktop: "34px",
        nestedCommentMarginMobile: "20px",
    },
};
