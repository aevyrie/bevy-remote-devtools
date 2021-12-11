import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from "react-router-dom";
import { 
  AppBar,
  createTheme, 
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  ThemeProvider,
  Toolbar 
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import MenuIcon from '@mui/icons-material/Menu';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import { ClientSelect } from './components/ClientSelect';
import { Router } from './components/Router';
import { ApiProvider } from './api';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const DRAWER_WIDTH = 200;

const StyledDrawer = styled(Drawer)({
  width: DRAWER_WIDTH,
  flexShrink: 0,
});

const DrawerHeader = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  justifyContent: "flex-end",
}));

interface StyledAppBarProps {
  $shifted: boolean;
}

const StyledAppBar = styled(AppBar)<StyledAppBarProps>(({ $shifted, theme }) => ({
  width: $shifted ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
  marginLeft: $shifted ? DRAWER_WIDTH : 0,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

interface MainProps {
  $shifted: boolean;
}

const Main = styled("main")<MainProps>(({ $shifted, theme }) => ({
  width: $shifted ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
  minHeight: 'calc(100vh - 68px)',
  flexGrow: 1,
  padding: theme.spacing(1),
  marginLeft: $shifted ? DRAWER_WIDTH : 0,
  background: theme.palette.background.default,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const Root = styled("div")({
  display: 'flex',
  flexDirection: 'column',
});

export function App(): React.ReactElement {
  const [open, setOpen] = useState(true);

  return (
    <ApiProvider>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <Root>
          <StyledAppBar position="static" $shifted={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpen(!open)}
                edge="start"
                sx={{ display: open ? "hidden" : 'initial'}}
              >
                <MenuIcon />
              </IconButton>
              <ClientSelect />
            </Toolbar>
          </StyledAppBar>

          <StyledDrawer
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={() => setOpen(!open)}>
                <ChevronLeftIcon />
              </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
              <ListItem button>
                <ListItemIcon>
                  <FormatAlignCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Tracing Events" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Render Graph" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Schedule Graph" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <ViewInArIcon />
                </ListItemIcon>
                <ListItemText primary="Assets" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <AutoGraphIcon/>
                </ListItemIcon>
                <ListItemText primary="System Profiler" />
              </ListItem>
            </List>
          </StyledDrawer>

          <Main $shifted={open}>
            <Router />
          </Main>
        </Root>
      </ThemeProvider>
    </ApiProvider>
  )
}