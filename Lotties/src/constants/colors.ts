export const palette = {
  background: {
    main: "#E7F1F7",
    navigation: "#92B7BB",
    headerOrFooter: "#01434C",
  },
  text: {
    main: "#01434C",
    secondary: "#93B7BC",
    number: "#064857",
    abstract: "#6D6B6B",
  },
  primary: {
    white: "#FFFFFF",
    black: "#000000",
    lotties: "#06424C",
    error: "#FF3B30",
  },
  cta: {
    primary: "#FE695D",
    secondary: "#01434C",
  },
  calendar: {
    today: "#ECB27C",
    menstruation: "#F58597",
    fertile: "#F8E1FE",
    ovulation: "#C976E2",
  },
} as const;

export type Palette = typeof palette;
