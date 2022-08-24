from flask import Flask, request
import json
from battleship import BattleShip

app = Flask(__name__)

# initializing battleship class on 10x10 matrix
storage = {
    "BattleShip1": BattleShip((10, 10)),
    "BattleShip2": BattleShip((10, 10))
}

@app.route("/player1")
def player1():
    # get battleship from storage
    battleShip: BattleShip = storage["BattleShip1"]
    
    # reset the board
    battleShip.resetBoard()

    # add carriers
    battleShip.addCarrier('aaaaa')
    battleShip.addCarrier('bbbbbb')
    battleShip.addCarrier('ccc')
    battleShip.addCarrier('dd')
    battleShip.addCarrier('sss')

    # creating an empty ocean
    battleShip.createEmptyOcean()

    # randomly place battle ship on the board
    battleShip.randomlyPlaceBattleShip()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/player2")
def player2():
    # get battleship from storage
    battleShip: BattleShip = storage["BattleShip2"]

    # reset the board
    battleShip.resetBoard()

    # add carriers
    battleShip.addCarrier('aaaaa')
    battleShip.addCarrier('bbbbbb')
    battleShip.addCarrier('ccc')
    battleShip.addCarrier('dd')
    battleShip.addCarrier('sss')

    # creating an empty ocean
    battleShip.createEmptyOcean()

    # randomly assign ship to the board
    battleShip.randomlyPlaceBattleShip()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/player1/randomlyPlace")
def player1randomlyPlace():
    # get battleship from storage
    battleShip: BattleShip = storage["BattleShip1"]

    # reset board
    battleShip.createEmptyOcean()
    battleShip.board = battleShip.getBoard()

    # randomly assign ship to the board
    battleShip.randomlyPlaceBattleShip()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/player2/randomlyPlace")
def player2randomlyPlace():
    # get battleship from storage
    battleShip: BattleShip = storage["BattleShip2"]

    # reset board
    battleShip.createEmptyOcean()
    battleShip.board = battleShip.getBoard()

    # randomly assign ship to the board
    battleShip.randomlyPlaceBattleShip()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/player1/shoot", methods=["POST"])
def player1shoot():
    # receive data
    req = json.loads(request.data)
    y, x = req["coord"][0], req["coord"][1]

    # get other's battleship from storage
    battleShip: BattleShip = storage["BattleShip2"]

    # shoot
    battleShip.shoot((y, x))
    battleShip.board = battleShip.getBoard()

    # refresh game status
    battleShip.refreshGameStatus()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/player2/shoot", methods=["POST"])
def player2shoot():
    # receive data
    req = json.loads(request.data)
    y, x = req["coord"][0], req["coord"][1]

    # get other's battleship from storage
    battleShip: BattleShip = storage["BattleShip1"]

    # shoot
    battleShip.shoot((y, x))
    battleShip.board = battleShip.getBoard()

    # refresh game status
    battleShip.refreshGameStatus()

    # return the board
    return { "board": battleShip.getBoard() }

@app.route("/test")
def test():
    return { "status": "Hello World!" }

if __name__ == "__main__":
    app.run(debug=True)