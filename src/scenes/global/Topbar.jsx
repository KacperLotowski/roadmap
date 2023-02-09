import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
 
const Topbar = () => {
    // this grabs the theme this is basically done in react context but in material UI 
    // so they allow you to have access to the theme provided and what we're going to do is we're going to pass in colors, tokens and theme.palette.mode
    // so what this allows us to do is that anytime we want to use the color mode that's in material UI we can grab it from use theme and we can pass it into tokens theme that we've created 
    // so anytime we use a color it's going to automatically determine which color we're going to want
    const theme = useTheme();
    // and then from here const color mode is going to use context color mode context 
    // so we are going to be using this to allow us to toggle different states for the color mode
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    
    return (
        // Box component: the Box component is basically like a div component 
        // but it's very convenient because you can put CSS properties directly into the box component 
        // so I can put display Flex like so so instead of writing CSS separately we can write the CSS properties directly on this box component
        <Box display="flex" justifyContent="space-between" p={2}>
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            {/* 
            SX: this one you cannot write display Flex - it doesn't pop up in vs code autofill  
            instead, for other (non-Box) components you use something called SX and then you write your CSS like this
            this is more of the preferred way of material UI but for box components 
            specifically this allows you to write CSS properties directly on it as opposed to the typical way which is SX
            
            InputBase component: this is going to give us an input section for the search

            ml: margin left 

            */}

            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
    
          {/* ICONS */}
          <Box display="flex">
            
            {/* 
            we're going to pass in colorMode.toggleColorMode
            this is the react context of the function that allows us to change from dark to light
            */}

            <IconButton onClick={colorMode.toggleColorMode}>
            
            {/* 
            if it's dark we are going to want to show the dark mode icon and vice versa
            */}

              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      );
}

export default Topbar;