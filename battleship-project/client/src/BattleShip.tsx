import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading } from '@chakra-ui/react';

const BattleShip = (props) => {
    const isReady = (): boolean => {
        if (props.player == 1) {
            return props.gameState.player1ready
        } else if (props.player == 2) {
            return props.gameState.player2ready
        } else {
            console.error('Error player in isReady is not player 1 or player 2')
            return false
        }
    }

    const handleIsReady = () => {
        props.gameDispatch({
            type: `SET_PLAYER_${props.player}_READY`,
            payload: !isReady()
        })
    }

    const getPrettyBoard = (): Array<Array<string>> => {
        const prettierElement = (element: string, ready: boolean) => {
            if (ready) {
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
                    case '#':
                        return '👏'
                    case element.toLowerCase():
                        return '🛳️'
                    case element.toUpperCase():
                        return '💥'
                    default:
                        return element
                }
            }
        }

        const getBoard = () => {
            if ((props.player == 1 && !props.gameState.player1ready)
             || (props.player == 2 && props.gameState.player2ready)) {
                return props.gameState.player1board
            } else if ((props.player == 1 && props.gameState.player1ready)
                    || (props.player == 2 && !props.gameState.player2ready)) {
                return props.gameState.player2board
            } else {
                console.error('Error: board state is not an accepted value')
            }
        }


        const board = getBoard()
        const ready = isReady()
        const prettyBoard = board.map(row => {
            return row.map(element => {
                return prettierElement(element, ready)
            })
        })

        return prettyBoard
    }

    const handleShoot = ([y, x]) => {
        const inv = (player) => {
            return player == 1 ? 2 : 1
        }

        if (isReady()) {
            fetch(`/api/player${props.player}/shoot`,{
                    method: "POST",
                    body: JSON.stringify({"coord": [y, x]})
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    props.gameDispatch({
                        type: `SET_PLAYER_${inv(props.player)}_BOARD`,
                        payload: data
                    })
                })
        }
    }

    const randomlyPlace = () => {
        fetch(`/api/player${props.player}/randomlyPlace`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                props.gameDispatch({
                    type: `SET_PLAYER_${props.player}_BOARD`,
                    payload: data
                })
            })
    }






    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
            <Heading marginBottom={10}>{`Player ${props.player} Turn`}</Heading>
            <Box display={"flex"} flexDirection={"row"}>
                { 
                    getPrettyBoard().map((row, i) => {
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
                                            bgColor={isReady() ? "cyan.300" : "cyan.100" }
                                            onClick={() => handleShoot([i, j])}>
                                            { element }
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
                <Button marginY={5} marginX={1} onClick={() => randomlyPlace()}>
                        Shuffle
                </Button>
                <Button marginY={5} marginX={1} onClick={() => handleIsReady()}>
                        { isReady() ? "Shooting Mode" : "Defense Mode" }
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
