import { Box, CircularProgress, circularProgressClasses } from "@mui/material";
import React from "react";

const Spinner = () => {
    return (
        <Box className="loader" sx={{ position: 'absolute', margin: '0 auto', top: '40%' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                color: (theme) =>
                    theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={100}
                thickness={5}
                
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                animationDuration: '550ms',
                position: 'absolute',
                left: 0,
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
                }}
                size={100}
                thickness={5}
        
            />
            <p>LOADING...</p>
        </Box>
    );
}

export default Spinner;