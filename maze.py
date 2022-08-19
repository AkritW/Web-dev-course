from typing import *

def solveMaze(maze: List[List[str]]) -> Union[int, None]:
    R, C = len(maze), len(maze[0])

    start = (0, 0)
    for r in range(R):
        for c in range(C):
            if maze[r][c] == 'S':
                start = (r, c)
                break
        else: continue
        break
    else:
        return None

    location: Tuple[int, int] = (start[0], start[1])
    directions: List[List[int]] = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    visited: List[List[bool]] = [[False] * C for _ in range(R)]

    answer: List[int] = []
    def solve(maze: List[List[str]], location:Tuple[int, int], count: int) -> None:
        # print(count)
        # base case
        coord = location
        visited[coord[0]][coord[1]] = True
        if maze[coord[0]][coord[1]] == 'E':
            answer.append(count)
            
        # inductive step
        for dir in directions:
            nr, nc = coord[0] + dir[0], coord[1] + dir[1]
            if not (nr < 0 or nr >= R or nc < 0 or nc >= C or maze[nr][nc] == "#" or visited[nr][nc]):
                solve(maze, (nr, nc), count+1)

    solve(maze, location, 0)
    return answer[0]
            

mymaze = [
    ['#','#','#','#','#','#','#','#','E','#','#','#','#','#','#','#'],
    ['#','.','.','.','.','.','.','.','.','.','.','#','.','.','.','#'],
    ['#','.','#','#','#','#','#','#','.','#','#','#','.','#','.','#'],
    ['#','.','#','#','.','.','.','#','.','.','#','#','.','#','.','#'],
    ['#','.','.','.','.','#','.','.','#','#','.','.','.','.','.','#'],
    ['#','#','.','#','.','#','#','#','#','#','#','#','#','.','#','#'],
    ['#','#','.','#','.','.','.','.','.','S','.','.','.','.','.','#'],
    ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#']
]

x = solveMaze(mymaze)
print(x)

