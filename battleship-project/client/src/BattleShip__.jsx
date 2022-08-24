// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Button, Heading } from '@chakra-ui/react';

// const BattleShip = (props) => {
//     const prettyBoard = (element) => {
//         if (isStarted(props.gameStatus, props.player)) {
//             switch(element) {
//                 case '.':
//                     return ' '
//                 case ',':
//                     return '🌊'
//                 case '#':
//                     return '👏'
//                 case element.toLowerCase():
//                     return ' '
//                 case element.toUpperCase():
//                     return '💥'
//                 default:
//                     return element
//             }
//         } else {
//             switch(element) {
//                 case '.':
//                     return ' '
//                 case ',':
//                     return '🌊'
//                 case element.toLowerCase():
//                     return '🛳️'
//                 case element.toUpperCase():
//                     return '💥'
//                 default:
//                     return element
//             }
//         }
//     }

//     // const handleCallback = (board, player) => {
//     //     if (player == 1 && !props.gameStatus.player1ready) {
//     //         board && props.setData(oldBoard => [{ board }, oldBoard[1]])
//     //     } else if (player == 1 && props.gameStatus.player1ready) {
//     //         board && props.setData(oldBoard => [oldBoard[0], { board }])
//     //     } else if (player == 2 && !props.gameStatus.player2ready) {
//     //         board && props.setData(oldBoard => [oldBoard[0], { board }])
//     //     } else if (player ==2 && props.gameStatus.player2ready) {
//     //         board && props.setData(oldBoard => [{ board }, oldBoard[1]])
//     //     }
//     // }

//     // const randomlyPlace = (player) => {
//     //     fetch(`/api/player${player}/randomlyPlace`)
//     //         .then(res => {
//     //             return res.json()
//     //         })
//     //         .then(data => {
//     //             handleCallback(data.board, props.player)
//     //         })
//     // }

//     // const handleSetGameStatus = (player) => {
//     //     if (player == 1) {
//     //         props.setGameStatus(oldState => {
//     //             return { 
//     //                 player1ready: !oldState.player1ready,
//     //                 player2ready: oldState.player2ready,
//     //                 turn: oldState.turn 
//     //             }
//     //         })
//     //     } else if (player == 2) {
//     //         props.setGameStatus(oldState => {
//     //             return { 
//     //                 player1ready: oldState.player1ready, 
//     //                 player2ready: !oldState.player2ready,
//     //                 turn: oldState.turn
//     //             } 
//     //         })
//     //     }
//     // }

//     // const handleSetBoard = (data1, data2, player, gameStatus) => {
//     //     if (player == 1 && !gameStatus.player1ready) {
//     //         setBoard(data1)
//     //     } else if (player == 1 && gameStatus.player1ready) {
//     //         setBoard(data2)
//     //     } else if (player == 2 && !gameStatus.player2ready) {
//     //         setBoard(data2)
//     //     } else if (player == 2 && gameStatus.player2ready) {
//     //         setBoard(data1)
//     //     }
//     // }

//     // const isStarted = (gameStatus, player) => {
//     //     if (player == 1) {
//     //         return gameStatus.player1ready
//     //     } else if (player == 2) {
//     //         return gameStatus.player1ready
//     //     }
//     // }

//     // const handleShoot = (player, [y, x]) => {
//     //     if (isStarted(props.gameStatus, props.player)) {
//     //         fetch(`/api/player${player}/shoot`,{
//     //                 method: "POST",
//     //                 body: JSON.stringify({"coord": [y, x]})
//     //             })
//     //             .then(res => {
//     //                 return res.json()
//     //             })
//     //             .then(data => {
//     //                 handleCallback(data.board, player)
//     //             })
//     //     }
//     // }

//     // const [board, setBoard] = useState()
//     // // const [isStarted, setIsStarted] = useState(false)

//     // useEffect(() => {
//     //     handleSetBoard(props.data1, props.data2, props.player, props.gameStatus)
//     // }, [props.gameStatus])

//     // useEffect(() => {
//     //     handleSetBoard(props.data1, props.data2, props.player, props.gameStatus)
//     // }, [props.data1, props.data2])

//     // useEffect(()=> {
//     //     handleCallback(board, props.player)
//     // }, [board])


//     return (
//         <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} height={"100vh"}>
//             <Heading marginBottom={10}>{`Player ${props.player} Turn`}</Heading>
//             <Box display={"flex"} flexDirection={"row"}>
//                 { 
//                     board && board.map((row, i) => {
//                         return (
//                             <Box key={i} display={"flex"} flexDirection={"column"}>
//                             {
//                                 row.map((element, j) => {
//                                     return (
//                                         <Box 
//                                             key={j}
//                                             width={10} 
//                                             height={10} 
//                                             lineHeight={10}
//                                             display={"flex"}
//                                             justifyContent={"center"}
//                                             alignContent={"center"}
//                                             textAlign={"center"}
//                                             margin={1} 
//                                             bgColor={"cyan.200"}
//                                             onClick={() => handleShoot(props.player, [i, j])}>
//                                             { prettyBoard(element) }
//                                         </Box>
//                                     )
//                                 })
//                             }
//                             </Box>
//                         )
//                     })
//                 }
//             </Box>

//             <Box display={"flex"} flexDirection={"row"}>
//                 <Button marginY={5} marginX={1} onClick={() => randomlyPlace(props.player)}>
//                         Shuffle
//                 </Button>
//                 <Button marginY={5} marginX={1} onClick={() => handleSetGameStatus(props.player)}>
//                         { isStarted(props.gameStatus, props.player) ? "Stop" : "Start" }
//                 </Button>
//             <Link to="/">
//                 <Button marginY={5} marginX={1}>
//                     Back to Main Menu
//                 </Button>
//             </Link>
//             </Box>
//         </Box>
//     )
// }

// export default BattleShip;
