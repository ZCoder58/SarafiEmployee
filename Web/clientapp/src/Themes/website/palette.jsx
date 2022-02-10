export default function themePalette(theme){
    return {
        primary: {
            main: theme.colors.primaryMain,
            light:theme.colors.primaryLight,
            dark:theme.colors.primaryDark,
            contrastText: theme.colors.primaryContrastText
          },
          info: {
            main: theme.colors.infoMain,
            light:theme.colors.infoLight,
            dark:theme.colors.infoDark,
            contrastText: theme.colors.infoContrastText
          },
          secondary: {
            main: theme.colors.secondaryMain,
            light:theme.colors.secondaryLight,
            dark:theme.colors.secondaryDark,
            contrastText: theme.colors.secondaryContrastText
          },
          error: {
            main: theme.colors.dangerMain,
            light:theme.colors.dangerLight,
            dark:theme.colors.dangerDark,
            contrastText: theme.colors.dangerContrastText
          },
          warning: {
            main: theme.colors.warningMain,
            light:theme.colors.warningLight,
            dark:theme.colors.warningDark,
            contrastText: theme.colors.warningContrastText
          },
          primaryTransparent:{
            main: theme.colors.primaryTransparentMain,
            light:theme.colors.primaryTransparentLight,
            dark:theme.colors.primaryTransparentDark,
            contrastText: theme.colors.primaryTransparentContrastText
          },
          background:{
            paper:theme.colors.grey0,
            default:theme.colors.bodyBackgroundColor,
          }
    }
}