from typing import *
import random
from pprint import pprint


class BattleShip:
    def __init__(self, size: Tuple[int, int]) -> None:
        self.size = size
    
    def createEmptyOcean(self) -> None:
        self.board: List[List[Union[None, str]]] = [[None for _ in range(self.size[0])] for _ in range(self.size[1])]

    def randomlyPlaceBattleShip(self) -> None:
        def canPlaceHorizontal(x: int, y: int, size: Tuple[int, int], carrierLength: int) -> bool:
            # check against board
            if size[0] - x > carrierLength:
                # check against other carrier
                for i in range(carrierLength):
                    if self.board[y][x+i] != None:
                        return False
                return True
            else:
                return False

        def canPlaceVertical(x: int, y: int, size: Tuple[int, int], carrierLength: int) -> bool:
            # check against board
            if size[1] - y > carrierLength:
                # check against other carrier
                for i in range(carrierLength):
                    if self.board[y+i][x] != None:
                        return False
                return True
            else:
                return False

        def place(carrier: str) -> bool:
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

        carriers: List[str] = ['aaaaa', 'bbbbbb', 'ccc', 'dd', 'sss']
        for carrier in carriers:
            # try placing 1000 times
            carrierIsPlaced: bool = False
            for _ in range(1000):
                carrierIsPlaced= place(carrier)
                if carrierIsPlaced:
                    break

            if not carrierIsPlaced:
                raise(StopIteration("Can't find position to place carrier after 1000 tries"))

    def printBoard(self) -> None:
        pprint(self.board)
                

if __name__ == '__main__':
    # initializing battleship class on 10x10 matrix
    battleShip: BattleShip = BattleShip((10, 10))

    # creating an empty ocean
    battleShip.createEmptyOcean()

    # randomly place battle ship on the board
    battleShip.randomlyPlaceBattleShip()

    # print the board matrix out
    battleShip.printBoard()