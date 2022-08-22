import { Box, Heading, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} height={"100vh"}>
            <Heading>Pick your player</Heading>
            <Box display={"flex"} flexDirection={"column"}>
                <Link to="/player1">
                    <Button colorScheme={"teal"} width={400} height={100} margin={10}>
                        Player 1
                    </Button>
                </Link>
                <Link to="/player2">
                    <Button colorScheme={"teal"} width={400} height={100} margin={10}>
                        Player 2
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Landing;