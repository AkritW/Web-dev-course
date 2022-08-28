from typing import *
import random
from pprint import pprint


class BattleShip:
    """A class use to represent a Battleship
    
    Battleship class is use to represent a battleship game
    to be deploy on later on a Flask web app.
    
    Attributes
    ----------
    size : Tuple[int, int]
        a size of the ocean or the board
    board: List[List[str]
        a board or an ocean
        '.' indicates an empty space
        ',' indicates shot on an empty space
        'a-s' indicates a carrier
        'A-S' indicates a shotted carrier
    carriers : List[str]
        store carriers (battleships)
    turnCount : int
        number to keep track of the turns
    isUserTurn : bool
        boolean value to check if it is user's turn

    Methods
    -------
    createEmptyOcean()
        create an empty board for the user to play
    addCarrier(carrier: str)
        add carrier to initiate
    randomlyPlaceBattleShip()
        randomly place all the carrier to the board
    printBoard()
        print out the board
    getBoard()
        return the board
    resetBoard()
        reset the board
    shoot(coord: Tuple[int, int]) -> bool
        shoot out according the the coords and return shot status
    refreshGameStatus()
        check if game has ended and refresh the status
    """
    def __init__(self, size: Tuple[int, int]) -> None:
        """
        Parameters
        ----------
        size : Tuple[int, int]
            a size of the ocean or the board
        """
        self.size: Tuple[int, int] = size
        self.board: List[List[str]] = []
        self.carriers: List[str] = []
        self.turnCount: int = 0
        self.isUserTurn: bool = False
    
    def createEmptyOcean(self) -> None:
        """create an empty board for the user to play
        """
        self.board: List[List[str]] = [['.' for _ in range(self.size[0])] for _ in range(self.size[1])]

    def addCarrier(self, carrier: str) -> None:
        """add carrier to initiate

        Parameters
        ----------
        carrier : str
            a battleship or a carrier
        """
        self.carriers.append(carrier)
    
    def randomlyPlaceBattleShip(self) -> None:
        """randomly place all the carrier to the board
        """
        def canPlaceHorizontal(x: int, y: int, size: Tuple[int, int], carrierLength: int) -> bool:
            """check if the carrier can be place horizontally

            Parameters
            ----------
            x : int
                x coordinate to be place
            y : int
                y coordinate to be place
            size : Tuple[int, int]
                size of the board
            carrierLength : int
                the length of the carrier

            Returns
            -------
            bool
                True if can be place, otherwise False 
            """
            # check against board
            if size[0] - x > carrierLength:
                # check against other carrier
                for i in range(carrierLength):
                    if self.board[y][x+i] != '.':
                        return False
                return True
            else:
                return False

        def canPlaceVertical(x: int, y: int, size: Tuple[int, int], carrierLength: int) -> bool:
            """check if the carrier can be place vertically

            Parameters
            ----------
            x : int
                x coordinate to be place
            y : int
                y coordinate to be place
            size : Tuple[int, int]
                size of the board
            carrierLength : int
                the length of the carrier

            Returns
            -------
            bool
                True if can be place, otherwise False 
            """
            # check against board
            if size[1] - y > carrierLength:
                # check against other carrier
                for i in range(carrierLength):
                    if self.board[y+i][x] != '.':
                        return False
                return True
            else:
                return False

        def place(carrier: str) -> bool:
            """place carrier to the board

            Parameters
            ----------
            carrier : str
                a battleship or a carrier

            Returns
            -------
            bool
                True if was placed, otherwise False 

            Raises
            ------
            ValueError
                Carrier is bigger than the board
            """
            # generate random position
            x: int = int((self.size[0]) * random.random())
            y: int = int((self.size[1]) * random.random())

            # get size of carrier
            carrierLength: int = len(carrier)

            # if carrier is bigger than the board
            if carrierLength > self.size[0] and carrierLength > self.size[1]:
                raise ValueError('Carrier is bigger than the board.')

            # generate random rotation
            rotation: int = int(2 * random.random())
            
            if rotation == 0 and canPlaceHorizontal(x, y, self.size, carrierLength):
                # place horizon
                for i, position in enumerate(carrier):
                    # place each position (letter)
                    self.board[y][x+i] = position
                return True
            elif rotation == 1 and canPlaceVertical(x, y, self.size, carrierLength):
                # place vertical
                for i, position in enumerate(carrier):
                    # place each position (letter)
                    self.board[y+i][x] = position
                return True
            else:
                # cant place any
                return False

        for carrier in self.carriers:
            # try placing 1000 times
            carrierIsPlaced: bool = False
            for _ in range(1000):
                carrierIsPlaced= place(carrier)
                if carrierIsPlaced:
                    break

            if not carrierIsPlaced:
                raise(StopIteration("Can't find position to place carrier after 1000 tries"))

    def getBoard(self) -> List[List[str]]:
        """return the board

        Returns
        -------
        List[List[str]]
            the board or a ocean
        """
        return self.board

    def printBoard(self) -> None:
        """print out the board
        """
        pprint(self.board)
    
    def resetBoard(self) -> None:
        """reset the board
        """
        self.__init__(self.size)
        
    def shoot(self, coord: Tuple[int, int]) -> bool:
        """shoot out according the the coords and return shot status

        Parameters
        ----------
        coord : Tuple[int, int]
            a coordinate to shoot

        Returns
        -------
        bool
            True if shot, otherwise False
        """
        y, x = coord
        if self.board[y][x] == '.':
            self.board[y][x] = ','
            return False
        elif self.board[y][x] == ',':
            return False
        elif self.board[y][x].islower():
            self.board[y][x] = self.board[y][x].upper()
            return True
        elif self.board[y][x].isupper():
            return False
        else:
            raise(ValueError("Value on the specific coord on the board is corrupted")) 

    def refreshGameStatus(self):
        """check if game has ended and refresh the status
        """
        def isEnded(board):
            """_summary_

            Parameters
            ----------
            board : List[List[str]]
                a board or an ocean
            """
            for row in board:
                for element in row:
                    if element.islower():
                        return False
            return True
        if isEnded(self.board):
            self.board = [['#' for _ in row] for row in self.board]


if __name__ == '__main__':
    # initializing battleship class on 10x10 matrix
    battleShip: BattleShip = BattleShip((10, 10))

    # add carriers
    battleShip.addCarrier('aaaaa')
    battleShip.addCarrier('bbbbb')
    battleShip.addCarrier('ccc')
    battleShip.addCarrier('dd')
    battleShip.addCarrier('sss')

    # creating an empty ocean
    battleShip.createEmptyOcean()

    # randomly place battle ship on the board
    battleShip.randomlyPlaceBattleShip()

    # print the board matrix out
    battleShip.printBoard()