import {ThemeProvider} from "styled-components";

import GlobalStyles from "./styles/global";
import {CommentsPage} from "./pages/CommentsPage/CommentsPage";
import {baseTheme} from "./styles/theme";

function App() {
    return (
        <ThemeProvider theme={baseTheme}>
            <GlobalStyles />
            <CommentsPage />
        </ThemeProvider>
    );
}

export default App;
