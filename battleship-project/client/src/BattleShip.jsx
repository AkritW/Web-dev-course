import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading } from '@chakra-ui/react';

const BattleShip = (props) => {
    const prettyBoard = (element) => {
        if (isStarted) {
            switch(element) {
                case '.':
                    return ' '
                case ',':
                    return '🌊'
                case '#':
                    return '👏'
                case element.toLowerCase():
                    return ' '
                case element.toUpperCase():
                    return '💥'
                default:
                    return element
            }
        } else {
            switch(element) {
                case '.':
                    return ' '
                case ',':
                    return '🌊'
                case element.toLowerCase():
                    return '🛳️'
                case element.toUpperCase():
                    return '💥'
                default:
                    return element
            }
        }
    }

    const handleCallback = (board, player) => {
        if (player == 1) {
            board && props.setData(oldBoard => [{board}, oldBoard[1]])
        } else if (player == 2) {
            board && props.setData(oldBoard => [oldBoard[0], {board}])
        }
    }

    const randomlyPlace = (player) => {
        fetch(`/api/player${player}/randomlyPlace`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                handleCallback(data.board, props.player)
            })
    }

    const handleStartStop = () => {
        setIsStarted(status => !status);
        if (props.player == 1) {
            board && setBoard(props.data2)
        } else if (props.player == 2) {
            board && setBoard(props.data1)
        }
    }

    const handleShoot = (player, [y, x]) => {
        if (isStarted) {
            fetch(`/api/player${player}/shoot`,{
                    method: "POST",
                    body: JSON.stringify({"coord": [y, x]})
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    // setBoard(data.board)
                    props.player == 1 && board && props.setData(oldBoard => [{board: data.board}, oldBoard[1]])
                    props.player == 2 && board && props.setData(oldBoard => [oldBoard[0], {board: data.board}])
                })
        }
    }

    const [board, setBoard] = useState()
    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        console.log(isStarted)
    }, [isStarted])

    useEffect(() => {
        if (props.player == 1) {
            setBoard(props.data1)
        }
        else if (props.player == 2) {
            setBoard(props.data2)
        }
    }, [props.data1, props.data2])

    useEffect(()=> {
        handleCallback(board, props.player)
    }, [board])

    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Heading marginBottom={10}>{`Player ${props.player} Turn`}</Heading>
            <Box display={"flex"} flexDirection={"row"}>
                { 
                    board && board.map((row, i) => {
                        return (
                            <Box key={i} display={"flex"} flexDirection={"column"}>
                            {
                                row.map((element, j) => {
                                    return (
                                        <Box 
                                            key={j}
                                            width={10} 
                                            height={10} 
                                            lineHeight={10}
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignContent={"center"}
                                            textAlign={"center"}
                                            margin={1} 
                                            bgColor={"cyan.200"}
                                            onClick={() => handleShoot(props.player, [i, j])}>
                                            { prettyBoard(element) }
                                        </Box>
                                    )
                                })
                            }
                            </Box>
                        )
                    })
                }
            </Box>

            <Box display={"flex"} flexDirection={"row"}>
                <Button marginY={5} marginX={1} onClick={() => randomlyPlace(props.player)}>
                        Shuffle
                </Button>
                <Button marginY={5} marginX={1} onClick={() => handleStartStop(props.player)}>
                        { isStarted ? "Stop" : "Start" }
                </Button>
            <Link to="/">
                <Button marginY={5} marginX={1}>
                    Back to Main Menu
                </Button>
            </Link>
            </Box>
        </Box>
    )
}

export default BattleShip;
