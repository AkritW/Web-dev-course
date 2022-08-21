from flask import Flask
import json
from battleship import BattleShip

app = Flask(__name__)


@app.route("/player1")
def player1():
    # initializing battleship class on 10x10 matrix
    battleShip: BattleShip = BattleShip((10, 10))

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

@app.route("/test")
def test():
    return { "status": "Hello World!" }

if __name__ == "__main__":
    app.run(debug=True)